# api/models/output_data.py
from pydantic import BaseModel

class OutputData(BaseModel):
    anonymized_text: str