"use client";

import { QualityType, VideoInpSettings } from "@/utils/types";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

type EditVideoProps = {
  videoSettings: VideoInpSettings;
  onVideoSettingChange: (value: VideoInpSettings) => void;
  disabled: boolean;
};

const EditVideo = ({
  videoSettings,
  onVideoSettingChange,
  disabled,
}: EditVideoProps) => {
  return (
    <div className="flex flex-col gap-1 text-xs">
      <div className="flex justify-between items-center">
        <p>Remove Audio</p>
        <Switch
          disabled={disabled}
          onCheckedChange={(val: boolean) =>
            onVideoSettingChange({
              ...videoSettings,
              removeAudio: val,
            })
          }
          checked={videoSettings.removeAudio}
        />
      </div>
      <Separator />
      <div className="flex justify-between items-center">
        <p>Condense for twitter</p>
        <Switch
          disabled={disabled}
          onCheckedChange={(val: boolean) =>
            onVideoSettingChange({
              ...videoSettings,
              twitterCompressionCommand: val,
            })
          }
          checked={videoSettings.twitterCompressionCommand}
        />
      </div>
      <Separator />
      <div className="flex justify-between items-center">
        <p>Condense for whatsapp</p>
        <Switch
          disabled={disabled}
          onCheckedChange={(val: boolean) =>
            onVideoSettingChange({
              ...videoSettings,
              whatsappCompressionCommand: val,
            })
          }
          checked={videoSettings.whatsappCompressionCommand}
        />
      </div>
      <Separator />

      {!videoSettings.whatsappCompressionCommand &&
        !videoSettings.twitterCompressionCommand && (
          <>
            <div className="flex justify-between items-center">
              <p>Quality</p>
              <div className=" max-w-20 w-full">
                <Select
                  disabled={disabled}
                  onValueChange={(value: string) => {
                    const quality = value as QualityType;
                    onVideoSettingChange({
                      ...videoSettings,
                      quality,
                    });
                  }}
                >
                  <SelectTrigger className="p-2 text-xs">
                    <SelectValue placeholder="Quality" />
                  </SelectTrigger>
                  <SelectContent>
                    {videoQuality.map((quality) => (
                      <SelectItem
                        key={quality.label}
                        value={quality.value}
                        className="text-xs"
                      >
                        {quality.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Separator />

            <div className="flex justify-between items-center">
              <p>Format</p>
              <div className=" max-w-20 w-full">
                <Select
                  disabled={disabled}
                  onValueChange={(value: string) => {
                    const quality = value as QualityType;
                    onVideoSettingChange({
                      ...videoSettings,
                      quality,
                    });
                  }}
                >
                  <SelectTrigger className="p-2 text-xs">
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent>
                    {videoFormats.map((format) => (
                      <SelectItem
                        key={format.label}
                        value={format.value}
                        className="text-xs"
                      >
                        {format.label} (.{format.value})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default EditVideo;

const videoQuality: {
  label: string;
  value: string;
}[] = [
  {
    label: "High",
    value: "high",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Low",
    value: "low",
  },
];

const videoFormats: { label: string; value: string }[] = [
  { label: "MP4", value: "mp4" },
  { label: "MKV", value: "mkv" },
  { label: "MOV", value: "mov" },
  { label: "AVI", value: "avi" },
  { label: "FLV", value: "flv" },
  { label: "WEBM", value: "webm" },
];
