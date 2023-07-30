# Sparked - Workflow Automation and RCA Tool

## Team Name
![Sparked](https://join.slack.com/t/smarterpathworkspace/shared_invite/zt-206kfd5lg-nle9hCS8DAXxWGruWuy6aQ)

## Problem Statement
In the era of digital transformation, IT operations are becoming increasingly complex and tedious. The problem we are solving is to simplify IT operations by automating workflows and providing Root Cause Analysis (RCA) via an easy-to-use Slack interface. Our tool can also ingest APIs to further enhance automation and decision-making capabilities.

## Team Leader Email
akshat.khare08@gmail.com

## A Brief of the Prototype
Our prototype is a Slack bot that communicates with various APIs to automate tasks and provide insightful RCAs. The bot uses advanced AI models to understand user inputs and generate meaningful outputs. Here is a simplified UML diagram of our prototype:
![tech](https://github.com/akshat-khare/SmarterPath/assets/25928898/a89904b9-f581-44c8-8301-474daa88c665)
Try it out at our ![slack channel](https://join.slack.com/t/smarterpathworkspace/shared_invite/zt-206kfd5lg-nle9hCS8DAXxWGruWuy6aQ)!



## Tech Stack
- OpenAI's GPT-4: For generating intelligent responses and calling functions.
- OpenAI Functions: To allow the model to interact with external systems.
- Llama Index: To look up relevant information.
- Google Cloud Platform: For storage and computing resources.
- SendGrid API: For sending emails.
- JSON Schema APIs: For defining and validating the structure of JSON data.
- Slack Bolt for Python: For creating and managing the Slack bot.
- Flask: For creating server-side endpoints that the Slack bot interacts with.
- Python: For server-side programming.

## Step-by-Step Code Execution Instructions
1. Clone the repository: `git clone <repo_url>`
2. Install dependencies: `pip install flask requests flask_cors slack_bolt google-cloud-bigquery tiktoken sendgrid`
3. Set environment variables: `SLACK_TOKEN`, `SIGNING_SECRET`, `STRATEGY_URL`, `OPENAI_SECRET`, and `SENDGRID_SECRET`.
4. Run the application: `flask run -p 5000 -a slack.py` for the Slack bot and `flask run -p 3000 -a chatbot.py` for the OpenAI brain.
5. Open Slack and mention the bot in a message.
6. Watch as the bot responds intelligently to your messages.


## What I Learned
This project has been a tremendous learning experience. The most significant learning was understanding the business needs and their alignment with the technology. We learned how to work with artificial intelligence agents and how to deal with constraints like token limits. 

We understood the intricacies of Flask and deploying applications on Google Cloud Platform. The project also improved our understanding of Python programming, API integrations, and automation of IT operations. 

The project taught us valuable lessons in teamwork, project management, and agile methodologies. We now understand the importance of user experience, the value of continuous learning, and the need to adapt quickly to new technologies.
