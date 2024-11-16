export const acceptedVideoFiles = {
  "video/*": [],
};

export const byteConversion = (bytes: number): string => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = (bytes / Math.pow(1024, i)).toFixed(2);

  return `${size} ${sizes[i]}`;
};
