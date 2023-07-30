# Gen-Ai-Rush-Buildathon

## Submission Instruction:
  1. Fork this repository
  2. Create a folder with your Team Name
  3. Upload all the code and necessary files in the created folder
  4. Upload a **README.md** file in your folder with the below mentioned informations.
  5. Generate a Pull Request with your Team Name. (Example: submission-XYZ_team)

## README.md must consist of the following information:

#### Team Name - GenAI-Ninjas
#### Problem Statement - Organizations face significant challenges in ensuring data compliance and protection, including the complexity of regulations, cross-border data transfers, and the risk of data breaches. There is a need for an advanced AI-driven solution that streamlines compliance processes, enhances data protection, and provides actionable insights to mitigate risks and ensure regulatory adherence across Industries.
#### Team Leader Email - lalith.vlk@gmail.com

## A Brief of the Prototype:
  User_Flow Diagrams , Tech Stack , Demo Video:
  https://drive.google.com/drive/folders/1CHrxZy5DmxPt9kJs14eQW8hwUBqg_vJ8?usp=sharing
   
## Step-by-Step Code Execution Instructions:
  1) Navigate to the GDPR folder , and run the 'ai.py' file.
  2) The chatbot is fine-tuned using curie engine of gpt-3.5 and is prompted to answer specific set of questions
  3) write the "Get me the data breaches for" + "Any country in the list [India , Australia , UK , France , Germany , Brazil, China , USA]"
     This shall give a json output which indicates the number of breaches according to 'Name' , 'Email', 'Financial-Information' etc, related       to the first , second and third Rules of the GDPR rule set
  4) Secondly , the prompt "Can you show me the Account number breach VS Total records for" + [Country_Name] + [Gender]
     This shall generate a plot depecting the same
  5) HexaDCP also provides the functionality to send the report by gmail using the prompt "Send me the report on my Email" + [Your_Email_Add]
     Which shall send the report to the given mail.
  6) Furthermore, the bot uses FLOW.AI which provides additional insights to the CSV. Hence by running the prompt "How many Email Breaches of Age Group 18-30 for" + [Country-Name] shall answer the same.
  7) The Model is condfigured with XGBOOST which assigns an input vector say 'v' an label , indicating the types of lables broken by the USER. this can be found at the file "final-output.csv"
8) Two databases namely , 'MongoDB' and 'AWS Dynamo Db' is used to store the json file called as 'customer-details.json' in mongodb compass and 'total_records_by_country.csv' in the key-value pairs in Dynamo-DB
  
## What I Learned:
  While developing the prototype of HEXA DCP BOT during the 24-hour Hackathon, one of the most significant learnings was the power of collaboration and efficient time management. Within a limited timeframe, our team had to tackle complex challenges and bring together various technologies (Python, TensorFlow, XGBoost, Matplotlib, MERN Stack, Flowise.ai) to create a comprehensive data compliance and protection solution.

We learned to leverage each team member's strengths, divide tasks strategically, and communicate effectively to ensure a streamlined development process. This experience taught us the importance of setting clear goals, prioritizing critical features, and making agile decisions to optimize our limited time effectively.

Moreover, the Hackathon pushed us to think creatively and innovatively to address real-world data compliance challenges. Integrating AI and ML technologies into the prototype not only enhanced its capabilities but also provided valuable insights into how AI can revolutionize data protection strategies.

The fast-paced environment of the Hackathon taught us to adapt swiftly to unexpected hurdles and pivot our approach when needed. In the end, we were proud of what our team accomplished within the 24-hour timeframe. The experience not only strengthened our technical skills but also fostered collaboration, creativity, and problem-solving abilities. We learned that with the right mindset, teamwork, and determination, we could deliver a powerful and promising product that addresses critical data compliance challenges and protects the privacy of organizations and individuals alike.
