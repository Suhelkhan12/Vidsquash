"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { byteConversion } from "@/utils/format";
import {
  FileActions,
  QualityType,
  VideoFormat,
  VideoInpSettings,
} from "@/utils/types";
import { VideoTrim } from "./video-trim";
import { useState } from "react";

type VideoInputDetailsProps = {
  videoFile: FileActions;
  onClear: () => void;
};

const VideoInputDetails = ({ videoFile, onClear }: VideoInputDetailsProps) => {
  const [videoSettings, setVideoSettings] = useState<VideoInpSettings>({
    quality: QualityType.Low,
    videoType: VideoFormat.MOV,
    customEndTime: 0,
    customStartTime: 0,
    removeAudio: false,
    twitterCompressionCommand: false,
    whatsappCompressionCommand: false,
  });

  return (
    <div className="flex-grow flex gap-4 flex-col">
      <Card className="bg-secondary">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-center text-xl">
            Input File
            <Button onClick={onClear}>Change video</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <span className=" w-20">File name</span>
                <p className="font-semibold text-primary">
                  {videoFile.fileName}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-20">File size</span>
                <p className="font-semibold text-primary">
                  {byteConversion(videoFile.fileSize)}
                </p>
              </div>
            </div>
          </CardDescription>
        </CardContent>
      </Card>
      <Card className="bg-secondary">
        <CardHeader className="pb-2">
          <CardTitle>Trim video</CardTitle>
        </CardHeader>
        <CardContent>
          <VideoTrim
            videoSettings={videoSettings}
            disabled={false}
            onVideoSettingChange={setVideoSettings}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoInputDetails;
