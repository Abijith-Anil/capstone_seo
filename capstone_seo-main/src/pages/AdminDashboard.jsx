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
        console.log('Fetching admin data for user:', user.uid);
        
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          console.log('User data:', data);
          console.log('Is Admin:', data.isAdmin);
          setUserData(data);

          if (!data.isAdmin) {
            console.log('User is not admin, redirecting to dashboard');
            navigate('/dashboard');
            return;
          }

          console.log('User is admin, fetching contact messages...');
          const messagesSnapshot = await getDocs(collection(db, 'contactMessages'));
          const messagesData = messagesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          console.log('Fetched messages:', messagesData);
          setMessages(messagesData);
        } else {
          console.log('User document does not exist, redirecting to home');
          navigate('/');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        console.error('Error code:', err.code);
        console.error('Error message:', err.message);
        
        if (err.code === 'permission-denied') {
          alert('Permission denied: Unable to access admin data. Please check Firebase security rules.');
        }
        
        setLoading(false);
        // Don't redirect on error, let admin see the error
      }
    };

    fetchAdminData();
  }, [navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }
    
    try {
      await deleteDoc(doc(db, 'contactMessages', id));
      setMessages(messages.filter(msg => msg.id !== id));
      setSelectedMessage(null);
      alert('Message deleted successfully.');
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Error deleting message. Please try again.');
    }
  };

  const handleReply = async () => {
    if (!reply.trim()) return;
    
    try {
      await updateDoc(doc(db, 'contactMessages', selectedMessage.id), {
        adminReply: reply,
        repliedAt: serverTimestamp()
      });
      
      // Update local state to show the reply immediately
      setMessages(messages.map(msg => 
        msg.id === selectedMessage.id 
          ? { ...msg, adminReply: reply, repliedAt: new Date() }
          : msg
      ));
      
      setSelectedMessage({ ...selectedMessage, adminReply: reply, repliedAt: new Date() });
      setReply('');
      
      alert('Reply saved successfully! You can implement email sending separately.');
    } catch (error) {
      console.error('Error saving reply:', error);
      alert('Error saving reply. Please try again.');
    }
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
              <button 
                className="btn btn-primary" 
                onClick={handleReply}
                disabled={!reply.trim()}
              >
                Send Reply
              </button>
              <button 
                className="btn btn-danger" 
                onClick={() => handleDelete(selectedMessage.id)}
              >
                Delete Message
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => setSelectedMessage(null)}
              >
                Back to List
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
