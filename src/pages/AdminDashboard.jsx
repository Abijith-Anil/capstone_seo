import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState('');

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

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'contactMessages', id));
    setMessages(messages.filter(msg => msg.id !== id));
    setSelectedMessage(null);
  };

  const handleReply = async () => {
    if (!reply.trim()) return;
    await updateDoc(doc(db, 'contactMessages', selectedMessage.id), {
      adminReply: reply,
      repliedAt: serverTimestamp()
    });
    setReply('');
    alert('Reply saved (you can implement email sending separately).');
  };

  if (loading) {
    return <div className="admin-loading">Loading admin dashboard...</div>;
  }

  return (
    <div className="admin-dashboard-container">
      <header className="admin-header">
        <h1>👩‍💼 Admin Dashboard</h1>
        <p>Welcome, {userData?.firstName}!</p>
        <button onClick={handleLogout} className="logout-button">Logout</button>
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
        ) : selectedMessage ? (
          <div className="message-detail">
            <button className="back-button" onClick={() => setSelectedMessage(null)}>
              ← Back to List
            </button>
            <h3>Message from {selectedMessage.name}</h3>
            <p><strong>Email:</strong> {selectedMessage.email}</p>
            <p><strong>Message:</strong> {selectedMessage.message}</p>
            <p className="timestamp">
              <small>{selectedMessage.createdAt?.toDate().toLocaleString()}</small>
            </p>

            {selectedMessage.adminReply && (
              <p className="reply"><strong>Reply:</strong> {selectedMessage.adminReply}</p>
            )}

            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write your reply here..."
              className="reply-box"
            />
            <button onClick={handleReply} className="reply-button">Send Reply</button>
            <button onClick={() => handleDelete(selectedMessage.id)} className="delete-button">Delete Message</button>
          </div>
        ) : (
          <ul className="message-list">
            {messages.map(msg => (
              <li
                key={msg.id}
                className="message-card"
                onClick={() => setSelectedMessage(msg)}
              >
                <p><strong>Name:</strong> {msg.name}</p>
                <p><strong>Email:</strong> {msg.email}</p>
                {msg.adminReply && <p className="replied-tag">✔️ Replied</p>}
                <button className="view-message-button">View Message</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
