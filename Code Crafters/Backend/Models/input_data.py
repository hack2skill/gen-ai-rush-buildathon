from pydantic import BaseModel

class InputData(BaseModel):
	"""
	A class used to represent the user prompt
	"""
	userPrompt: str