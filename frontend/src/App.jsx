import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/globals.css';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/Common/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import UnauthorizedPage from './pages/UnauthorizedPage';

// Placeholder pages
const HomePage = () => (
  <div className="min-h-screen bg-white">
    <div className="container mx-auto max-w-6xl px-4 py-16 text-center">
      <h1 className="text-4xl font-light text-neutral-900 mb-4">
        Architecture Firm Management Platform
      </h1>
      <p className="text-neutral-600 mt-4 mb-8">Welcome to TickDone</p>
      <div className="flex gap-4 justify-center">
        <a href="/login" className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition">
          Login
        </a>
        <a href="/signup" className="px-6 py-3 border-2 border-neutral-900 text-neutral-900 rounded-lg hover:bg-neutral-50 transition">
          Sign Up
        </a>
      </div>
    </div>
  </div>
);

const PortfolioPage = () => (
  <div className="min-h-screen bg-white">
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-light text-neutral-900">Portfolio</h1>
    </div>
  </div>
);

const BlogPage = () => (
  <div className="min-h-screen bg-white">
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-light text-neutral-900">Blog</h1>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirect /admin to /admin/dashboard */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
