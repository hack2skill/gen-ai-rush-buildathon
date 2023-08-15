import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from matplotlib.backends.backend_pdf import PdfPages


df = pd.read_csv('new.csv')


def get_visualization(Country , Gender):

    australia_female_data = df[(df['Country'] == Country) & (df['Gender'] == Gender)]


    if australia_female_data.empty:
        print(f"No data found for Country: {Country} and Gender: {Gender}")
        return
    
    sns.set(style='whitegrid')
    plt.figure(figsize=(12, 8))

    sns.barplot(x='Age Group', y='Name Breach', data=australia_female_data, color='black', label='Name Breach')
    sns.barplot(x='Age Group', y='Total Records', data=australia_female_data, color='red', alpha=0.8, label='Total Records')

    for index, value in enumerate(australia_female_data['Name Breach']):
        plt.text(index, value, str(value), ha='center', va='bottom', fontweight='bold', fontsize=10, color='black')

    for index, value in enumerate(australia_female_data['Total Records']):
        plt.text(index, value, str(value), ha='center', va='bottom', fontweight='bold', fontsize=10, color='black')

    plt.xlabel('Age Group')
    plt.ylabel('Count')
    plt.title(f'Name Breach vs. Total Records in {Country} for {Gender} by Age Group')
    plt.legend()

    plt.tight_layout()

    return plt



# smtp_server = 'smtp.gmail.com'
# smtp_port = 587
# sender_email = 'eraofphysics007@gmail.com'
# sender_password = 'vaeufurfdoskmhel'
# receiver_email = '500097152@stu.upes.ac.in'


# msg = MIMEMultipart()
# msg['From'] = sender_email
# msg['To'] = receiver_email
# msg['Subject'] = 'Data Breach Report'

# # Attach the PDF file
# with open('report.pdf', 'rb') as f:
#     attach_pdf = MIMEApplication(f.read(), _subtype='pdf')
#     attach_pdf.add_header('Content-Disposition', 'attachment', filename='report.pdf')
#     msg.attach(attach_pdf)

# # Send the email
# try:
#     server = smtplib.SMTP(smtp_server, smtp_port)
#     server.starttls()
#     server.login(sender_email, sender_password)
#     server.sendmail(sender_email, receiver_email, msg.as_string())
#     print('Email sent successfully!')
#     server.quit()
# except Exception as e:
#     print('Error sending email:', str(e))




