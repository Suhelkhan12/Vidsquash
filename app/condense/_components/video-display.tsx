import React from "react";

const VideoDisplay = ({ url }: { url: string }) => {
  return (
    <div className=" max-w-3xl w-full shrink-0 rounded-md overflow-hidden">
      <video id="condense-video-id" controls>
        <source src={url} type={"video/mp4"} />
      </video>
    </div>
  );
};

export default VideoDisplay;
