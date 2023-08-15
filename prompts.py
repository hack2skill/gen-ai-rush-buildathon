import requests

API_URL = "http://localhost:3000/api/v1/prediction/24084857-bbd6-4d99-bb0b-f53573b402e5"

def query(payload):
    try:
        response = requests.post(API_URL, json=payload)
        response.raise_for_status()  # Check for HTTP errors
        return response.json()
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except requests.exceptions.RequestException as req_err:
        print(f"Request error occurred: {req_err}")
    except requests.exceptions.JSONDecodeError as json_err:
        print(f"JSON decode error occurred: {json_err}")
    return None

output = query({
    "question": "How many Email Breaches for Australia"
})

if output is not None:
    print(output)
