import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/');
      return;
    }

    const fetchUserData = async () => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  if (!userData)
    return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container my-5" style={{ maxWidth: 900 }}>

      {/* Welcome Banner */}
      <section className="bg-primary text-white rounded-3 p-4 d-flex align-items-center shadow mb-4 flex-wrap">
        <div className="display-5 fw-bold me-4" style={{ minWidth: 150 }}>
          👋 Hey, {userData.firstName || 'User'}!
        </div>
        <div className="flex-grow-1">
          <p className="lead mb-0">Welcome back to your dashboard. Ready to boost your marketing?</p>
        </div>
        <img
          src={userData.photoURL || 'https://placehold.co/70x70'}
          alt="Profile"
          className="rounded-circle border border-white"
          style={{ width: 70, height: 70, objectFit: 'cover', marginLeft: '1rem' }}
        />
      </section>

      {/* Profile Summary + Stats */}
      <section className="d-flex flex-wrap gap-4 mb-5">
        {/* Profile Card */}
        <div className="card flex-grow-1 shadow-sm" style={{ minWidth: 300 }}>
          <div className="card-body">
            <h2 className="card-title mb-3">Your Profile</h2>
            <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone || 'Not provided'}</p>
            <p><strong>Company:</strong> {userData.company || 'Not provided'}</p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate('/profile')}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div
          className="d-grid gap-3 flex-grow-2"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}
        >
          {[
            { title: 'Campaigns Run', value: 7, icon: '🚀' },
            { title: 'New Messages', value: 3, icon: '💬' },
            { title: 'Active Clients', value: 12, icon: '🤝' },
            { title: 'Monthly Ad Spend', value: '$12,400', icon: '💰' },
          ].map(({ title, value, icon }) => (
            <div key={title} className="card shadow-sm text-center p-3">
              <div style={{ fontSize: '2rem' }}>{icon}</div>
              <div className="fs-4 fw-semibold">{value}</div>
              <div className="text-muted">{title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="bg-light rounded-3 p-4 shadow mb-5">
        <h2 className="mb-3">Recent Activity</h2>
        <ul className="list-group">
          {[
            'Created new campaign "Summer Sale"',
            'Received a message from client John Doe',
            'Updated profile information',
            'Reviewed performance report for May',
          ].map((item, idx) => (
            <li key={idx} className="list-group-item">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Quick Action Buttons */}
      <section className="text-center">
        <h2 className="mb-4">Quick Actions</h2>
        <div className="d-flex justify-content-center flex-wrap gap-3">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/create-campaign')}
          >
            🚀 New Campaign
          </button>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/reports')}
          >
            📈 View Reports
          </button>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/support')}
          >
            🛠 Support
          </button>
          <button
            className="btn btn-danger btn-lg"
            onClick={handleLogout}
          >
            🔒 Logout
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
