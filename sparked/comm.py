import json
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
def send_email(args):
    print(args)
    """Send an email to a specified recipient"""
    to_mails = ['akshat.khare08@gmail.com', 'sudhanshuheda98@gmail.com']
    message = Mail(
    from_email='akshat.khare.backup@gmail.com',
    to_emails=to_mails,
    subject=args['subject'],
    html_content=args['body'])
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return json.dumps({
            "to": args['to'],
            "subject": args['subject'],
            "body": args['body'],
            "status": "Email Sent"
        })
    except Exception as e:
        print(e)
        return json.dumps({
            "to": args['to'],
            "subject": args['subject'],
            "body": args['body'],
            "status": "Some error occured"
        })
        # print(e.message)
    