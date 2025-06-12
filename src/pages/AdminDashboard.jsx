import { useEffect, useState } from 'react';
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
    return <div className="text-center mt-5">Loading admin dashboard...</div>;
  }

  return (
    <div className="container my-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3">👩‍💼 Admin Dashboard</h1>
          <p className="text-muted">Welcome, {userData?.firstName}!</p>
        </div>
        <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
      </header>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h4>{messages.length}</h4>
              <p className="mb-0 text-muted">Messages Received</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h4>{new Date().toLocaleDateString()}</h4>
              <p className="mb-0 text-muted">Today's Date</p>
            </div>
          </div>
        </div>
      </div>

      <section>
        <h4 className="mb-3">📨 Contact Messages</h4>
        {messages.length === 0 ? (
          <p className="text-muted">No messages found.</p>
        ) : selectedMessage ? (
          <div className="card shadow-sm p-4">
            <button className="btn btn-link mb-3" onClick={() => setSelectedMessage(null)}>
              ← Back to List
            </button>
            <h5 className="mb-2">Message from {selectedMessage.name}</h5>
            <p><strong>Email:</strong> {selectedMessage.email}</p>
            <p><strong>Message:</strong> {selectedMessage.message}</p>
            <p className="text-muted"><small>{selectedMessage.createdAt?.toDate().toLocaleString()}</small></p>

            {selectedMessage.adminReply && (
              <div className="alert alert-success">
                <strong>Reply:</strong> {selectedMessage.adminReply}
              </div>
            )}

            <div className="mb-3">
              <textarea
                className="form-control"
                rows="4"
                placeholder="Write your reply here..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              ></textarea>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-primary" onClick={handleReply}>Send Reply</button>
              <button className="btn btn-danger" onClick={() => handleDelete(selectedMessage.id)}>
                Delete Message
              </button>
            </div>
          </div>
        ) : (
          <div className="row">
            {messages.map(msg => (
              <div className="col-md-6 mb-3" key={msg.id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <p><strong>Name:</strong> {msg.name}</p>
                      <p><strong>Email:</strong> {msg.email}</p>
                      {msg.adminReply && (
                        <span className="badge bg-success mb-2">✔️ Replied</span>
                      )}
                    </div>
                    <button
                      className="btn btn-outline-primary mt-auto"
                      onClick={() => setSelectedMessage(msg)}
                    >
                      View Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
