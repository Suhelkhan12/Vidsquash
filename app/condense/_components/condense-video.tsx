"use client";

import { useState } from "react";
import { acceptedVideoFiles } from "@/utils/format";
import CustomDropZone from "./custom_dropzone";
import { FileActions } from "@/utils/types";
import VideoDisplay from "./video-display";

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

  return (
    <>
      {video ? (
        <VideoDisplay url={URL.createObjectURL(video.file)} />
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
