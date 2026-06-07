import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../../components/Admin/Sidebar';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: 'Total Projects', value: '24', icon: '🏗️', color: 'bg-blue-50' },
    { label: 'Active Inquiries', value: '12', icon: '📬', color: 'bg-green-50' },
    { label: 'Appointments', value: '8', icon: '📅', color: 'bg-purple-50' },
    { label: 'Blog Posts', value: '34', icon: '📝', color: 'bg-orange-50' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="flex h-screen bg-neutral-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 md:px-8 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-neutral-100 rounded-lg"
            >
              ☰
            </button>
            <h2 className="text-xl font-light text-neutral-900">Dashboard</h2>
            <div className="text-sm text-neutral-600">
              Welcome, <span className="font-medium">{user?.name}</span>!
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-light text-neutral-900 mb-2">
              Welcome to Admin Dashboard
            </h1>
            <p className="text-neutral-600">
              Manage your architecture firm's projects, inquiries, and content all in one place.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${stat.color} rounded-xl p-6 border border-neutral-200 hover:border-neutral-300 transition-all duration-200`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{stat.icon}</span>
                  <span className="text-xs text-neutral-500">Last 30 days</span>
                </div>
                <p className="text-neutral-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-light text-neutral-900">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Overview Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Projects */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 border border-neutral-200"
            >
              <h3 className="text-lg font-medium text-neutral-900 mb-4">Recent Projects</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start justify-between pb-4 border-b border-neutral-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-neutral-900">Project {i}</p>
                      <p className="text-sm text-neutral-500">In Progress</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Inquiries */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 border border-neutral-200"
            >
              <h3 className="text-lg font-medium text-neutral-900 mb-4">Recent Inquiries</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start justify-between pb-4 border-b border-neutral-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-neutral-900">Client {i} Inquiry</p>
                      <p className="text-sm text-neutral-500">2 days ago</p>
                    </div>
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                      New
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="mt-6 bg-white rounded-xl p-6 border border-neutral-200"
          >
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="px-4 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors duration-200 font-medium">
                ➕ New Project
              </button>
              <button className="px-4 py-3 border-2 border-neutral-900 text-neutral-900 rounded-lg hover:bg-neutral-50 transition-colors duration-200 font-medium">
                📝 New Blog Post
              </button>
              <button className="px-4 py-3 border-2 border-neutral-900 text-neutral-900 rounded-lg hover:bg-neutral-50 transition-colors duration-200 font-medium">
                📅 Schedule Appointment
              </button>
              <button className="px-4 py-3 border-2 border-neutral-900 text-neutral-900 rounded-lg hover:bg-neutral-50 transition-colors duration-200 font-medium">
                ⚙️ Settings
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
