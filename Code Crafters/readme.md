# Private GPT
![Logo](/static/privategpt_logo.png)
## Team Details
### Team Name :  Team Code Crafters
### Team Members : Jitin Krishna Chekka, Kodam Karthik
### Team Leader Email :  [Jitin Krishna Chekka](mailto:jitinchekka2@gmail.com)

## Problem Statement 
Private GPT is a privacy-focused web application built at the TPF GenAI Rush Buildathon that enables users to interact with AI models, such as ChatGPT or Bard, while ensuring the protection of their personal and sensitive information. This project removes all private information from the prompts given by users and masks or anonymizes them, thus safeguarding their privacy.

The main goal of Private GPT is to provide users with a secure and private environment to communicate with AI models without compromising their personal data. By removing sensitive information, such as names, locations, Aadhar or other Identity card numbers, financial information or any other identifiable details, users can freely engage in conversations and receive responses from AI models while maintaining their anonymity.


## Track
This project was built for the <b>Track : Open Innovation</b>

## Brief Of Prototype
This project removes all private information from the prompts given by users and masks or anonymizes them, thus safeguarding their privacy.
- Masking of personal information: Private GPT automatically identifies and masks personal information, such as names, addresses, or any other sensitive details, before sending the user prompts to the AI models.
- Privacy protection: The project ensures that no personally identifiable information is stored or transmitted to external services, providing a secure and private environment for users.
- Seamless AI model integration: Private GPT integrates with AI models, such as ChatGPT or Bard, allowing users to obtain relevant and helpful responses without sacrificing their privacy.
- User-friendly interface: The web application provides an intuitive and easy-to-use interface for users to interact with the AI models and view their anonymized conversations.

### Architecture
![Architecture](/static/arch.png)

### Private GPT vs OpenAI ChatGPT
![Private GPT vs OpenAI ChatGPT](/static/privategpt_vs_chatgpt.png)

## Redaction and Anonymization in Private GPT
![Redaction and Anonymization in Private GPT](/static/demo2.png)
## How it Works
Private GPT works in two steps:
1. Local Data Redaction: The user prompt is first redacted locally on your PC using a language model, such as Vicuna or any other good performance open-source LLM, to remove any personal information. The redacted prompt is then sent to the AI model.
Enterprises can use this models on their own servers instead of running on the user's PC.

2. AI Response Redaction: The sanitized Prompt is then sent to ChatGPT or Bard which generates a response. This is processed and sent back to the user after filtering out any unintended information.

## Tech Stack
- Python
- Streamlit: Python library for building user interfaces.Streamlit is a free and open-source framework to rapidly build and share beautiful machine learning and data science web apps.
- Sqlite: Database for using storing all chat queries.
- HTML/CSS: Markup and styling for the web application.
- Vicuna: Vicuna is a LLaMA - based language Model. It performs data redaction and anonymization.
- AI Models (e.g., ChatGPT, Bard): Deep learning models used to generate AI responses.
- FastAPI: FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints.
- llama-cpp-python: A library for using LLaMA models in Python and C++.

## Step by Step Code Execution Instructions:

### Prerequisites

To run Private GPT project locally, ensure that you have the following dependencies installed on your machine:

- Python 3.6 or higher
- Streamlit


### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/jitinchekka/tpf-buildathon.git

2. Navigate to the project directory:

   ```shell
   cd tp-buildathon

3. Install the dependencies:

   ```shell
   pip install -r requirements.txt

## Usage
1. Start the development server:

   ```shell
   streamlit run app.py
2. Open [http://localhost:8501](http://localhost:8501) to view the web application in the browser.

3. Enter your messages in the input field and click "Send" to initiate a conversation with the AI model. Your prompts will be anonymized before being sent to the AI model, ensuring your privacy. You can view the anonymized prompts in the console.

## What I Learnt
Here are the top 5 key takeaways from building "Private GPT" during the 24-hour TPF GenAI Rush Buildathon with Team Code Crafters:
1. **Resource Management:** Prioritizing tasks, managing time effectively, and making rapid decisions to meet project requirements within the constraints of the hackathon.

2. **Team Collaboration:** Learning to work efficiently as a team, assigning tasks based on individual strengths, and effectively communicating to achieve project goals within a tight timeframe.

3. **Integration of AI Models:** Gaining hands-on experience in integrating AI models like ChatGPT and Bard into the web application and processing their responses for user interactions.

4. **UI Development with Streamlit:** Building a user-friendly web application using Streamlit and creating interactive interfaces for users to communicate with AI models seamlessly.

5. **Privacy-Focused AI Applications:** Understanding the importance of safeguarding user privacy in AI applications and implementing data redaction and anonymization techniques to protect sensitive information.

These takeaways provided valuable insights into privacy-aware AI development, teamwork, AI model integration, web development, and effective project management under time pressure.


## Video Demo
[Private GPT Demo](https://www.loom.com/share/573f38e76bb547619c0d1b72da821ffa?sid=734a295a-aa34-4f6f-b7a1-a19540ff9502)

## Contributing
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Contributions are welcome! If you find any issues or have suggestions for improvements, please submit an issue or create a pull request.

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements
- [OpenAI](https://openai.com/) - For providing the AI models and the inspiration for this project.
- [Streamlit](https://streamlit.io/) - For the open-source framework used to build the web application.
- [Vicuna-13B](https://github.com/lm-sys/FastChat/tree/main#api) - An open-source chatbot model trained by fine-tuning LLaMA. It is used to perform data redaction and anonymization. This model is also used as a fallback when the AI models are unable to generate a response. Check out the demo [here](https://chat.lmsys.org/).

## Contact
For questions or inquiries, please contact me at [jitinchekka2 [at] gmail [dot] com](https://github.com/jitinchekka) or [LinkedIn](https://www.linkedin.com/in/jitin-krishna-chekka/).
