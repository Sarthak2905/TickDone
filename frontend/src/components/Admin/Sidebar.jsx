import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { label: 'Projects', path: '/admin/projects', icon: '🏗️' },
    { label: 'Inquiries', path: '/admin/inquiries', icon: '📬' },
    { label: 'Appointments', path: '/admin/appointments', icon: '📅' },
    { label: 'Blog', path: '/admin/blog', icon: '📝' },
    { label: 'Services', path: '/admin/services', icon: '🛠️' },
    { label: 'Analytics', path: '/admin/analytics', icon: '📈' },
    { label: 'Testimonials', path: '/admin/testimonials', icon: '⭐' },
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onToggle}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
        className="fixed md:static left-0 top-0 w-64 h-screen bg-neutral-900 text-white overflow-y-auto z-50 md:z-0 flex flex-col"
      >
        {/* Logo / Header */}
        <div className="p-6 border-b border-neutral-800">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-light tracking-wide">TickDone</h1>
            <button
              onClick={onToggle}
              className="md:hidden text-neutral-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <p className="text-neutral-500 text-sm mt-1">Admin Panel</p>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-neutral-800">
          <p className="text-neutral-400 text-xs uppercase tracking-wide mb-1">Logged in as</p>
          <p className="font-medium text-white">{user?.name}</p>
          <p className="text-neutral-500 text-sm mt-1">{user?.email}</p>
          <span className="inline-block mt-2 px-2 py-1 bg-neutral-800 text-neutral-300 text-xs rounded">
            {user?.role === 'admin' ? '👑 Admin' : '👤 User'}
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <p className="text-neutral-500 text-xs uppercase tracking-wide px-2 mb-4 font-medium">
            Main Menu
          </p>
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => onToggle && onToggle()}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-white text-neutral-900 font-medium'
                    : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-800">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            🚪 Logout
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
