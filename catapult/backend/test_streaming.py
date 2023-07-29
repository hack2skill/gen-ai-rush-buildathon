"""Use this file to test audio and image frames streaming, simultaneously  using fastapi 

https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/how-to-speech-synthesis?tabs=browserjs%2Cterminal&pivots=programming-language-python

"""


import os
from azure.cognitiveservices.speech import (
    AudioDataStream,
    SpeechConfig,
    SpeechSynthesizer,
    SpeechSynthesisOutputFormat,
)
from azure.cognitiveservices.speech.audio import AudioOutputConfig
import azure.cognitiveservices.speech as speechsdk
import re
import time
from queue import Queue
from dotenv import load_dotenv
from pydub import AudioSegment
from io import BytesIO


load_dotenv()

speech_key, service_region = os.getenv("SPEECH_KEY"), os.getenv("SERVICE_REGION")


def InitTTS(speech_key, service_region):
    speech_config = speechsdk.SpeechConfig(
        subscription=speech_key, region=service_region
    )
    speech_config.speech_synthesis_language = "en-US"
    speech_config.speech_synthesis_voice_name = "en-US-JennyNeural"

    # speech_config.set_speech_synthesis_output_format(speechsdk.SpeechSynthesisOutputFormat.Raw24Khz16BitMonoPcm)
    speech_config.set_speech_synthesis_output_format(
        speechsdk.SpeechSynthesisOutputFormat.Raw24Khz16BitMonoPcm
    )
    # print('sssssssss', speech_config.output_format)

    # audio_config = AudioOutputConfig(use_default_speaker=True)
    # synthesizer = SpeechSynthesizer(speech_config = speech_config, audio_config = None)
    synthesizer = SpeechSynthesizer(
        speech_config=speech_config, audio_config=None  # audio_config
    )
    return synthesizer


def Text2Audio(in_synthesizer, text):
    """function to pre-process audio and out every word in queue to be used for inference"""
    tts_queue = Queue()
    TTSFrames = re.split("[.][\s]+|[。][\s]*|[\n][\s]*", text)
    # print(TTSFrames) # a list of words
    for i in range(len(TTSFrames)):
        if TTSFrames[i] == "":  # skip if the word is empty,
            continue
        while 1:
            result = in_synthesizer.speak_text_async(
                TTSFrames[i]
            ).get()  # get method has all metadata
            # print(result.properties.get_property(0))
            if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
                break
        # tts_queue.put(result.audio_data[256:-30])#16, -30
        tts_queue.put(result.audio_data)
        time.sleep(0.5)

    yield tts_queue.get()


# synthesizer = InitTTS(speech_key, service_region )

# result_raw = synthesizer.speak_text_async("Hello")

# q=Text2Audio(synthesizer,"World")

from fastapi import FastAPI, Response
from fastapi.responses import StreamingResponse
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
import cv2

# Setting up app
middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*"],
    )
]

app = FastAPI(middleware=middleware)


@app.get("/")
async def root():
    return {"message": "Hello World!"}


@app.get("/video_feed")
def get_frames():
    synthesizer = InitTTS(speech_key, service_region)

    def stream_video():
        cap = cv2.VideoCapture("videoQuestion.mp4")
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            _, img_encoded = cv2.imencode(".jpg", frame)
            yield (
                b"--frame\r\n"
                b"Content-Type: image/jpeg\r\n\r\n" + img_encoded.tobytes() + b"\r\n"
            )
        cap.release()

    # def stream_audio():
    #     audio_queue = Text2Audio(synthesizer, "Hello how are you")
    #     audio_segment = AudioSegment.from_file(BytesIO(next(audio_queue)), format="wav")
    #     audio_segment.export("temp.wav", format="wav")

    #     # while True:
    #     #     yield (
    #     #         b"--frame\r\n"
    #     #         b"Content-Type: audio/wav\r\n\r\n" + audio_queue + b"\r\n"
    #     #     )

    #     for audio_elem in audio_queue:
    #         yield (
    #             b"--frame\r\n" b"Content-Type: audio/wav\r\n\r\n" + audio_elem + b"\r\n"
    #         )

    audio_path = "mySound.wav"

    def stream_audio():  # NOTE: this function can be  converted to async/await if necessary
        with open(audio_path, mode="rb") as audio_file:
            while chunk := audio_file.read(2096):
                yield chunk

    def generate_stream():
        for audio_frame, video_frame in zip(stream_audio(), stream_video()):
            yield audio_frame
            # yield video_frame

    return StreamingResponse(generate_stream(), media_type="audio/wav")


# # Interview.js:111     GET http://localhost:8001/video_feed net::ERR_INCOMPLETE_CHUNKED_ENCODING 200 (OK)
# fetchStream @ Interview.js:111
# unmuteAndFetchQuestion @ Interview.js:142
# onClick @ Interview.js:242
# callCallback @ react-dom.development.js:4164
# invokeGuardedCallbackDev @ react-dom.development.js:4213
# invokeGuardedCallback @ react-dom.development.js:4277
# invokeGuardedCallbackAndCatchFirstError @ react-dom.development.js:4291
# executeDispatch @ react-dom.development.js:9041
# processDispatchQueueItemsInOrder @ react-dom.development.js:9073
# processDispatchQueue @ react-dom.development.js:9086
# dispatchEventsForPlugins @ react-dom.development.js:9097
# (anonymous) @ react-dom.development.js:9288
# batchedUpdates$1 @ react-dom.development.js:26140
# batchedUpdates @ react-dom.development.js:3991
# dispatchEventForPluginEventSystem @ react-dom.development.js:9287
# dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay @ react-dom.development.js:6465
# dispatchEvent @ react-dom.development.js:6457
# dispatchDiscreteEvent @ react-dom.development.js:6430
# Interview.js:136 Uncaught (in promise) TypeError: network error
