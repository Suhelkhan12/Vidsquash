import { FFmpeg } from "@ffmpeg/ffmpeg";
import { FileActions, VideoInpSettings } from "./types";
import { fetchFile } from "@ffmpeg/util";
import {
  customVideoCompressionCommand,
  twitterCompressionCommand,
  whatsappCompressionCommand,
} from "./ffmpeg-commands";
import { toast } from "sonner";

export const getFileExtension = (fileName: string) => {
  const regex = /(?:\.([^.]+))?$/;
  const match = regex.exec(fileName);
  if (match && match[1]) {
    return match[1];
  }
  return "";
};

function removeFileExtension(fileName: string) {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    return fileName.slice(0, lastDotIndex);
  }
  return fileName;
}

export const convertFile = async (
  ffmpeg: FFmpeg,
  actionFile: FileActions,
  videoSettings: VideoInpSettings
) => {
  const { file, fileName, fileType } = actionFile;
  const output = removeFileExtension(fileName) + "." + videoSettings.videoType;
  ffmpeg.writeFile(fileName, await fetchFile(file));
  const command = videoSettings.twitterCompressionCommand
    ? twitterCompressionCommand(fileName, output)
    : videoSettings.whatsappCompressionCommand
    ? whatsappCompressionCommand(fileName, output)
    : customVideoCompressionCommand(fileName, output, videoSettings);

  toast.message(command.join(" "), {
    description: "Running above ffmpeg command.",
  });

  await ffmpeg.exec(command);
  const data = await ffmpeg.readFile(output);
  const blob = new Blob([data], { type: fileType.split("/")[0] });
  const url = URL.createObjectURL(blob);
  return { url, output, outputBlob: blob };
};

export const formatTime = (seconds: number): string => {
  seconds = Math.round(seconds);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  let formattedTime = "";

  if (hours > 0) {
    formattedTime += hours + "hr";
    if (minutes > 0 || remainingSeconds > 0) {
      formattedTime += " ";
    }
  }

  if (minutes > 0) {
    formattedTime += `${minutes.toString()} min`;
    if (remainingSeconds > 0) {
      formattedTime += " ";
    }
  }

  if (remainingSeconds > 0 || formattedTime === "") {
    formattedTime += `${remainingSeconds} sec`;
  }

  return formattedTime;
};
