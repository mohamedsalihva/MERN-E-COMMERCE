# MERN E-Commerce Backend

This is the backend API for a MERN stack e-commerce application.

## Deployment Instructions

For detailed deployment instructions, please refer to the [DEPLOYMENT_INSTRUCTIONS.md](../DEPLOYMENT_INSTRUCTIONS.md) file in the root directory.

## Quick Deployment Options

### Render (Recommended for Backend)
1. Push to GitHub
2. Connect Render to your repository
3. Set root directory to `backend`
4. Set build command to `npm install`
5. Set start command to `npm start`
6. Set environment variables:
   - MONGODB_URI
   - FRONTEND_URL
   - TOKEN_SECRET_KEY
   - STRIPE_SECRET_KEY
   - STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY

### Railway
1. Push to GitHub
2. Connect Railway to your repository
3. Set environment variables in the Railway dashboard

## Environment Variables
- MONGODB_URI
- FRONTEND_URL
- PORT
- TOKEN_SECRET_KEY
- STRIPE_SECRET_KEY
- STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY

## Available Scripts

### `npm start`
Starts the production server.

### `npm run dev`
Starts the development server with nodemon.

### `npm run build`
Builds the frontend application (when deploying as a single application).

## API Endpoints

All API endpoints are prefixed with `/api`:

- `/api/signup` - User registration
- `/api/signin` - User login
- `/api/user-details` - Get current user details
- `/api/get-product` - Get all products
- `/api/product-details/:id` - Get product details
- And many more...

For a complete list of endpoints, please check the routes files in the `routes` directory.