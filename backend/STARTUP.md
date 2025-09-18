# 🚀 Quick Start Guide

## Prerequisites
- Node.js (v18 or higher) installed
- PostgreSQL running locally or cloud instance
- Git (optional)

## ⚡ Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp env.example .env

# Edit .env file with your settings
# At minimum, set:
# - MONGODB_URI (your MongoDB connection string)
# - JWT_SECRET (any random string for security)
```

### 3. Database Setup
```bash
# Run setup script to create admin user and sample data
npm run setup
```

### 4. Start Server
```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

## 🎯 What You Get

✅ **Admin User Created**
- Email: `admin@srideviitpark.com`
- Password: `admin123456`
- Role: `superadmin`

✅ **Sample Data**
- Sample portfolio project
- Sample services
- Ready to test API endpoints

✅ **API Running**
- Server: `http://localhost:5000`
- Health Check: `http://localhost:5000/health`
- API Base: `http://localhost:5000/api`

## 🔧 Configuration Options

### PostgreSQL
- **Local**: `postgresql://username:password@localhost:5432/portfolio_db`
- **Cloud**: `postgresql://username:password@your-postgres-host:5432/portfolio_db`

### Email Service (Optional)
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Security
```env
JWT_SECRET=your-super-secret-key-here
FRONTEND_URL=http://localhost:5173
```

## 🧪 Test Your Setup

### 1. Health Check
```bash
curl http://localhost:5000/health
```

### 2. Login as Admin
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@srideviitpark.com","password":"admin123456"}'
```

### 3. Get Portfolio Projects
```bash
curl http://localhost:5000/api/portfolio
```

## 🚨 Common Issues

### Port Already in Use
```bash
# Change port in .env file
PORT=5001
```

### PostgreSQL Connection Failed
- Check if PostgreSQL is running
- Verify connection string in .env
- Check network/firewall settings

### Email Service Not Working
- Email service is optional
- Backend will work without email configuration
- Check Gmail app password settings

## 📱 Frontend Integration

Your React frontend can now connect to the backend:

```javascript
// Example API call
const response = await fetch('http://localhost:5000/api/portfolio');
const data = await response.json();
```

## 🔒 Security Notes

1. **Change default admin password** after first login
2. **Set strong JWT_SECRET** in production
3. **Configure proper CORS origins** for production
4. **Use HTTPS** in production

## 📚 Next Steps

1. **Explore API endpoints** using the README.md
2. **Test all CRUD operations** for portfolio and services
3. **Integrate with your React frontend**
4. **Customize models and routes** as needed
5. **Deploy to production** when ready

---

**Need help?** Check the main README.md for detailed documentation!
