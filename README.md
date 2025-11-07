# MERN E-Commerce Application

A full-featured e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User authentication (signup, signin, logout)
- Product management (CRUD operations)
- Shopping cart functionality
- Order processing
- Payment integration with Stripe
- Admin panel for managing products and users
- Product search and filtering
- Responsive design with Tailwind CSS

## Project Structure

```
.
├── backend/           # Node.js/Express backend API
│   ├── controllers/   # Request handlers
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   └── ...
├── frontend/          # React frontend
│   ├── components/    # React components
│   ├── pages/         # Page components
│   └── ...
└── ...
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Cloudinary account (for image hosting)
- Stripe account (for payment processing)

## Local Development Setup

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
4. Set up environment variables (see below)
5. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
6. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

## Environment Variables

### Backend (.env in backend directory)
```
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:3000
PORT=8080
TOKEN_SECRET_KEY=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY=your_webhook_secret
```

### Frontend (.env in frontend directory)
```
REACT_APP_CLOUD_NAME_CLOUDINARY=your_cloudinary_cloud_name
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
REACT_APP_BACKEND_URL=http://localhost:8080
```

## Deployment

For detailed deployment instructions, please refer to [DEPLOYMENT_INSTRUCTIONS.md](DEPLOYMENT_INSTRUCTIONS.md).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help with deployment, please open an issue.