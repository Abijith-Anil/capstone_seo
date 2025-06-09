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

  if (!userData) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>;

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', fontFamily: 'Arial, sans-serif', padding: '0 1rem' }}>
      
      {/* Welcome Banner */}
      <section
        style={{
          background: '#4a90e2',
          color: 'white',
          padding: '2rem',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 5px 15px rgba(74,144,226,0.3)',
        }}
      >
        <div style={{ fontSize: '2.8rem', fontWeight: 'bold' }}>
          👋 Hey, {userData.firstName || 'User'}!
        </div>
        <div style={{ flexGrow: 1 }}>
          <p style={{ fontSize: '1.25rem', marginTop: 4 }}>
            Welcome back to your dashboard. Ready to boost your marketing?
          </p>
        </div>
        <img
          src={userData.photoURL || 'https://via.placeholder.com/70'}
          alt="Profile"
          style={{ borderRadius: '50%', width: 70, height: 70, objectFit: 'cover', border: '3px solid white' }}
        />
      </section>

      {/* Profile Summary + Actions */}
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}
      >
        {/* Profile Card */}
        <div
          style={{
            flex: '1 1 300px',
            background: '#f5f7fa',
            padding: '1.5rem',
            borderRadius: '10px',
            boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ marginBottom: '1rem' }}>Your Profile</h2>
          <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone || 'Not provided'}</p>
          <p><strong>Company:</strong> {userData.company || 'Not provided'}</p>
          <button
            onClick={() => navigate('/profile')}
            style={{
              marginTop: '1rem',
              backgroundColor: '#4a90e2',
              border: 'none',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Edit Profile
          </button>
        </div>

        {/* Quick Stats Cards */}
        <div
          style={{
            flex: '2 1 500px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem',
          }}
        >
          {[
            { title: 'Campaigns Run', value: 7, icon: '🚀' },
            { title: 'New Messages', value: 3, icon: '💬' },
            { title: 'Active Clients', value: 12, icon: '🤝' },
            { title: 'Monthly Ad Spend', value: '$12,400', icon: '💰' },
          ].map(({ title, value, icon }) => (
            <div
              key={title}
              style={{
                background: 'white',
                padding: '1rem',
                borderRadius: '10px',
                boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
                textAlign: 'center',
                fontWeight: '600',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
              <div style={{ fontSize: '1.5rem' }}>{value}</div>
              <div style={{ color: '#555' }}>{title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section
        style={{
          background: '#f9fafb',
          borderRadius: '10px',
          padding: '1rem 1.5rem',
          boxShadow: '0 3px 8px rgba(0,0,0,0.05)',
          marginBottom: '2rem',
        }}
      >
        <h2 style={{ marginBottom: '1rem' }}>Recent Activity</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {[
            'Created new campaign "Summer Sale"',
            'Received a message from client John Doe',
            'Updated profile information',
            'Reviewed performance report for May',
          ].map((item, idx) => (
            <li
              key={idx}
              style={{
                background: 'white',
                padding: '0.75rem 1rem',
                marginBottom: '0.5rem',
                borderRadius: '6px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Quick Action Buttons */}
      <section style={{ textAlign: 'center' }}>
        <h2>Quick Actions</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/create-campaign')}
            style={actionBtnStyle}
          >
            🚀 New Campaign
          </button>
          <button
            onClick={() => navigate('/reports')}
            style={actionBtnStyle}
          >
            📈 View Reports
          </button>
          <button
            onClick={() => navigate('/support')}
            style={actionBtnStyle}
          >
            🛠 Support
          </button>
          <button
            onClick={handleLogout}
            style={{ ...actionBtnStyle, backgroundColor: '#e74c3c' }}
          >
            🔒 Logout
          </button>
        </div>
      </section>
    </div>
  );
};

const actionBtnStyle = {
  backgroundColor: '#4a90e2',
  color: 'white',
  border: 'none',
  padding: '0.8rem 1.5rem',
  borderRadius: '8px',
  fontSize: '1rem',
  cursor: 'pointer',
  minWidth: 140,
  transition: 'background-color 0.3s',
};

export default Dashboard;
