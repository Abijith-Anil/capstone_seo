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
import './App.css';


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
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/services">Services</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/service-discovery">Our Work</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
              {user && role === 'user' && (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/profile">My Profile</Link></li>
                </>
              )}
              {user && role === 'admin' && (
                <li className="nav-item"><Link className="nav-link" to="/admin-dashboard">Admin</Link></li>
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

        {/*Role-protected Routes */}
        <Route path="/dashboard" element={<UserRoute user={user} role={role}><Dashboard /></UserRoute>} />
        <Route path="/profile" element={<UserRoute user={user} role={role}><ProfilePage /></UserRoute>} />
        <Route path="/admin-dashboard" element={<AdminRoute user={user} role={role}><AdminDashboard /></AdminRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
