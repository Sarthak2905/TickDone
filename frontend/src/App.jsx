import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/globals.css'

// Placeholder pages
const HomePage = () => (
  <div className="min-h-screen bg-white">
    <div className="container-max section-padding text-center">
      <h1>Welcome to Architecture Firm Management</h1>
      <p className="text-neutral-600 mt-4">Platform under construction</p>
    </div>
  </div>
)

const PortfolioPage = () => (
  <div className="min-h-screen bg-white">
    <div className="container-max section-padding">
      <h1>Portfolio</h1>
    </div>
  </div>
)

const BlogPage = () => (
  <div className="min-h-screen bg-white">
    <div className="container-max section-padding">
      <h1>Blog</h1>
    </div>
  </div>
)

const AdminPage = () => (
  <div className="min-h-screen bg-white">
    <div className="container-max section-padding">
      <h1>Admin Dashboard</h1>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  )
}

export default App
