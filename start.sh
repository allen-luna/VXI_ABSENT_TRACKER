#!/bin/bash

# Function to start the Django server
start_django() {
  echo "Starting Django server..."
  cd JAM_AGENT_NOTIFICATION_TRACKER  
  python manage.py runserver  
}

start_react() {
  echo "Starting React application..."
  cd frontend  
  npm run dev 
}

start_django & start_react &


wait
