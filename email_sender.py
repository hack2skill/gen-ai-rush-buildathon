import smtplib
import ssl
from email.message import EmailMessage


class Mail:

    def __init__(self):
        self.port = 465
        self.smtp_server_domain_name = "smtp.gmail.com"
        self.sender_mail = "L309.satsang@gmail.com"
        self.password = "hkllingmdhcmvtef"

    def send(self, emails, subject, content, attachment_path):
        ssl_context = ssl.create_default_context()
        service = smtplib.SMTP_SSL(self.smtp_server_domain_name, self.port, context=ssl_context)
        service.login(self.sender_mail, self.password)

        # Create the email message
        msg = EmailMessage()
        msg["From"] = self.sender_mail
        msg["To"] = ", ".join(emails)
        msg["Subject"] = subject
        msg.set_content(content)

        # Attach the report file
        with open(attachment_path, "rb") as file:
            msg.add_attachment(file.read(), maintype="application", subtype="pdf", filename=attachment_path)

        # Send the email
        service.send_message(msg)

        service.quit()


# if __name__ == '__main__':
    
#     subject = "Data Breach Report"
#     content = "Please find the attached data breach report."
#     attachment_path = "report.pdf"  # Replace with the path to your report file

#     mail = Mail()
#     mail.send(mails, subject, content, attachment_path)
