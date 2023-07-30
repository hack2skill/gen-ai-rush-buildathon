FROM python:3.10
# COPY requirements.txt requirements.txt
# RUN pip install -r requirements.txt
RUN pip install flask requests flask_cors slack_bolt
COPY main.py main.py
EXPOSE 3000
CMD ["python", "-u" ,"main.py"]