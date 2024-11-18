import type { VideoInpSettings } from "@/utils/types";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { calculateTimeInHoursMinutesSeconds } from "@/utils/format";

type VideoTrimProps = {
  videoSettings: VideoInpSettings;
  onVideoSettingChange: (value: VideoInpSettings) => void;
  disabled: boolean;
};

export const VideoTrim = ({
  videoSettings,
  onVideoSettingChange,
  disabled,
}: VideoTrimProps) => {
  const [videoEndTime, setVideoEndTime] = useState(0);
  const { customEndTime, customStartTime } = videoSettings;
  const startTime = calculateTimeInHoursMinutesSeconds(customStartTime);
  const endTime = calculateTimeInHoursMinutesSeconds(customEndTime);

  useEffect(() => {
    const video = document.getElementById(
      "condense-video-id"
    ) as HTMLVideoElement;

    if (video) {
      const handleLoadedMetaData = () => {
        const videoDurationInSeconds = video.duration;
        onVideoSettingChange({
          ...videoSettings,
          customEndTime: videoDurationInSeconds,
        });
        setVideoEndTime(videoDurationInSeconds);
      };

      video.addEventListener("loadedmetadata", handleLoadedMetaData);
      return () => {
        if (video) {
          video.removeEventListener("loadedmetadata", handleLoadedMetaData);
        }
      };
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Slider
        className="mt-2"
        value={[customStartTime, customEndTime]}
        disabled={disabled}
        max={videoEndTime}
        step={1}
        onValueChange={(val: number[]) => {
          const [startTime, endTime] = val;
          onVideoSettingChange({
            ...videoSettings,
            customEndTime: endTime,
            customStartTime: startTime,
          });
        }}
      />
      <div className="flex items-center justify-between  text-xs">
        <p className="flex flex-col gap-1">
          Start Time:{" "}
          <span className="text-primary font-medium">{startTime}</span>
        </p>
        <p className="flex flex-col gap-1">
          End Time: <span className=" text-primary font-medium">{endTime}</span>
        </p>
      </div>
    </div>
  );
};
