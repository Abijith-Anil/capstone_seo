import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/AdminDashboard.css'; // Optional: for styling

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/');
      return;
    }

    const fetchAdminData = async () => {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setUserData(data);

          if (!data.isAdmin) {
            navigate('/dashboard');
            return;
          }

          const messagesSnapshot = await getDocs(collection(db, 'contactMessages'));
          const messagesData = messagesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          setMessages(messagesData);
        } else {
          navigate('/');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        navigate('/');
      }
    };

    fetchAdminData();
  }, [navigate]);

  if (loading) {
    return <div className="admin-loading">Loading admin dashboard...</div>;
  }

  return (
    <div className="admin-dashboard-container">
      <header className="admin-header">
        <h1>👩‍💼 Admin Dashboard</h1>
        <p>Welcome, {userData?.firstName}!</p>
      </header>

      <section className="admin-stats">
        <div className="stat-card">
          <h2>{messages.length}</h2>
          <p>Messages Received</p>
        </div>
        <div className="stat-card">
          <h2>{new Date().toLocaleDateString()}</h2>
          <p>Today's Date</p>
        </div>
      </section>

      <section className="admin-messages">
        <h2>📨 Contact Messages</h2>
        {messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          <ul className="message-list">
            {messages.map(msg => (
              <li key={msg.id} className="message-card">
                <p><strong>Name:</strong> {msg.name}</p>
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Message:</strong> {msg.message}</p>
                <p className="timestamp">
                  <small>{msg.createdAt?.toDate().toLocaleString()}</small>
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
