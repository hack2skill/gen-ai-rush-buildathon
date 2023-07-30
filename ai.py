import subprocess
import fetch_country as file2
from email_sender import Mail   
import flowai as file3
import Name_Breach_plot as file4

def get_graph_visualization(country_n,gender_n):

    command = ['python', 'Name_Breach_plot.py']

    try:
        if country_n and gender_n:
            command.append(country_n)
            command.append(" ")
            command.append(gender_n)

        result = subprocess.check_output(command, text=True).strip()
        return result
    
    except subprocess.CalledProcessError as e:
        return f"Error executing the script: {e}"
    

def get_more_insights(Country):

    command = ['python', 'flowai.py']

    try:
        if Country:
            command.append(Country)

        result = subprocess.check_output(command, text=True).strip()
        return result

    except subprocess.CalledProcessError as e:
        return f"Error executing the script: {e}"
    

def send_email(email_name):

    command = ['python', 'email_sender.py']

    try:
        if email_name:
            command.append(email_name)

        result = subprocess.check_output(command, text=True).strip()
        return result

    except subprocess.CalledProcessError as e:
        return f"Error executing the script: {e}"


def get_data_breaches_in_EU(country=None):
    command = ['python', 'fetch_country.py']

    try:
        if country:
            command.append(country)

        result = subprocess.check_output(command, text=True).strip()
        return result
    except subprocess.CalledProcessError as e:
        return f"Error executing the script: {e}"
    except Exception as e:
        return str(e)

def main():
    print("HexaDCP: Hello! I am HexaDCP. How can I help you today?")
    while True:
        user_input = input("You: ")
        if user_input.lower() in ['exit', 'quit', 'bye']:
            print("HexaDCP: Goodbye!")
            break
        elif "Get me the data breaches for" in user_input:
          
            country_name = user_input.replace("Get me the data breaches for", "").strip()
            response = get_data_breaches_in_EU(country=country_name)
            print("Result:", response)

            file2.fetch_records_by_country(country_name)

        elif "Can you show me the Account number breach VS Total records for" in user_input:

            input_text = "Can you show me the Account number breach VS Total records for"
            input_data = user_input.replace(input_text, "").strip()


            words = input_data.split()

            country_n = ""
            gender_n = ""
            for word in words:
                if word.lower() in ['male', 'female']:
                    gender_n = word.lower()
                else:
                    country_n += word + " "

            country_n = country_n.strip()  

            response = get_graph_visualization(country_n, gender_n)
            print("Result:", response)
            plot = file4.get_visualization(country_n, gender_n)

            plot.show()

            plot.close()


        elif "Send me the report on my Email" in user_input:

            email_name = user_input.replace("Send me the report on my Email", "").strip()
            response = send_email(email_name)
            print("Result:", response)  
        
            mail_sender = Mail()
            subject = "Data Breach Report"
            content = "Please find the attached data breach report."
            attachment_path = "report.pdf"  
            mail_sender.send([email_name], subject, content, attachment_path)

            print("Email sent successfully!")

        
        elif "How many Email Breaches of Age Group 18-30 for" in user_input:
            
            country_breach_name = user_input.replace("How many Email Breaches of Age Group 18-30 for", "").strip()
            response = get_more_insights(country_breach_name)
            print("Result:", end='\n')

            file3.get_output(country_breach_name)

        else:
            print("Invalid command.")

if __name__ == "__main__":
    main()
