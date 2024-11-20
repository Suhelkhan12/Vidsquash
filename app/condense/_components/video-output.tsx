import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { formatTime } from "@/utils/fileConverter";
import {
  blobSize,
  byteConversion,
  reducedSizeInPercentage,
} from "@/utils/format";
import { FileActions } from "@/utils/types";

const VideoOutput = ({
  file,
  timeTaken,
}: {
  file: FileActions;
  timeTaken?: number;
}) => {
  const outputVideoSize = blobSize(file.outputBlob);
  const { sizeReduced, percentage } = reducedSizeInPercentage(
    file.fileSize,
    file.outputBlob
  );

  const handleDownload = () => {
    if (!file.url) return;
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = file.url;
    a.download = file.output as string;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(file.url);
    document.body.removeChild(a);
  };

  return (
    <Card className=" max-w-xs mx-auto mt-8 bg-muted">
      <CardHeader className="p-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Output file</h2>
          <Button onClick={handleDownload}>Download video</Button>
        </div>
      </CardHeader>
      <CardDescription className="p-3 pt-0">
        <div className="mt-2 flex flex-col gap-1">
          <div className="flex items-center gap-10">
            <p className="max-w-32 w-full">File size </p>
            <span className="text-primary font-semibold">
              {outputVideoSize}
            </span>
          </div>
          <div className="flex items-center gap-10">
            <p className="max-w-32 w-full"> Size reduced %</p>
            <span className="text-primary font-semibold">{percentage}</span>
          </div>
          <div className="flex items-center gap-10">
            <p className="max-w-32 w-full">Original file size</p>
            <span className="text-primary font-semibold">
              {byteConversion(file.fileSize)}
            </span>
          </div>
          <div className="flex items-center gap-10">
            <p className="max-w-32 w-full">Size reduced</p>
            <span className="text-primary font-semibold">{sizeReduced}</span>
          </div>
          <div className="flex items-center gap-10">
            <p className="max-w-32 w-full">Time taken</p>
            <span className="text-primary font-semibold">
              {timeTaken ? formatTime(timeTaken) : "---"}
            </span>
          </div>
        </div>
      </CardDescription>
    </Card>
  );
};

export default VideoOutput;
