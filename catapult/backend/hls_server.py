from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware import Middleware
from dotenv import load_dotenv
import os

from fastapi.responses import FileResponse
from pathlib import Path


class CacheMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers["Cache-Control"] = "no-store, max-age=0"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
        return response


load_dotenv()


# Handling envs
origins = os.getenv("FRONTEND_ORIGINS")
if not origins:
    raise Exception("FRONTEND_ORIGINS env not found. Exiting...")

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


app.add_middleware(CacheMiddleware)

app.mount("/stream", StaticFiles(directory="stream_output"), name="static")
