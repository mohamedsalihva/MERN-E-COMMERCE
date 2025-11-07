#!/bin/bash

# Deployment helper script for MERN E-Commerce Application

echo "Preparing application for deployment..."

# Check if we're in the right directory
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
  echo "Error: Please run this script from the root directory containing frontend and backend folders"
  exit 1
fi

echo "1. Building frontend..."
cd frontend
npm run build

if [ $? -ne 0 ]; then
  echo "Error: Frontend build failed"
  exit 1
fi

echo "Frontend build completed successfully!"

echo "2. Preparing backend..."
cd ../backend

echo "Installing backend dependencies..."
npm install

if [ $? -ne 0 ]; then
  echo "Error: Backend dependency installation failed"
  exit 1
fi

echo "Backend preparation completed!"

echo "3. Creating deployment package..."
cd ..
mkdir -p deployment
cp -r backend/* deployment/
cp -r frontend/build deployment/public

echo "Deployment package created in 'deployment' folder"

echo ""
echo "Next steps:"
echo "1. Update environment variables in deployment/.env"
echo "2. Deploy the contents of the 'deployment' folder to your hosting provider"
echo "3. Make sure to set up MongoDB and other services as needed"
echo ""
echo "Deployment preparation completed successfully!"