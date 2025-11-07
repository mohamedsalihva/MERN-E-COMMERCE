@echo off
REM Deployment helper script for MERN E-Commerce Application on Windows

echo Preparing application for deployment...

REM Check if we're in the right directory
if not exist "frontend" (
  echo Error: Please run this script from the root directory containing frontend and backend folders
  pause
  exit /b 1
)

if not exist "backend" (
  echo Error: Please run this script from the root directory containing frontend and backend folders
  pause
  exit /b 1
)

echo 1. Building frontend...
cd frontend
npm run build

if %errorlevel% neq 0 (
  echo Error: Frontend build failed
  pause
  exit /b 1
)

echo Frontend build completed successfully!

echo 2. Preparing backend...
cd ../backend

echo Installing backend dependencies...
npm install

if %errorlevel% neq 0 (
  echo Error: Backend dependency installation failed
  pause
  exit /b 1
)

echo Backend preparation completed!

echo 3. Creating deployment package...
cd ..
mkdir deployment
xcopy backend\* deployment\ /E /I /Y
xcopy frontend\build deployment\public\ /E /I /Y

echo Deployment package created in 'deployment' folder

echo.
echo Next steps:
echo 1. Update environment variables in deployment\.env
echo 2. Deploy the contents of the 'deployment' folder to your hosting provider
echo 3. Make sure to set up MongoDB and other services as needed
echo.
echo Deployment preparation completed successfully!

pause