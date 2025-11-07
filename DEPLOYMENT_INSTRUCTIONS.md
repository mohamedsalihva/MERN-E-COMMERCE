# Deployment Instructions for MERN E-Commerce Application

## Option 1: Separate Deployment (Recommended)

### Frontend Deployment (React App)

#### Using Vercel (Recommended for React):
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/) and sign up/login
3. Click "New Project" and select your repository
4. Configure the project:
   - Framework Preset: React
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
5. Set Environment Variables:
   - REACT_APP_CLOUD_NAME_CLOUDINARY
   - REACT_APP_STRIPE_PUBLIC_KEY
   - REACT_APP_BACKEND_URL (set to your deployed backend URL)
6. Deploy!

#### Using Netlify:
1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com/) and sign up/login
3. Click "New site from Git" and select your repository
4. Configure the project:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Set Environment Variables in the "Environment" section
6. Deploy!

### Backend Deployment (Node.js/Express API)

#### Using Render (Recommended):
1. Push your code to GitHub
2. Go to [Render](https://render.com/) and sign up/login
3. Click "New+" and select "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - Name: Your app name
   - Region: Choose appropriate region
   - Branch: main/master
   - Root Directory: backend
   - Environment: Node
   - Build command: `npm install`
   - Start command: `npm start`
6. Set Environment Variables:
   - MONGODB_URI
   - FRONTEND_URL (set to your deployed frontend URL)
   - TOKEN_SECRET_KEY
   - STRIPE_SECRET_KEY
   - STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY
7. Create Web Service!

#### Using Railway:
1. Push your code to GitHub
2. Go to [Railway](https://railway.app/) and sign up/login
3. Click "New Project" and select "Deploy from GitHub repo"
4. Select your repository
5. Configure the service:
   - Framework Preset: Node.js
   - Build command: `npm install`
   - Start command: `npm start`
   - Root directory: backend
6. Set Environment Variables in the "Variables" section
7. Deploy!

## Option 2: Deploy as a Single Application

### Using Render:
1. Push your code to GitHub
2. Go to [Render](https://render.com/) and sign up/login
3. Click "New+" and select "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - Name: Your app name
   - Region: Choose appropriate region
   - Branch: main/master
   - Environment: Node
   - Build command: `npm install && cd frontend && npm install && npm run build`
   - Start command: `npm start`
   - Root directory: (leave empty)
6. Set Environment Variables:
   - MONGODB_URI
   - FRONTEND_URL (set to your deployed app URL)
   - TOKEN_SECRET_KEY
   - STRIPE_SECRET_KEY
   - STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY
7. Add a new script to your backend package.json:
   ```json
   "scripts": {
     "start": "node server.js",
     "dev": "nodemon server.js",
     "build": "cd ../frontend && npm install && npm run build"
   }
   ```
8. Modify your server.js to serve static files:
   ```javascript
   const path = require('path');
   
   // Serve static files from the React app
   app.use(express.static(path.join(__dirname, '../frontend/build')));
   
   // Catch all handler: send back React's index.html file for any non-API routes
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
   });
   ```

## Environment Variables Summary

### Frontend (.env):
- REACT_APP_CLOUD_NAME_CLOUDINARY
- REACT_APP_STRIPE_PUBLIC_KEY
- REACT_APP_BACKEND_URL

### Backend (.env):
- MONGODB_URI
- FRONTEND_URL
- PORT
- TOKEN_SECRET_KEY
- STRIPE_SECRET_KEY
- STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY

## Post-Deployment Checklist

1. Ensure your MongoDB database is accessible from your hosting platform
2. Update all environment variables with production values
3. Test all API endpoints
4. Verify that products load correctly on the homepage
5. Test user authentication
6. Test cart functionality
7. Test payment processing
8. Check that all images load properly

## Troubleshooting Tips

1. If products aren't loading:
   - Check browser console for API errors
   - Verify backend URL in frontend environment variables
   - Confirm CORS settings allow your frontend domain

2. If images aren't displaying:
   - Ensure Cloudinary is properly configured
   - Check that image URLs are correctly formed

3. If authentication isn't working:
   - Verify JWT secret key is consistent
   - Check cookie settings and CORS credentials

4. If payment isn't working:
   - Verify Stripe keys are correct
   - Check that webhook endpoints are properly configured