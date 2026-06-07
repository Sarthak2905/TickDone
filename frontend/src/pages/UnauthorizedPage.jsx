import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="text-6xl mb-6">🔒</div>
        <h1 className="text-4xl font-light text-neutral-900 mb-4">Access Denied</h1>
        <p className="text-neutral-600 mb-8">
          You don't have permission to access this page. Only administrators can view the admin dashboard.
        </p>

        <div className="space-y-3">
          <Link
            to="/"
            className="block px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors duration-200 font-medium"
          >
            Return to Home
          </Link>
          <Link
            to="/login"
            className="block px-6 py-3 border-2 border-neutral-900 text-neutral-900 rounded-lg hover:bg-neutral-50 transition-colors duration-200 font-medium"
          >
            Login
          </Link>
        </div>

        <p className="text-neutral-500 text-sm mt-8">
          If you believe this is an error, please contact support.
        </p>
      </motion.div>
    </div>
  );
};

export default UnauthorizedPage;
