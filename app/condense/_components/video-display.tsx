import React from "react";

const VideoDisplay = ({ url }: { url: string }) => {
  return (
    <div className=" lg:max-w-[50%] w-full flex items-center justify-center shrink-0 rounded-md overflow-hidden">
      <video id="condense-video-id" controls className="w-full">
        <source src={url} type={"video/mp4"} />
      </video>
    </div>
  );
};

export default VideoDisplay;
