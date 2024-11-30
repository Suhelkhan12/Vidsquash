"use client";

import { useEffect, useRef, useState } from "react";
import { acceptedVideoFiles } from "@/utils/format";
import CustomDropZone from "./custom_dropzone";
import { FileActions } from "@/utils/types";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import VideoDisplay from "./video-display";
import VideoInputDetails from "./video-details";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { convertFile } from "@/utils/fileConverter";
import { QualityType, VideoFormat, VideoInpSettings } from "@/utils/types";
import CondenseProgress from "./condense-progress";
import VideoOutput from "./video-output";
import process from "process";

const CondenseVideo = () => {
  // saving ffmpeg in a ref to persist between renders
  const ffmpegRef = useRef(new FFmpeg());

  // state for uploaded video
  const [video, setVideo] = useState<FileActions | null>(null);

  // states for ffmpeg conversion
  const [progress, setProgress] = useState<number>(0);

  // video settings
  const [videoSettings, setVideoSettings] = useState<VideoInpSettings>({
    quality: QualityType.Low,
    videoType: VideoFormat.MOV,
    customEndTime: 0,
    customStartTime: 0,
    removeAudio: false,
    twitterCompressionCommand: false,
    whatsappCompressionCommand: false,
  });

  const [time, setTime] = useState<{
    startTime?: Date;
    elapsedTime?: number;
  }>({ elapsedTime: 0 });

  const [status, setStatus] = useState<
    "not started" | "converted" | "condensing" | "started"
  >("not started");

  const handleUpload = (file: File) => {
    setVideo({
      file,
      fileName: file.name,
      fileSize: file.size,
      from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
      fileType: file.type,
      isError: false,
    });
  };

  const resetVideoState = () => {
    setVideo(null);
    setStatus("not started");
    setTime({
      startTime: undefined,
      elapsedTime: 0,
    });
  };

  // starting video compression using ffmpeg
  const disableDuringCompression = status === "condensing";

  // loading ffmpeg functions
  const load = async () => {
    try {
      let baseUrl = "";
      if (process.env.NODE_ENV === "development") {
        baseUrl = process.env.NEXT_PUBLIC_LOCAL_WEBSITE_URL!;
        console.log(baseUrl);
      } else {
        baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL!;
        console.log(baseUrl);
      }
      const ffmpeg = ffmpegRef.current;

      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseUrl}/download/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${baseUrl}/download/ffmpeg-core.wasm`,
          "application/wasm"
        ),
      });
    } catch (err) {
      console.log(err);
      toast.warning("Error while loading ffmpeg data");
    }
  };

  // show toast when ffmpeg files are loaded
  const loadWithToast = () => {
    toast.promise(load, {
      loading: "Downloading necessory packages from ffmpeg for offline use.",
      success: () => {
        return "All necessory files are downloaded.";
      },
      error: () => {
        return "Error downloading ffmpeg packages.";
      },
    });
  };

  // showing toasts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => loadWithToast(), []);

  // function which will compress the file
  const condense = async () => {
    if (!video) return;

    try {
      setTime({ ...time, startTime: new Date() });
      setStatus("condensing");
      ffmpegRef.current.on("progress", ({ progress }) => {
        const percentage = progress * 100;
        setProgress(percentage);
      });

      const { url, output, outputBlob } = await convertFile(
        ffmpegRef.current,
        video,
        videoSettings
      );

      // setting video after compressions
      setVideo({
        ...video,
        url,
        output,
        outputBlob,
      });

      setTime((prev) => ({ ...prev, startTime: undefined }));
      setStatus("converted");
      setProgress(0);
    } catch (err) {
      console.log(err);
      setProgress(0);
      setStatus("not started");
      setTime({ startTime: undefined, elapsedTime: 0 });
      toast.warning("Something went wrong while compressing", {
        description: "Please try again later.",
      });
    }
  };

  //useEffect for time intervals in compressing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (time.startTime) {
      timer = setInterval(() => {
        const endTime = new Date();
        const timeDiff = endTime.getTime() - time.startTime!.getTime();
        setTime((p) => ({
          ...p,
          elapsedTime: timeDiff,
        }));
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [time.startTime]);

  return (
    <>
      {video ? (
        <>
          <div className="flex lg:flex-row flex-col items-start gap-8">
            <VideoDisplay url={URL.createObjectURL(video.file)} />
            <VideoInputDetails
              videoFile={video}
              onClear={resetVideoState}
              disableControls={disableDuringCompression}
              videoSettings={videoSettings}
              setVideoSettings={setVideoSettings}
            />
          </div>
          {(status === "started" || status === "condensing") && (
            <CondenseProgress progress={progress} seconds={time.elapsedTime!} />
          )}
          {(status === "not started" || status !== "converted") && (
            <div className="flex items-center justify-center mt-8">
              <Button type="button" onClick={condense}>
                Start compression
              </Button>
            </div>
          )}
          {status === "converted" && video && (
            <VideoOutput timeTaken={time.elapsedTime} file={video} />
          )}
        </>
      ) : (
        <CustomDropZone
          handleUpload={handleUpload}
          acceptedFiles={acceptedVideoFiles}
        />
      )}
    </>
  );
};

export default CondenseVideo;
