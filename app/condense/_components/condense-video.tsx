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

const CondenseVideo = () => {
  // saving ffmpeg in a ref to persist between renders
  const ffmpegRef = useRef(new FFmpeg());

  // state for uploaded video
  const [video, setVideo] = useState<FileActions | null>(null);

  // states for ffmpeg conversion
  const [progress, setProgress] = useState<number>(0);
  const [time, setTime] = useState<{
    startTime?: number;
    elapsedTime?: number;
  }>({ elapsedTime: 0 });
  const [status, setStatus] = useState<
    "not started" | "converted" | "condensing"
  >("not started");

  const handleUpload = (file: File) => {
    setVideo({
      file,
      fileName: file.name,
      fileSize: file.size,
      from: file.name.slice(0, 10),
      fileType: file.type,
      isError: false,
    });
  };

  const resetVideoState = () => setVideo(null);

  // starting video compression using ffmpeg
  const disableDuringCompression = status === "condensing";

  // loading ffmpeg functions
  const load = async () => {
    const baseUrl = "http://localhost:3000";
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
  useEffect(() => loadWithToast, []);

  return (
    <>
      {video ? (
        <>
          <div className="flex items-start gap-8">
            <VideoDisplay url={URL.createObjectURL(video.file)} />
            <VideoInputDetails
              videoFile={video}
              onClear={resetVideoState}
              disableControls={disableDuringCompression}
            />
          </div>
          {(status === "not started" || status === "converted") && (
            <div className="flex items-center justify-center mt-8">
              <Button type="button" onClick={() => {}}>
                Start compression
              </Button>
            </div>
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
