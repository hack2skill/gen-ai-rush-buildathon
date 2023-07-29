import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ src, autoPlay, muted }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    const { current: video } = videoRef;
    const hls = new Hls({ liveSyncDurationCount: 2 });

    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      hls.loadSource(src);
    });

    hls.on(Hls.Events.FRAG_CHANGED, (event, data) => {
      console.log("New fragment:", data.frag.url);
    });

    hls.on(Hls.Events.ERROR, function (event, data) {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            // try to recover network error
            console.log("fatal network error encountered, try to recover");
            hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.log("fatal media error encountered, try to recover");
            hls.recoverMediaError();
            break;
          default:
            // cannot recover
            console.log("destroying media");
            hls.destroy();
            break;
        }
      }
    });

    hls.attachMedia(video);

    return () => {
      hls.destroy();
    };
  }, [src]);

  //   return <video src={src} autoPlay={autoPlay} muted={muted} />;

  return <video ref={videoRef} autoPlay={autoPlay} muted={muted} />;
};

export default VideoPlayer;
