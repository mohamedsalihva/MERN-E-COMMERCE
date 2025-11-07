# MERN E-Commerce Frontend

This is the frontend for a MERN stack e-commerce application.

## Deployment Instructions

For detailed deployment instructions, please refer to the [DEPLOYMENT_INSTRUCTIONS.md](../DEPLOYMENT_INSTRUCTIONS.md) file in the root directory.

## Quick Deployment Options

### Vercel (Recommended for Frontend)
1. Push to GitHub
2. Connect Vercel to your repository
3. Set environment variables:
   - REACT_APP_CLOUD_NAME_CLOUDINARY
   - REACT_APP_STRIPE_PUBLIC_KEY
   - REACT_APP_BACKEND_URL

### Netlify
1. Push to GitHub
2. Connect Netlify to your repository
3. Set build command to `npm run build`
4. Set publish directory to `build`
5. Set environment variables in the Netlify dashboard

## Environment Variables
- REACT_APP_CLOUD_NAME_CLOUDINARY
- REACT_APP_STRIPE_PUBLIC_KEY
- REACT_APP_BACKEND_URL

## Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the app in the development mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner in the interactive watch mode.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**