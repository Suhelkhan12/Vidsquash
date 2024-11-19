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
import EditVideo from "./EditVideo";

type VideoInputDetailsProps = {
  videoFile: FileActions;
  onClear: () => void;
  disableControls: boolean;
};

const VideoInputDetails = ({
  videoFile,
  onClear,
  disableControls,
}: VideoInputDetailsProps) => {
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
    <div className="w-full">
      <div className="flex gap-4 mb-4">
        <Card className="bg-secondary max-w-[50%] w-full">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="flex justify-between items-center">
              Input File
              <Button onClick={onClear} disabled={disableControls}>
                Change video
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
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
        <Card className="bg-secondary max-w-[50%] w-full">
          <CardHeader className="p-3 pb-0">
            <CardTitle>Trim video</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <VideoTrim
              videoSettings={videoSettings}
              disabled={disableControls}
              onVideoSettingChange={setVideoSettings}
            />
          </CardContent>
        </Card>
      </div>
      <Card className="bg-secondary">
        <CardHeader className="p-3 pb-0">
          <CardTitle>Edit video detials</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <EditVideo
            videoSettings={videoSettings}
            onVideoSettingChange={setVideoSettings}
            disabled={disableControls}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoInputDetails;
