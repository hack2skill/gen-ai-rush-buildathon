import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactMic } from "react-mic";
import "./Interview.css";
import config from "../config";
import VideoPlayer from "./VideoPlayer";
 
function Interview() {
  const { interviewId } = useParams();
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(0);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loop, setLoop] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [audioMode, setAudioMode] = useState(false);
  const [submitAudioState, setSubmitAudioState] = useState("ONGOING");
 
  const loopVideoPath = "/obama.mp4";
 
  const navigate = useNavigate();
 
  const myVideoRef = useRef(null);
  const obamaVideoRef = useRef(null);
 
  // let mediaSource = null;
  // let sourceBuffer = null;
 
  useEffect(() => {
    setTitle(sessionStorage.getItem(`interview-title-${interviewId}`));
    getAudioPermission();
    getVideo();
  }, [interviewId]);
 
  // useEffect(() => {
  //   // Create a new media source
  //   const mediaSource = new mse.MediaSource();
 
  //   // Attach the media source to the video element
  //   obamaVideoRef.current.src = URL.createObjectURL(mediaSource);
 
  //   // Handle media source open event
  //   mediaSource.addEventListener("sourceopen", handleSourceOpen);
 
  //   return () => {
  //     // Clean up event listener and the media source
  //     mediaSource.removeEventListener("sourceopen", handleSourceOpen);
  //     mediaSource.endOfStream();
  //   };
  // }, []);
 
  // useEffect(() => {
  //   // Check if MediaSource is supported by the browser
  //   if (!window.MediaSource) {
  //     console.error("MediaSource API is not supported in this browser.");
  //     return;
  //   }
 
  //   // Create a new MediaSource
  //   mediaSource = new MediaSource();
 
  //   // Attach the MediaSource to the video element
  //   obamaVideoRef.current.src = URL.createObjectURL(mediaSource);
 
  //   // Handle media source open event
  //   mediaSource.addEventListener("sourceopen", handleSourceOpen);
 
  //   return () => {
  //     // Clean up event listener and the MediaSource
  //     mediaSource.removeEventListener("sourceopen", handleSourceOpen);
  //     mediaSource = null;
  //     sourceBuffer = null;
  //   };
  // }, []);
 
  // const handleSourceOpen = () => {
  //   // Create a new source buffer
  //   const mediaSource = obamaVideoRef.current.srcObject;
  //   const sourceBuffer = mediaSource.addSourceBuffer(
  //     'video/flv; codecs="avc1.42E01E, mp4a.40.2"'
  //   );
 
  //   // Fetch the video stream and feed it into the source buffer
  //   const videoUrl = "http://localhost:8080"; // Replace with your server URL
  //   fetch(videoUrl).then((response) => {
  //     const reader = response.body.getReader();
  //     function pump() {
  //       reader.read().then(({ done, value }) => {
  //         if (done) {
  //           mediaSource.endOfStream();
  //         } else {
  //           sourceBuffer.appendBuffer(value);
  //           pump();
  //         }
  //       });
  //     }
  //     pump();
  //   });
  // };
 
  // const handleSourceOpen = () => {
  //   // Create a new SourceBuffer
  //   const mimeType = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
  //   sourceBuffer = mediaSource.addSourceBuffer(mimeType);
 
  //   // Fetch the video stream and feed it into the SourceBuffer
  //   const videoUrl = "http://localhost:8080"; // Replace with your server URL
  //   fetch(videoUrl).then((response) => {
  //     const reader = response.body.getReader();
  //     function pump() {
  //       reader.read().then(({ done, value }) => {
  //         if (done) {
  //           mediaSource.endOfStream();
  //         } else {
  //           sourceBuffer.appendBuffer(value);
  //           pump();
  //         }
  //       });
  //     }
  //     pump();
  //   });
  // };
 
  const getAudioPermission = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        stream.getAudioTracks().forEach((track) => track.stop());
      })
      .catch((err) => {
        alert(
          "It works only when you enable audio. Please give audio permission and refresh the page"
        );
      });
  };
 
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setAudioMode(false);
        let video = myVideoRef.current;
        video.srcObject = stream;
        setTimeout(() => {
          video.play();
        }, 1000);
      })
      .catch((err) => {
        console.error("error:", err);
        setAudioMode(true);
      });
  };
 
  const unmuteAndFetchQuestion = () => {
    /* 
        - fetch question from the above params - request header {'auth-token'}, request {'interviewId'}, response {videoStream} {response header: interview-info}
        - get video stream as response 
        - when the video is finished 
        -     if (not isEnd) : listen()
        -     else              : redirect to feedback
        */
 
    setIsLoading(true);
 
    const fetchVideo = async () => {
      // const response = await fetch(
      //   config.backendUrl + "/interview/get-question",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json;charset=utf-8",
      //       "auth-token": sessionStorage.getItem("idToken"),
      //     },
      //     body: JSON.stringify({
      //       interview_id: interviewId,
      //     }),
      //   }
      // );
 
      // console.log("awating");
      // const videoBlob = await response.blob(); // this actually waits till the end of the stream. I want it to be streamed.
      // console.log("awaiting done ... result is ...", videoBlob);
      // const videoURL = URL.createObjectURL(videoBlob);
 
      // console.log("awaiting");
      // const videoURL = await response.body.interview_url;
      // console.log("awaited ...", response.body);
 
      // const videoBlob = await response.blob();
      // const videoURL = URL.createObjectURL(videoBlob);
      setIsLoading(false);
      console.log("setting muted false");
      setMuted(false);
      setLoop(false);
      // obamaVideoRef.current.src = videoURL;
 
      // obamaVideoRef.current.onended = () => {
      //   if (response.headers.get("is-last") === "True") {
      //     navigate(`/feedback/${interviewId}`);
      //   } else {
      //     listen();
      //   }
      // };
 
      return startClock();
    };
 
    return fetchVideo();
  };
 
  const listen = () => {
    /**
     * start recording audio and save it some question
     * show looping video again - set mute and loop as true & and also write `listening ..`
     * set listening to true to show audio controls
     */
    // obamaVideoRef.current.src = loopVideoPath;
    setMuted(true);
    setLoop(true);
    setListening(true);
  };
 
  const handleSubmit = (status) => {
    setSubmitAudioState(status);
    setListening(false); // this invokes handleRecordingFetchQuestion
  };
 
  const handleRecordingFetchQuestion = (recordedAudio) => {
    /* 
        - this is called when the `NEXT QUESTION` or `END INTERVIEW` button is clicked
        - status : ONGOING | END
        - reqeust {interview-id, audio (file), status}, response {videoStream}
        - 
        * set listening as false -  it'll stop recording, show the looped muted video and save its audio blob audioData
        * other things are same as unmute and fetchQuestion. 
        */
 
    const audioData = recordedAudio.blob;
    // console.log("audioData is", audioData);
 
    setIsLoading(true);
 
    const fetchVideo = async () => {
      const formData = new FormData();
      formData.append("audio", audioData, "recording.webm");
      formData.append("interview_id", interviewId);
      formData.append("interview_status", submitAudioState);
 
      const response = await fetch(
        config.backendUrl + "/interview/submit-audio-get-question",
        {
          method: "POST",
          headers: {
            "auth-token": sessionStorage.getItem("idToken"),
          },
          body: formData,
        }
      );
 
      const videoBlob = await response.blob();
      const videoURL = URL.createObjectURL(videoBlob);
      setIsLoading(false);
      setMuted(false);
      setLoop(false);
      obamaVideoRef.current.src = videoURL;
 
      obamaVideoRef.current.onended = () => {
        if (response.headers.get("is-last") === "True") {
          navigate(`/feedback/${interviewId}`);
        } else {
          listen();
        }
      };
    };
 
    return fetchVideo();
  };
 
  const startClock = () => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  };
 
  const convertMMSS = (seconds) => {
    return (
      Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0") +
      ":" +
      (seconds % 60).toString().padStart(2, "0")
    );
  };
 
  return (
    <div>
      {!ready ? (
        <div
          className="ready-screen"
          onClick={() => {
            setReady(true);
            unmuteAndFetchQuestion();
          }}
        >
          Ready?
        </div>
      ) : null}
      {isLoading ? <div className="ready-screen">Preparing ...</div> : null}
      <h3>{title}</h3>
      <p>
        <span>{convertMMSS(time)}</span>
      </p>
      <div className="video-call-frame">
        <div className="obama-video">
          {/* <video autoPlay muted={muted} loop={loop} ref={obamaVideoRef}>
            <source
              // src={loopVideoPath}
              src="http://localhost:8000/stream/videoQuestion.mp4"
              type="video/mp4"
            />
          </video> */}
          <VideoPlayer
            src="http://localhost:8080/stream/playlist.m3u8"
            autoPlay={true}
            muted={muted}
          />
          {/* <VideoPlayer
            src="http://localhost:8000/stream/videoQuestion.mp4"
            autoPlay={true}
            muted={muted}
          /> */}
 
          {listening ? (
            <span className="listening-text"> Listening ...</span>
          ) : null}
        </div>
        {/* <div className="my-video">
          {audioMode ? (
            <div>
              Enable audio and video to continue. Audio-only mode coming soon..
            </div>
          ) : (
            <video ref={myVideoRef} muted />
          )}
        </div> */}
      </div>
      <ReactMic
        record={listening}
        onStop={handleRecordingFetchQuestion}
        visualSetting="frequencyBars"
        // mimeType="audio/wav" // avialable only on gold :(
        echoCancellation={true}
        autoGainControl={true}
        noiseSuppression={true}
        channelCount={1} // mono
      />
      <br></br>
      <br></br>
      {listening ? (
        <div>
          <button onClick={() => handleSubmit("ONGOING")}>
            <h3>NEXT QUESTION</h3>
          </button>
          <br></br>
          <button onClick={() => handleSubmit("END")}>END INTERVIEW</button>
        </div>
      ) : null}
    </div>
  );
}
 
export default Interview;