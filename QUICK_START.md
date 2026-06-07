# Quick Start Guide - Phase 2 Authentication & Admin System

## Prerequisites
- Node.js 18+ installed
- MongoDB running locally (mongodb://localhost:27017)
- npm installed

## Installation & Setup

### 1. Backend Setup
```bash
cd backend
npm install  # Already done
```

### 2. Frontend Setup
```bash
cd frontend
npm install  # Already done
```

## Environment Configuration

### Backend (.env)
Already created at `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/architecture-firm
JWT_SECRET=your_jwt_secret_key_change_in_production_2024
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)
Already created at `frontend/.env.local`:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Running the Application

### Terminal 1: Start MongoDB
```bash
# If using Docker
docker run -d -p 27017:27017 --name mongodb mongo

# OR if MongoDB is installed locally
mongod --dbpath ~/mongodb-data  # Adjust path as needed
```

### Terminal 2: Start Backend Server
```bash
cd backend
npm run dev
# Server will run on http://localhost:5000
```

### Terminal 3: Start Frontend Dev Server
```bash
cd frontend
npm run dev
# Frontend will run on http://localhost:5173 (or another port)
```

## Testing the Application

### 1. Register First Account
- Visit http://localhost:5173/signup
- Fill in name, email, password, confirm password
- Submit form
- **First user automatically becomes ADMIN** ✨
- Redirected to admin dashboard

### 2. Login
- Visit http://localhost:5173/login
- Enter email and password
- Click "Sign In"
- Should redirect to admin dashboard

### 3. Admin Dashboard
- View dashboard with stats
- Click sidebar navigation links
- User info shown in sidebar
- Click logout button (redirects to login)

### 4. Register Second Account (Non-Admin)
- Logout first
- Register new account with different email
- Second user will have "user" role (not admin)
- Try to access /admin/dashboard
- Should redirect to /unauthorized page

### 5. API Endpoints Testing
```bash
# Register
POST /api/auth/register
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

# Login
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

# Get Current User (Protected)
GET /api/auth/me
Authorization: ******* <access_token>

# Refresh Token
POST /api/auth/refresh-token
{
  "refreshToken": "<refresh_token>"
}

# Logout (Protected)
POST /api/auth/logout
Authorization: ******* <access_token>
```

## Files Created/Modified

### Backend
- ✅ `src/models/User.js` - User schema with password hashing
- ✅ `src/controllers/authController.js` - Auth endpoints
- ✅ `src/middleware/auth.js` - JWT verification middleware
- ✅ `src/routes/auth.js` - Auth routes
- ✅ `src/utils/validation.js` - Input validation
- ✅ `src/server.js` - Updated with MongoDB and auth routes
- ✅ `.env` - Environment configuration

### Frontend
- ✅ `src/context/AuthContext.jsx` - Auth state management
- ✅ `src/components/Common/ProtectedRoute.jsx` - Route protection
- ✅ `src/pages/LoginPage.jsx` - Login form
- ✅ `src/pages/SignupPage.jsx` - Registration form
- ✅ `src/pages/AdminDashboard.jsx` - Admin dashboard
- ✅ `src/components/Admin/Sidebar.jsx` - Sidebar navigation
- ✅ `src/pages/UnauthorizedPage.jsx` - 403 page
- ✅ `src/utils/api.js` - Axios API client
- ✅ `src/App.jsx` - Updated routing
- ✅ `.env.local` - Environment configuration

## Key Features

✅ **JWT Authentication** - Access (1h) + Refresh (7d) tokens
✅ **Password Security** - Hashed with bcryptjs (10 rounds)
✅ **Role-Based Access** - Admin vs User roles
✅ **Auto Token Refresh** - Handles expired access tokens
✅ **Input Validation** - Email format, password strength
✅ **Responsive Design** - Mobile-first with Tailwind
✅ **Premium UI** - Framer Motion animations
✅ **Error Handling** - User-friendly error messages
✅ **Protected Routes** - Admin dashboard requires admin role

## Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Default: `mongodb://localhost:27017/architecture-firm`

### CORS Errors
- Check backend CORS configuration
- Ensure frontend URL is allowed
- Default allows http://localhost:*

### Token Errors
- Clear localStorage and login again
- Check JWT_SECRET in `.env`
- Verify token format in Authorization header

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Vite will auto-select different port

## Production Deployment Notes

1. **Change JWT_SECRET** - Use strong random value
2. **Use httpOnly Cookies** - Store tokens securely
3. **Enable HTTPS** - Required for production
4. **Add Rate Limiting** - Prevent brute force attacks
5. **Setup MongoDB Atlas** - Cloud database
6. **Enable Input Sanitization** - Prevent injection attacks
7. **Add Email Verification** - For registration
8. **Setup Admin Dashboard Features** - Projects, blog, etc.

## Next Steps

1. Create project management endpoints
2. Add blog post management
3. Implement inquiry/appointment handling
4. Add file upload for projects
5. Setup email notifications
6. Create analytics dashboard
7. Add user management interface

---

For detailed implementation info, see `PHASE2_IMPLEMENTATION.md`
