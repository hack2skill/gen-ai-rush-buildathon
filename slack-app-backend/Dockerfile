# Use an official Python runtime as a base image
FROM python:3.8

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install the required dependencies for the Flask app
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port that the Flask app will listen on
EXPOSE 5000

# Define the command to run your Flask app when the container starts
CMD ["python", "app.py"]
