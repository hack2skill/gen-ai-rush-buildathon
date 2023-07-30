# Gen-Ai-Rush-Buildathon

## Team Name - Albatross

Problem Statement - As modern enterprises increasingly utilize various tools for data sharing (Slack, Notion, Mailchimp etc), the inadvertent inclusion of Personally Identifiable Information (PII) by employees poses a significant challenge. Ensuring anonymity by appropriately handling PII is vital to comply with privacy regulations, protect data security, and maintain trust. 

Team Leader Email - riteshranjan1620@gmail.com

## A Brief of the Prototype:
The grand vision is to run a AI model on enterprise server which will keep montoring any exchange of data happening and will stop/warn if theere is any sensitive data leak.

For POC purpose, we have added this model between the usage of LLMs, and will prevent giving sensitive data to online LLMs.
  
## Tech Stack: 
Python
Flask
Javascript
React
OpenaAI
GenAI

   
## Step-by-Step Code Execution Instructions:
There are 2 different services

For securex-fe, it is a frontend interface written in react
Steps to run on local machine
1. npm install
2. npm start

For securex-be, it is a microservice written in flask using python
Steps to urn on local machine
1. Install dependencies mentioned in requirements.txt, go to the directory where requiremnts.txt is then run pip install -r requirements.xtx
2. Run hello.py -> python3 run.py

  
## What I Learned:
   1. We were first trying to setup local models, we learned about inferencing and quantization of models.
   2. But the local models were super slow and was not able to perform the task correctly.
   3. The bottle neck was computing power of our system.

