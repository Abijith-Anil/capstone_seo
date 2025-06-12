import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import Dashboard from './pages/Dashboard';
import ServicesDiscoveryPage from './pages/ServiceDiscoveryPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import { auth, db } from './firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Footer from './pages/components/Footer';
import './App.css';

import SEOServicePage from './pages/services/seo';
import ServiceDiscoveryPage from './pages/services/discovery';
import SocialMediaMarketingPage from './pages/services/SocialMediaMarketingPage';
import EmailMarketingPage from './pages/services/EmailMarketingPage';
import StrategyPage from './pages/services/StrategyPage';
import CustomSolutionsPage from './pages/services/CustomSolutionsPage';

import CompanyDetailPage from './pages/CompanyDetailPage';
import ReportsPage from './pages/ReportsPage';

const UserRoute = ({ user, role, children }) => {
  if (!user) return <Navigate to="/" />;
  if (role === 'admin') return <Navigate to="/admin-dashboard" />;
  return children;
};

const AdminRoute = ({ user, role, children }) => {
  if (!user) return <Navigate to="/" />;
  if (role !== 'admin') return <Navigate to="/dashboard" />;
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        const docRef = doc(db, 'users', u.uid);
        const userDoc = await getDoc(docRef);
        const data = userDoc.exists() ? userDoc.data() : {};
        setRole(data?.isAdmin ? 'admin' : 'user');
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">Beyond Boundaries</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/services">Services</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/service-discovery">Our Work</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>

              {(user && (role === 'user' || role === 'admin')) && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Account
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    {role === 'user' && (
                      <>
                        <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                        <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                      </>
                    )}
                    {role === 'admin' && (
                      <>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="/admin-dashboard">Admin</Link></li>
                      </>
                    )}
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/service-discovery" element={<ServicesDiscoveryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/dashboard" element={<UserRoute user={user} role={role}><Dashboard /></UserRoute>} />
        <Route path="/profile" element={<UserRoute user={user} role={role}><ProfilePage /></UserRoute>} />
        <Route path="/admin-dashboard" element={<AdminRoute user={user} role={role}><AdminDashboard /></AdminRoute>} />

        <Route path="/services/seo" element={<SEOServicePage />} />
        <Route path="/services/discovery" element={<ServiceDiscoveryPage />} />
        <Route path="/services/social-media" element={<SocialMediaMarketingPage />} />
        <Route path="/services/email-marketing" element={<EmailMarketingPage />} />
        <Route path="/services/strategy" element={<StrategyPage />} />
        <Route path="/services/custom" element={<CustomSolutionsPage />} />
        <Route path="/companies/:companyId" element={<CompanyDetailPage />} />
        <Route path="/reports" element={<ReportsPage />} />

      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
