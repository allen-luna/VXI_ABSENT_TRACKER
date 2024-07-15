# FROM python:3.11-slim-buster

# RUN apt-get update && apt-get install -y curl

# WORKDIR /app
# ENV PYTHONUNBUFFERED true

# COPY . .
# RUN pip install -r requirements.txt
# # ENV PYTHONPATH="${PYTHONPATH}:/usr/src/jam"
# EXPOSE 8000
# # ENTRYPOINT ["python", "/usr/src/jam/manage.py"]

# # By default, start the web server when container runs
# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "JAM_AGENT_NOTIFICATION_TRACKER.wsgi:application"]

# Use Python 3.11 slim version based on Debian Buster
FROM python:3.11-slim-buster

# Update and install curl
RUN apt-get update && apt-get install -y curl

# Set environment variables and create working directory
WORKDIR /app
ENV PYTHONUNBUFFERED true

# Copy all files from the current directory to /app/ in the container
COPY . .

# Install Python dependencies
RUN pip install -r requirements.txt

# Expose port 8000 (assuming Django runs on this port)
EXPOSE 8000

# Command to run the application using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "JAM_AGENT_NOTIFICATION_TRACKER.wsgi:application"]
