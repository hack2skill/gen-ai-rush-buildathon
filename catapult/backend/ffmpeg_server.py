import ffmpeg
import subprocess
import cv2
from queue import Queue
import wave
from pydub import AudioSegment

#video_format = "hls"
video_format = "flv"
#server_url = "stream_output/playlist.m3u8"
server_url = "http://localhost:8081/stream"
video_path = "videoQuestion.mp4"
#audio_path = "audio_files/mySound.wav"


def start_streaming(width, height, fps, audio_file):
    video_stream = ffmpeg.input(
        "pipe:",
        format="rawvideo",
        codec="rawvideo",
        pix_fmt="bgr24",
        s="{}x{}".format(width, height),
    )

    #audio_stream = ffmpeg.input(audio_file)

    process = (
        ffmpeg.output(
            video_stream,
            server_url,
            format=video_format,
            listen=1,
            pix_fmt="yuv420p",
            preset="ultrafast",
            #hls_list_size=10,  # the maximum number of playlist entries
            #hls_flags="delete_segments",  # delete segments from the playlist file as they become unavailable
        )
        # .global_args("-re")  # argument to act as a live stream
        .overwrite_output().run_async(pipe_stdin=True)
    )
    return process


def init_cap():
    cap = cv2.VideoCapture(video_path)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    return cap, width, height


def run(audio_file=None):
    cap, width, height = init_cap()
    print(width, height)
    fps = cap.get(cv2.CAP_PROP_FPS)
    streaming_process = start_streaming(width, height, fps, audio_file)

    # while True:
    #     while True:
    #         ret, frame = cap.read()
    #         if ret:
    #             streaming_process.stdin.write(frame.tobytes())
    #         else:
    #             break

    #     cap.release()
    #     cap, width, height = init_cap()

    while True:
        ret, frame = cap.read()
        print(frame.shape,type(frame),frame.dtype,frame[0,0])
        if ret:
            streaming_process.stdin.write(frame.tobytes())
        else:
            break

    cap.release()

    streaming_process.stdin.close()
    streaming_process.wait()

if __name__=="__main__":
    run()
