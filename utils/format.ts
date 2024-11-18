export const acceptedVideoFiles = {
  "video/*": [],
};

export const byteConversion = (bytes: number): string => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = (bytes / Math.pow(1024, i)).toFixed(2);

  return `${size} ${sizes[i]}`;
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
