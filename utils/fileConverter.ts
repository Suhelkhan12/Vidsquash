import { FFmpeg } from "@ffmpeg/ffmpeg";
import { FileActions, VideoInpSettings } from "./types";
import { fetchFile } from "@ffmpeg/util";
import {
  customVideoCompressionCommand,
  twitterCompressionCommand,
  whatsappCompressionCommand,
} from "./ffmpeg-commands";

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
  const output =
    removeFileExtension(fileName) +
    "_compressed" +
    "." +
    videoSettings.videoType;
  ffmpeg.writeFile(fileName, await fetchFile(file));
  const command = videoSettings.twitterCompressionCommand
    ? twitterCompressionCommand(fileName, output)
    : videoSettings.whatsappCompressionCommand
    ? whatsappCompressionCommand(fileName, output)
    : customVideoCompressionCommand(fileName, output, videoSettings);

  console.log(command);

  await ffmpeg.exec(command);
  const data = await ffmpeg.readFile(output);
  const blob = new Blob([data], { type: fileType.split("/")[0] });
  const url = URL.createObjectURL(blob);
  console.log({
    data,
    blob,
    url,
  });
  return { url, output, outputBlob: blob };
};

export const formatTime = (milliseconds: number): string => {
  const seconds = Math.round(milliseconds / 1000);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}hr`);
  if (minutes > 0) parts.push(`${minutes}min`);
  if (remainingSeconds > 0 || parts.length === 0)
    parts.push(`${remainingSeconds}sec`);

  return parts.join(" ");
};
