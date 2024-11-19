import { getFileExtension } from "./fileConverter";
import { VideoFormat, VideoInpSettings } from "./types";

export const whatsappCompressionCommand = (input: string, output: string) => [
  "-i",
  input,
  "-c:v",
  "libx264",
  "-preset",
  "veryfast",
  "-crf",
  "35",
  "-c:a",
  "aac",
  "-b:a",
  "64k",
  "-movflags",
  "faststart",
  "-maxrate",
  "1000k",
  "-bufsize",
  "1000k",
  "-fs",
  "9M",
  output,
];

export const twitterCompressionCommand = (input: string, output: string) => [
  "-i",
  input,
  "-c:v",
  "libx264",
  "-profile:v",
  "high",
  "-level:v",
  "4.2",
  "-pix_fmt",
  "yuv420p",
  "-r",
  "30",
  "-c:a",
  "aac",
  "-b:a",
  "192k",
  "-movflags",
  "faststart",
  "-maxrate",
  "5000k",
  "-bufsize",
  "5000k",
  "-tune",
  "film",
  output,
];

export const customVideoCompressionCommand = (
  input: string,
  output: string,
  videoSettings: VideoInpSettings
): string[] => {
  const inputType = getFileExtension(input);
  if (inputType === "mp4") {
    return getMp4ToMp4Command(input, output);
  } else {
    switch (videoSettings.videoType) {
      case VideoFormat.MP4:
        return getMp4Command(input, output, videoSettings);
      case VideoFormat.MOV:
        return getMovCommand(input, output, videoSettings);
      case VideoFormat.MKV:
        return getMkvCommand(input, output, videoSettings);
      case VideoFormat.AVI:
        return getAviCommand(input, output, videoSettings);
      case VideoFormat.FLV:
        return getFlvCommand(input, output, videoSettings);
      default:
        return ["-i", input, output];
    }
  }
};

const getMp4ToMp4Command = (input: string, output: string) => {
  return [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-crf",
    "23",
    "-preset",
    "medium",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    output,
  ];
};

const getMp4Command = (
  input: string,
  output: string,
  videoSettings: VideoInpSettings
) => {
  const command = [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-profile:v",
    "high",
    "-level:v",
    "4.2",
    "-pix_fmt",
    "yuv420p",
    "-r",
    "30",
    "-maxrate",
    "5000k",
    "-bufsize",
    "5000k",
    "tune",
    "film",
    "-ss",
    videoSettings.customStartTime.toString(),
    "-to",
    videoSettings.customEndTime.toString(),
    "-q:v",
    videoSettings.quality,
    "-crf",
    "18",
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-f",
    videoSettings.videoType,
  ];

  if (!videoSettings.removeAudio) {
    command.push("-c:a", "aac", "-b:a", "192k", "-movflags", "faststart");
  } else {
    command.push("-an");
  }
  command.push(output);
  return command;
};

const getMovCommand = (
  input: string,
  output: string,
  videoSettings: VideoInpSettings
) => {
  const audioOptions = videoSettings.removeAudio ? [] : ["-c:a", "aac"];
  const command = [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-crf",
    videoSettings.quality,
    ...audioOptions,
    "-vf",
    `trim=start=${videoSettings.customStartTime}:end=${videoSettings.customEndTime}`,
    output,
  ];

  return command;
};

const getMkvCommand = (
  input: string,
  output: string,
  videoSettings: VideoInpSettings
) => {
  const audioOptions = videoSettings.removeAudio ? [] : ["-c:a", "aac"];
  const command = [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-crf",
    videoSettings.quality,
    ...audioOptions,
    "-vf",
    `trim=start=${videoSettings.customStartTime}:end=${videoSettings.customEndTime}`,
    output,
  ];

  return command;
};

const getAviCommand = (
  input: string,
  output: string,
  videoSettings: VideoInpSettings
) => {
  const audioOptions = videoSettings.removeAudio ? [] : ["-c:a", "aac"];
  const command = [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-crf",
    videoSettings.quality,
    ...audioOptions,
    "-vf",
    `trim=start=${videoSettings.customStartTime}:end=${videoSettings.customEndTime}`,
    output,
  ];

  return command;
};

const getFlvCommand = (
  input: string,
  output: string,
  videoSettings: VideoInpSettings
) => {
  const audioOptions = videoSettings.removeAudio ? [] : ["-c:a", "aac"];
  const command = [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-crf",
    videoSettings.quality,
    ...audioOptions,
    "-vf",
    `trim=start=${videoSettings.customStartTime}:end=${videoSettings.customEndTime}`,
    output,
  ];

  return command;
};
