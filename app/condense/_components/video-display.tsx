import React from "react";

const VideoDisplay = ({ url }: { url: string }) => {
  return (
    <video id="condense-video-id" controls>
      <source src={url} type={"video/mp4"} />
    </video>
  );
};

export default VideoDisplay;
