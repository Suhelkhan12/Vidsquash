import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { byteConversion } from "@/utils/format";
import { FileActions } from "@/utils/types";

type VideoInputDetailsProps = {
  videoFile: FileActions;
  onClear: () => void;
};

const VideoInputDetails = ({ videoFile, onClear }: VideoInputDetailsProps) => {
  return (
    <Card className=" flex-grow bg-secondary">
      <CardHeader className="pb-2">
        <CardTitle>Video controls</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">
          <p>{videoFile.fileName}</p>
          <div className="mt-2">
            <div className="flex items-center gap-4">
              File Size
              <p className="font-semibold text-primary">
                {byteConversion(videoFile.fileSize)}
              </p>
            </div>
          </div>
        </CardDescription>
        <Button onClick={onClear}>Change video</Button>
      </CardContent>
    </Card>
  );
};

export default VideoInputDetails;
