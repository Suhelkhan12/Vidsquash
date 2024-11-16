"use client";

import Dropzone from "react-dropzone";
import { toast } from "sonner";
import { VideoIcon } from "lucide-react";

type CustomDropZoneProps = {
  handleUpload: (files: File) => void;
  acceptedFiles: { [key: string]: string[] };
  disabled?: boolean;
};

const CustomDropZone = ({
  handleUpload,
  acceptedFiles,
  disabled,
}: CustomDropZoneProps) => {
  const onDrop = (files: File[]) => {
    handleUpload(files[0]);
  };

  const onError = () => {
    toast.error("Error uploading your files 💥.", {
      description: "Allowed files are videos only.",
      duration: 500,
    });
  };

  const onDropRejected = () => {
    toast.error("Error uploading your files 💥.", {
      description: "Allowed files are videos only.",
      duration: 500,
    });
  };
  return (
    <Dropzone
      disabled={disabled}
      onDrop={onDrop}
      accept={acceptedFiles}
      multiple={false}
      onError={onError}
      onDropRejected={onDropRejected}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className={`flex flex-col justify-center items-center cursor-pointer ${
            disabled ? "cursor-not-allowed" : ""
          } h-[30rem]`}
        >
          <input {...getInputProps()} />
          <VideoIcon className="w-16 h-16" />
          <p>Drag and drop some videos here, or click to select videos</p>
        </div>
      )}
    </Dropzone>
  );
};

export default CustomDropZone;
