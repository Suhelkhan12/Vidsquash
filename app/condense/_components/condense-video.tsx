"use client";

import { useState } from "react";
import { acceptedVideoFiles } from "@/utils/format";
import CustomDropZone from "./custom_dropzone";
import { FileActions } from "@/utils/types";
import VideoDisplay from "./video-display";
import VideoInputDetails from "./video-details";

const CondenseVideo = () => {
  const [video, setVideo] = useState<FileActions | null>(null);

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

  return (
    <>
      {video ? (
        <div className="flex lg:flex-row flex-col items-start gap-8">
          <VideoDisplay url={URL.createObjectURL(video.file)} />
          <VideoInputDetails videoFile={video} onClear={resetVideoState} />
        </div>
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
