export const acceptedVideoFiles = {
  "video/*": [],
};

export const byteConversion = (bytes: number): string => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = (bytes / Math.pow(1024, i)).toFixed(2);

  return `${size} ${sizes[i]}`;
};

export const blobSize = (blob?: Blob): string => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  let size = blob?.size || 0;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < sizes.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(2)} ${sizes[unitIndex]}`;
};

export const reducedSizeInPercentage = (
  bytes: number,
  blob?: Blob
): { sizeReduced: string; percentage: string } => {
  const blobSize = blob?.size || 0;
  const adjustedSize = Math.max(0, bytes - blobSize);
  const percentage = (
    blobSize > 0 ? (adjustedSize / bytes) * 100 : 100
  ).toFixed(2);

  return { sizeReduced: byteConversion(adjustedSize), percentage };
};

export const calculateTimeInHoursMinutesSeconds = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) {
    return "Invalid input";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedTime =
    hours > 0
      ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(remainingSeconds).padStart(2, "0")}`
      : `${String(minutes).padStart(2, "0")}:${String(
          remainingSeconds
        ).padStart(2, "0")}`;

  return formattedTime;
};
