from twilio.rest import Client

def sendMSG(msg, ph_no) :
    account_sid = "ACb8b05c3a3b447064a4dc6179xxxxxxx"
    auth_token = "7729c783fd989ba8e62c04bacxxxxxxx"
    client = Client(account_sid, auth_token)
    message = client.messages.create(
      body=msg,
      from_="+12707704034",
      to=ph_no
    )
    return (message.sid)
