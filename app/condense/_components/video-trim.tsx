import type { VideoInpSettings } from "@/utils/types";
import { Slider } from "@/components/ui/slider";

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
  return <Slider className="mt-2" />;
};
