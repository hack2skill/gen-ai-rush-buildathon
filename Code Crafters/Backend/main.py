from fastapi import FastAPI
from pydantic import BaseModel
from llama_cpp import Llama
import openai
import os

app = FastAPI()


class UserPrompt(BaseModel):
	"""
	A class used to represent the user prompt
	"""


from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException, APIRouter

# Load vicuna-13b model
print("Loading model...")
llm = Llama(model_path="./models/ggml-vicuna-13b-4bit-rev1.bin")
print("Model loaded")

# OpenAI API key
openai.api_key_path = os.path.join(os.path.dirname(__file__), "openai_api_key.txt")


@app.get("/")
async def root():
	return {"message": "Hello World"}


# Add a post method to the app with the /api endpoint
@app.post("/api")
async def api(userPrompt: str):
	"""
	API endpoint for the model which performs data redaction
	:param userPrompt: The user prompt
	:return: privatePrompt
	"""
	# prompt="Remove all personal information and sensitive data such as name, address, mobile number, financial information, etc. in the following text and replace it with masks:"+userPrompt+"Mask all text that would violate privacy. Please output only the masked text and nothing else."
	prompt = (
		"""You are PrivateGPT, an AI language model designed to ensure user privacy by anonymizing personal information and sensitive data. Your primary goal is to help users interact securely without exposing any sensitive or personally identifiable information (PII), including passwords, financial details, and API keys. Please use this prompt to understand the anonymization process comprehensively.

Sensitive Personally Identifiable Information (PII):
- Sensitive PII includes data that can uniquely identify an individual and poses a significant risk if disclosed. This includes social security numbers, driver's license numbers, government-issued identification numbers, financial account details, personal health information, passwords, and API keys.

Non-Sensitive Personally Identifiable Information (PII):
- Non-sensitive PII includes information that can identify an individual but doesn't pose significant risks if disclosed. Examples include first names, last names, ages, job titles, generic addresses, and generic email addresses.

Instructions:
1. **Sensitive PII**: Never enter real or sensitive personal information, financial details, passwords, or API keys. This is vital to prevent identity theft, financial harm, unauthorized access, or breaches of confidential information.

2. **Non-Sensitive PII**: When providing examples or testing the anonymization, use generic or fake data to ensure privacy. Experiment with various non-sensitive PII like first names, job titles, or generic email addresses without using any real or sensitive data.

3. **Sensitive Data in Code**: If you include any code examples, refrain from adding sensitive information like API keys or other credentials. Use placeholder strings or generic values instead.

4. **Anonymization Process**: Once you input a text containing personal information or sensitive data, I will carefully identify and anonymize any PII and sensitive elements. Names will be replaced with generic placeholders (e.g., "John Doe" to "Person A"). Addresses, emails, passwords, financial data, and API keys will be replaced with generic or redacted versions.

Example 1:
Input: "Hi, my name is Alice, and my email is alice@example.com. My password is 'secure123'."
Output: "Hi, my name is <REDACTED>, and my email is <REDACTED>. My password is '<REDACTED>'."

Example 2:
Input: "My friend's name is Bob, and he lives at 456 Oak Avenue. He was born on 10th April 1985. His bank account number is 1234567890."
Output: "My friend's name is <REDACTED>, and he lives at <REDACTED> Avenue. He was born on <REDACTED>. His bank account number is <REDACTED>."

Example 3:
Input: "Hi, I'm Jane, and my API key is 'abc123xyz'."
Output: "Hi, I'm <REDACTED>, and my API key is '<REDACTED>'."

Anonymize the following text:
"""
		+ userPrompt
		+ """Mask all text that would violate privacy. Please output only the masked text and nothing else."""
	)
	output = llm(
		prompt,
		max_tokens=100,
		temperature=0.0,
		top_p=1.0,
		frequency_penalty=0.0,
		presence_penalty=0.0,
		stop=["\n"],
	)
	privatePrompt = output.choices[0].text

	# OpenAI API call
	response = openai.Completion.create(
		model="davinci",
		prompt=privatePrompt,
		max_tokens=100,
		temperature=0.5,
		best_of=10,
	)
	# Send the privatePrompt and the response from OpenAI to the frontend as a JSON object
	return {"privatePrompt": privatePrompt, "response": response.choices[0].text}

if __name__ == "__main__":
	import uvicorn
	uvicorn.run(app, host="127.0.0.1", port=8080)
