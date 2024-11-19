import React from "react";
import { Loader } from "lucide-react";
import { formatTime } from "@/utils/fileConverter";
import { Progress } from "@/components/ui/progress";

const CondenseProgress = ({
  progress,
  seconds,
}: {
  progress: number;
  seconds: number;
}) => {
  return (
    <div className="flex justify-between items-center gap-2 p-0.5 max-w-xs w-full  mx-auto mt-8">
      <div className="flex-1">
        <div className="flex justify-between text-sm mb-2">
          <div className="flex gap-2 items-center">
            {progress ? <p>Condensing</p> : <p>Loading Video</p>}{" "}
            <Loader className="animate-spin w-4 h-4" />
          </div>
          <p className="text-xs">{formatTime(seconds / 1000)}</p>
        </div>
        <Progress value={progress} />
      </div>
    </div>
  );
};

export default CondenseProgress;
