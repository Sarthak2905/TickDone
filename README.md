# Architecture Firm Management Platform

A comprehensive full-stack web application for managing architecture firm operations, including project portfolios, client inquiries, appointments, and blog content.

## 🏗️ Project Structure

```
/
├── frontend/                 # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   ├── context/         # React context for state management
│   │   ├── assets/          # Images and static files
│   │   ├── styles/          # Global styles (Tailwind)
│   │   └── App.jsx          # Main application component
│   └── package.json
│
├── backend/                 # Express + MongoDB
│   ├── src/
│   │   ├── models/          # Database schemas
│   │   ├── routes/          # API routes
│   │   ├── controllers/      # Route handlers
│   │   ├── middleware/       # Custom middleware
│   │   ├── utils/           # Utility functions
│   │   └── server.js        # Express server setup
│   └── package.json
│
├── .gitignore              # Git ignore rules
├── package.json            # Root package with monorepo scripts
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (for local development)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd TickDone
```

2. **Install all dependencies**
```bash
npm run install-all
```

This will install dependencies for both frontend and backend.

### Development

**Run both frontend and backend simultaneously:**
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173 (Vite development server)
- Backend: http://localhost:5000 (Express server)

**Run frontend only:**
```bash
npm run dev:frontend
```

**Run backend only:**
```bash
npm run dev:backend
```

### Building for Production

```bash
npm run build
```

This will build both frontend and backend for production.

### Starting Production Build

```bash
npm start
```

## 🔧 Environment Variables

### Frontend (.env)
Create `frontend/.env.local`:
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Architecture Firm Management
```

### Backend (.env)
Create `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/architecture-firm
JWT_SECRET=your_jwt_secret_here_change_in_production
PORT=5000
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## 📦 Frontend Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Recharts** - Data visualization
- **Axios** - HTTP client

## 🛠️ Backend Stack

- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Validator** - Data validation

## 📚 API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Inquiries
- `GET /api/inquiries` - Get all inquiries
- `POST /api/inquiries` - Create inquiry
- `PUT /api/inquiries/:id` - Update inquiry status

### Appointments
- `GET /api/appointments` - Get appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Blog
- `GET /api/blog` - Get all posts
- `GET /api/blog/:id` - Get single post
- `POST /api/blog` - Create post
- `PUT /api/blog/:id` - Update post
- `DELETE /api/blog/:id` - Delete post

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service

### Testimonials
- `GET /api/testimonials` - Get all testimonials

### Analytics
- `GET /api/analytics` - Get platform analytics

### Estimator
- `POST /api/estimator/calculate` - Calculate project estimate

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS protection
- Security headers with Helmet
- Input validation
- Environment variable management

## 📝 Development Guidelines

### Frontend
- Use functional components with hooks
- Implement proper error boundaries
- Use context API for global state
- Follow Tailwind CSS conventions
- Create reusable components in `/components`

### Backend
- Follow REST API conventions
- Implement proper error handling
- Use middleware for cross-cutting concerns
- Validate all inputs
- Document API endpoints

## 🐛 Troubleshooting

### Port already in use
- Change port in `.env` file for backend
- For frontend, Vite will automatically use next available port

### MongoDB connection issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify MongoDB credentials

### Module not found errors
- Run `npm run install-all` to ensure all dependencies are installed
- Clear `node_modules` and reinstall if needed

## 📄 License

MIT License - see LICENSE file for details

## 👥 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

---

**Happy coding! 🎉**