# Catapult Backend 
### FastAPI + Speech Processing + Video Generation

#

#### Setup

Go to `catapult-backend` folder ->

1. `python3 --version` -- needs 3.11
2. `python3 -m venv env_dev`
3. `source ./env_dev/bin/activate`
4. `pip install -r requirements.txt`
4. Verify detials in `.env` file
5. `python3 -m uvicorn main:app --reload`

make sure after every pip install you do 
`pip freeze > requirements.txt` 

# 

#### Workspace setup

For code formatting use **Black Formatter** (VS code).
Set both auto format on save and strict type checking. Steps -  
1. Install **Black Formatter**
2. cmd + shift + P > `open workspace settings [JSON]`
3. Enter the following fields - 

```
"[python]": {
        "editor.defaultFormatter": "ms-python.black-formatter",
        "editor.formatOnType": true,
        "editor.formatOnSave": true,
    }, 
"python.analysis.typeCheckingMode": "basic"
```

# 

#### Common issues 

* Pylance's `import not resolved` ( Setting up default interpreter for the workspace )

1. activate your venv (`env_dev`) in terminal 
2. Check in python - 
```
import sys
print(sys.executable) 
```
3. cmd + shift + P > `Python: select interpreter`
4. Copy the path from 2 here
   

#### Standard practices 

1. Don't use print statement, use logging module (https://realpython.com/python-logging/)  
2. For a new feature, create a class as python module in separate folder `modules`
3. Do `pip freeze > requirements.txt` before push. OFCOURSE, create a new venv for this project.
4. Create different venv for experimental branches