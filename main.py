from flask import Flask,render_template,request,redirect,url_for
import random
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from email.mime.text import MIMEText
import smtplib,ssl
import numpy as np
import mysql.connector
import joblib
import os
from threedgen import model3d_generator

app=Flask(__name__)

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="genai"
)
mycursor = mydb.cursor()
#function used to send confirmation mail to the user
def mail_send(otp,mail):
    try:
        s = smtplib.SMTP('smtp.office365.com', 587)
    except Exception as e:
        s = smtplib.SMTP_SSL('smtp.office365.com', 465)
    s.ehlo()
    s.starttls()
    s.login("harikrishna.20it@sonatech.ac.in", "Rhk$14082002")
        
    msg = MIMEMultipart()
    msg['From']='harikrishna.20it@sonatech.ac.in'
    msg['To']=mail
    msg['Subject']="Registration Confirmation"

    html=f'''\
        <!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
        body, table, td, a { "-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" }

        table, td {" mso-table-lspace: 0pt; mso-table-rspace: 0pt;" }

        img { "-ms-interpolation-mode: bicubic;"  }
        img { " border: 0; height: auto; line-height: 100%;  outline: none; text-decoration: none; " }
        table { " border-collapse: collapse !important; " }
        body { " height: 100% !important; margin: 0 !important; padding: 0 !important; background: #e6f4ff; " }
        a[x-apple-data-detectors] { " color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; " }
        div[style*="margin: 16px 0;"] { "margin: 0 !important; " }
        .page-center { " display: flex; justify-content: center; align-items: center; height: 100vh; " }
        .container { " max-width: 600px; background-color: #ffffff; border-radius: 4px; padding: 20px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);  " }
        .header { " text-align: center; margin-bottom: 20px; " }
        .header h1 { " font-size: 36px; font-weight: 600; color: #0080ff; letter-spacing: 2px; margin: 20px 0;  " }
        .logo { " display: block; margin: 0 auto; border: 0px; width: 125px; height: 120px; border-radius: 50%; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);         " }
        .content { " color: #333333; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 1.6; text-align: center; " }
        .content strong { " font-weight: 600; color: #0080ff; " }
        .footer { " padding-top: 30px; border-top: 1px solid #f5f5f5; text-align: center; " }
        .footer p { "margin: 0; color: #666666; font-size: 16px;" }
    </style>
</head>
<body>
    <!-- HIDDEN PREHEADER TEXT -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Your Gateway to 3D Text Magic!
    </div>
    <div class="page-center">
        <div class="container">
            <!-- LOGO -->
            <div class="header">
                <h1>Welcome to vizAI</h1>
                <img class="logo" src="https://i.ibb.co/G0t2czh/logo.jpg" alt="Logo" />
            </div>
            <div class="content">
                <h3><strong>Your Gateway to 3D Text Magic!</strong></h3>
                <p>Transform your ordinary text into extraordinary 3D visuals with vizAI! Our cutting-edge plugin opens up a whole new dimension,bringing your words to life and captivating your audience like never before. With mesmerizing 3D images that pop off the screen, ignite their imagination and create an immersive experience that leaves a lasting impression. Discover the power of vizAI and revolutionize the way you communicate with your audience.</p>
                <p>Get ready to create captivating visual content with ease!</p>
            </div>
            <div class="footer">
                <p>Thanks!<br>The vizAI Team</p>
            </div>
        </div>
    </div>
</body>
</html>
        
        '''
    msg.attach(MIMEText(html, 'html'))
    
    s.send_message(msg)
    return "Success"

def otp_gen():
    digit="0123456789"
    password=""
    i=0
    for i in range(6):
        password=password+random.choice(digit)
        i+1
    file1 = open("myfile.txt","w")
    file1.write(password)
    file1.close()
    return password
#function used to generate 2d image from prompt
def image_generator(description_1,counter):
    model = joblib.load('filename.pkl')
    autocast_model = joblib.load('torchpkl.pkl')
    with autocast_model("cuda"):
        image_1 = model(description_1).images[0]
    image1 = image_1.save('./static/image'+str(counter)+'.jpg')
    
#function used rendering login page
@app.route('/',methods=["POST","GET"])
def login():
    if(request.method=="POST"):
        username=request.form.get('email')
        password=request.form.get('password')
        query = "SELECT * FROM user_table WHERE username = %s AND password = %s"
        values = (username,password)
        mycursor.execute(query, values)
        result = mycursor.fetchone()
        if result:
            return redirect(url_for('home'))
        else:
            return render_template("Login.html")
        return render_template("Home.html")
    if(request.method=="GET"):
        return render_template("Login.html")
#function used for rendering signup page
@app.route('/signup',methods=["POST","GET"])
def register():
    if(request.method=="POST"):
        username=request.form.get('email')
        password=request.form.get('password')
        opt=str(otp_gen())
        msg=mail_send(opt,username)
        query = "INSERT INTO user_table (username, password) VALUES (%s, %s)"
        values = (username, password)
        mycursor.execute(query, values)
        mydb.commit()
        return redirect('/')
    if(request.method=="GET"):
        return render_template("Register.html")
#function used to render Text to 3d page
@app.route('/text_to_3d',methods=["POST","GET"])
def text_to_3d():
    if(request.method=="GET"):
        return render_template('TextTo3d.html')
    if(request.method == "POST"):
        prompt=request.form.get('prompt')
        i=0
        for i in range(0,4):
            image_generator(prompt,i)
        return redirect(url_for ('text_to_3d_preview'))
#function used to render AR view of model
@app.route('/ar_view',methods=["POST","GET"])
def ar_view():
    if(request.method=="GET"):
        return render_template('AR.html')
#function used to get list of images generated
def get_image_filenames():
    static_path = os.path.join(app.root_path, 'static/')
    image_files = [f for f in os.listdir(static_path) if os.path.isfile(os.path.join(static_path, f))]
    image_list = []
    for filename in image_files:
        full_path = os.path.join(static_path, filename)
        image_list.append({'filename': filename, 'path': full_path})
    return image_files
#function used to preview the model generated
@app.route('/text_to_3d_preview',methods=["POST","GET"])
def text_to_3d_preview():
    if(request.method=="GET"):
        image_files = get_image_filenames()
        return render_template('Preview2d.html',image_files=image_files)


#function used to prompt for 3d model
@app.route('/text_to_33d',methods=["POST","GET"])
def text_to_33d():
    if(request.method=="GET"):
        return render_template('TextTo33d.html')
    if(request.method == "POST"):
        prompt=request.form.get('prompt')
        model3d_generator(prompt)
        return redirect(url_for ('text_to_33d_preview'))
#function used to preview 3d model
@app.route('/text_to_33d_preview',methods=["POST","GET"])
def text_to_33d_preview():
    if(request.method=="GET"):
        return render_template('Preview3d.html')
#function used to render about page
@app.route('/home',methods=["POST","GET"])
def home():
    if(request.method=="GET"):
        return render_template('Home.html')
    if(request.method == "POST"):
        return redirect(url_for('Home.html'))

    
if __name__=='__main__':
    app.run(port=5000,debug=True)