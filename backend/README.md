# Portfolio Backend API

A robust Node.js backend API for the Sri Devi Software Solutions portfolio website. Built with Express.js, MongoDB, and modern security practices.

## 🚀 Features

- **RESTful API** with comprehensive endpoints
- **User Authentication** with JWT tokens
- **Contact Form Management** with email notifications
- **Portfolio Project Management** with file uploads
- **Service Management** for company offerings
- **Role-based Access Control** (User, Admin, Super Admin)
- **File Upload** support for images
- **Email Service** integration
- **Security Features** (Helmet, CORS, Rate Limiting)
- **Input Validation** with express-validator
- **Error Handling** middleware
- **Database Models** with Mongoose

## 🛠️ Tech Stack

- **Runtime**: Node.js (ES6+)
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + bcryptjs
- **File Upload**: Multer
- **Email**: Nodemailer
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Morgan

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── middleware/
│   ├── auth.js              # Authentication middleware
│   ├── errorHandler.js      # Error handling middleware
│   ├── notFound.js          # 404 middleware
│   └── upload.js            # File upload middleware
├── models/
│   ├── User.js              # User model
│   ├── Contact.js           # Contact form model
│   ├── Portfolio.js         # Portfolio project model
│   └── Service.js           # Service model
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── contact.js           # Contact form routes
│   ├── portfolio.js         # Portfolio routes
│   └── services.js          # Service routes
├── utils/
│   └── emailService.js      # Email service utilities
├── uploads/                 # File upload directory
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
├── server.js                # Main server file
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
       ```env
    PORT=5000
    NODE_ENV=development
    FRONTEND_URL=http://localhost:5173
    DATABASE_URL="postgresql://portfolio_user:portfolio_password@localhost:5432/portfolio_db"
    JWT_SECRET=your-super-secret-jwt-key-here
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-app-password
    ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/logout` - Logout

### Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/:id` - Get contact by ID (admin)
- `PUT /api/contact/:id` - Update contact (admin)
- `DELETE /api/contact/:id` - Delete contact (admin)
- `GET /api/contact/stats/overview` - Contact statistics (admin)

### Portfolio
- `GET /api/portfolio` - Get all projects
- `GET /api/portfolio/:id` - Get project by ID
- `POST /api/portfolio` - Create project (admin)
- `PUT /api/portfolio/:id` - Update project (admin)
- `DELETE /api/portfolio/:id` - Delete project (admin)
- `GET /api/portfolio/categories/all` - Get categories
- `GET /api/portfolio/featured/all` - Get featured projects

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)
- `GET /api/services/categories/all` - Get categories
- `GET /api/services/featured/all` - Get featured services

### Health Check
- `GET /health` - Server health status
- `GET /` - API information

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles
- **user**: Basic user access
- **admin**: Administrative access
- **superadmin**: Full system access

## 📧 Email Service

The backend includes a comprehensive email service for:
- Contact form notifications
- User registration confirmations
- Password reset requests
- Admin notifications

### Email Configuration
Configure your email service in the `.env` file:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
```

## 📁 File Uploads

The API supports file uploads for:
- Portfolio project images
- Service images
- User avatars

### Upload Limits
- Maximum file size: 5MB
- Supported formats: JPEG, PNG, GIF, WebP, SVG
- Maximum files per upload: 10

## 🛡️ Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API request throttling
- **Input Validation**: Request data validation
- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt encryption
- **SQL Injection Protection**: Mongoose ODM

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📊 Database Models

### User
- Authentication details
- Role-based permissions
- Profile information

### Contact
- Form submissions
- Status tracking
- Spam detection

### Portfolio
- Project details
- Image galleries
- Technology stacks

### Service
- Service offerings
- Features and pricing
- Category management

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode
- `MONGODB_URI`: Database connection string
- `JWT_SECRET`: JWT signing secret
- `FRONTEND_URL`: Frontend application URL
- `EMAIL_*`: Email service configuration

### Database Connection
The backend automatically connects to PostgreSQL via Prisma and handles connection events, reconnections, and graceful shutdowns.

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Configure production PostgreSQL URI
3. Set strong JWT secret
4. Configure email service
5. Set up proper CORS origins

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📝 API Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "pagination": { ... } // if applicable
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": [ ... ] // validation errors
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: hello@srideviitpark.com
- Phone: +91 9943206339

## 🔄 Updates

Stay updated with the latest features and security patches by regularly pulling from the main branch.

---

**Built with ❤️ by Sri Devi Software Solutions**
