from fastapi import (
    FastAPI,
    Response,
    status,
    Request,
    Header,
    UploadFile,
    Form,
    File,
    HTTPException,
)
from fastapi.middleware.cors import CORSMiddleware
import logging

# from pymongo.mongo_client import MongoClient
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
import uuid
from dotenv import load_dotenv
import os
from datetime import datetime
from bson import ObjectId
from fastapi.responses import StreamingResponse
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

load_dotenv()

# setting logging
logging.basicConfig(
    level=(logging.DEBUG if os.getenv("LOG_MODE") == "DEBUG" else logging.INFO)
)

# Setting up mongodb
uri = f"mongodb+srv://{os.getenv('MONGO_USERNAME')}:{os.getenv('MONGO_PASSWORD')}@{os.getenv('MONGO_CLUSTER')}/?retryWrites=true&w=majority"
client = AsyncIOMotorClient(uri, server_api=ServerApi("1"))

try:
    client.admin.command("ping")
    logging.info("You successfully connected to MongoDB!")
except Exception as e:
    logging.error(e)

db = client[os.getenv("MONGO_DB_NAME")]

# Handling envs
origins = os.getenv("FRONTEND_ORIGINS")
if not origins:
    raise Exception("FRONTEND_ORIGINS env not found. Exiting...")

# Setting up app
middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=origins.split(","),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*"],
    )
]

app = FastAPI(middleware=middleware)

from pydantic import BaseModel


###################### SIGN IN/ SIGN UP ##########################


class LoginRequest(BaseModel):
    auth_type: str
    user_name: str


@app.post("/signin")
async def signin(req: LoginRequest, resp: Response):
    if req.auth_type == "GUEST":
        auth_token = str(uuid.uuid4())  # create a new auth_token
        session_obj = {
            "auth_token": auth_token,
            "auth_type": req.auth_type,
            "user_name": req.user_name,
        }
        result = await db["sessions"].insert_one(
            session_obj
        )  # insert auth_token in mongodb session collection
        if result.acknowledged:
            return {"auth_token": auth_token}
        else:
            resp.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    else:
        resp.status_code = status.HTTP_400_BAD_REQUEST

    return "something went wrong"


###################### GET USER (DASHBOARD) ####################


@app.get("/user")
async def getUser(resp: Response, auth_token: str = Header(...)):
    logging.debug("auth_token_received: %s", auth_token)
    session = await db["sessions"].find_one({"auth_token": auth_token})
    if session and session["auth_type"] == "GUEST":
        return {"name": session["user_name"], "interviews": []}

    raise HTTPException(status_code=400, detail="Bad Request")


#################### INTERVIEW ######################


class InterviewSetupRequest(BaseModel):
    position: str
    skills: str
    job_description: str
    experience: str


@app.post("/interview/setup")
async def setupInterview(req: InterviewSetupRequest, auth_token: str = Header(...)):
    session = await db["sessions"].find_one({"auth_token": auth_token})
    if not session:
        raise HTTPException(status_code=400, detail="Bad Request")
    interview_id = ObjectId()

    # TODO:  make request with to prompt engine and take the question and isLast from response
    # request : {interview_id = str(interview_id), user_name = session["user_name"]}

    next_question = "Greeting.. Question?"
    is_last = False

    # insert the interivew details in db
    interview = await db["interviews"].insert_one(
        {
            "_id": interview_id,
            "position": req.position,
            "skills": req.skills,
            "job_description": req.job_description,
            "experience": req.experience,
            "created_at": datetime.now(),
            "transcript": [{"sender": "jeff", "content": next_question}],
        }
    )

    # update interview id in session for quick fetch
    await db["sessions"].update_one(
        {"auth_token": auth_token},
        {
            "$set": {
                "ongoing_interview_id": interview.inserted_id,
                "ongoing_interview_question": next_question,
                "ongoing_interview_is_last_question": is_last,
            }
        },
    )

    return {"interview_id": str(interview.inserted_id)}


class GetQuestionRequest(BaseModel):
    interview_id: str


@app.post(
    "/interview/get-question"
)  # returns video stream of last conversation of jeff
async def getQuestionVideo(
    req: GetQuestionRequest, resp: Response, auth_token: str = Header(...)
):
    # verify if the interview is ongoing
    session = await db["sessions"].find_one(
        {"auth_token": auth_token, "ongoing_interview_id": ObjectId(req.interview_id)}
    )

    if not session:
        resp.status_code = (
            status.HTTP_404_NOT_FOUND
        )  # the link does not exist or is no more active
        return "something went wrong"

    question = session["ongoing_interview_question"]
    is_last = session["ongoing_interview_is_last_question"]
    logging.debug(f"question is : {question}")

    headers = {
        "Content-Disposition": "inline",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Transfer-Encoding": "chunked",
        "is-last": str(is_last),
    }

    # TODO : convert next_question to video stream
    # For now getting stream from obama.mp4
    video_path = "videoQuestion.mp4"

    def stream_video():  # NOTE: this function can be  converted to async/await if necessary
        with open(video_path, mode="rb") as video_file:
            while chunk := video_file.read(65536):
                yield chunk

    return StreamingResponse(stream_video(), media_type="video/mp4", headers=headers)


"""
    # Task 1. Audio stop from user
    # cant maintain lambda HTTP connecctions, can break anytime
    # TODO: find a way to maintain connection
    # Task 2. WebRTC - opencv - gstreamer - webRTC - we are taking gstream URL, NVIDAI deepstrea
    # Task 3. Front-end me alag process
        Active connection, feeding text.
        Abhi multi-user
            Usko bas, there is no state maintained
        
        ->Maintaining stream for multiple user [TASK]
        -> STATEFUL complexity

    # Sign up, for waitlist - landing page.
    #  
        
    # 
"""


"""
    # Task 1. Audio stop from user
    # cant maintain lambda HTTP connecctions, can break anytime
    # TODO: find a way to maintain connection
    # Task 2. WebRTC - opencv - gstreamer - webRTC - we are taking gstream URL, NVIDAI deepstrea
    # Task 3. Front-end me alag process
        Active connection, feeding text.
        Abhi multi-user
            Usko bas, there is no state maintained
        
        ->Maintaining stream for multiple user [TASK]
        -> STATEFUL complexity

    # Sign up, for waitlist - landing page.
    #  
        
    # 
"""


@app.post(
    "/interview/submit-audio-get-question"
)  # gets audio and returns video stream next question
async def submit_audio_get_question(
    resp: Response,
    audio: UploadFile = File(...),
    interview_id: str = Form(...),
    interview_status: str = Form(...),
    auth_token: str = Header(...),
):
    # verify if the interview is ongoing and correct
    session = await db["sessions"].find_one(
        {"auth_token": auth_token, "ongoing_interview_id": ObjectId(interview_id)}
    )

    if not session:
        resp.status_code = (
            status.HTTP_404_NOT_FOUND
        )  # the link does not exist or is no more active
        return "something went wrong"

    # TODO: proccess audio here -> convert to text, speech analysis !in a separate thread!
    # NOTE: get audio data with audio.file
    file_location = (
        f"audio_files/{audio.filename}"  # saving file for now - TODO: remove this line
    )
    with open(file_location, "wb") as file:
        file.write(await audio.read())

    answer = "So... answer answer answer..."

    # TODO: request prompt engine here with answer, interview_status, interview_id
    # get next_question, is_last and set the below variables
    next_question = "That's a good answer... Now, question ?"
    is_last = True

    # updating into transacript
    new_transcripts = [
        {"sender": "you", "content": answer},
        {"sender": "jeff", "content": next_question},
    ]
    await db["intreviews"].update_one(
        {"_id": ObjectId(interview_id)},
        {"$push": {"transcript": {"$each": new_transcripts}}},
    )

    # updating question into session
    await db["sessions"].update_one(
        {"_id": session["_id"]},
        {
            "$set": {
                "ongoing_interview_question": next_question,
                "ongoing_interview_is_last_question": is_last,
            }
        },
    )

    headers = {
        "Content-Disposition": "inline",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Transfer-Encoding": "chunked",
        "is-last": str(is_last),
    }

    # TODO : convert next_question to video stream
    # For now getting stream from obama.mp4
    video_path = "videoQuestion.mp4"

    def stream_video():  # NOTE: this function can be  converted to async/await if necessary
        with open(video_path, mode="rb") as video_file:
            while chunk := video_file.read(65536):
                yield chunk

    return StreamingResponse(stream_video(), media_type="video/mp4", headers=headers)


#################### EXCEPTION HANDLERS ##################


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    exc_str = f"{exc}".replace("\n", " ").replace("   ", " ")
    logging.error(f"{request}: {exc_str}")
    content = {"status_code": 10422, "message": exc_str, "data": None}
    return JSONResponse(
        content=content, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY
    )
