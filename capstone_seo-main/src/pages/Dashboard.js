import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc, collection, query, where, getDocs, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [dashboardMetrics, setDashboardMetrics] = useState({
    campaignsRun: 0,
    newMessages: 0,
    activeClients: 0,
    monthlyAdSpend: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to generate realistic random data
  const generateRandomMetrics = () => ({
    campaignsRun: Math.floor(Math.random() * 20) + 3, // 3-22
    newMessages: Math.floor(Math.random() * 10) + 1, // 1-10
    activeClients: Math.floor(Math.random() * 25) + 5, // 5-29
    monthlyAdSpend: Math.floor(Math.random() * 50000) + 5000, // $5,000-$54,999
  });

  const generateRandomActivities = (userId) => {
    const activities = [
      'Created new campaign "Summer Sale"',
      'Received a message from client John Doe',
      'Updated profile information',
      'Reviewed performance report for May',
      'Launched Google Ads campaign',
      'Completed social media audit',
      'Analyzed competitor keywords',
      'Updated landing page content',
      'Responded to client inquiry',
      'Generated monthly analytics report'
    ];

    return activities.slice(0, 4).map((activity, index) => ({
      userId,
      activity,
      timestamp: new Date(Date.now() - (index * 3600000)), // Hours apart
      type: ['campaign', 'message', 'profile', 'report'][index % 4]
    }));
  };

  // Function to create initial data if none exists
  const createInitialData = async (userId) => {
    try {
      console.log('Creating initial data for user:', userId);
      
      // Create dashboard metrics
      const metrics = generateRandomMetrics();
      await addDoc(collection(db, 'dashboardMetrics'), {
        userId,
        ...metrics,
        lastUpdated: serverTimestamp()
      });

      // Create user activities
      const activities = generateRandomActivities(userId);
      for (const activity of activities) {
        await addDoc(collection(db, 'userActivity'), {
          ...activity,
          timestamp: serverTimestamp()
        });
      }

      console.log('Initial data created successfully');
      return { metrics, activities };
    } catch (error) {
      console.error('Error creating initial data:', error);
      return null;
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        // Fetch user data
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        }

        // Fetch dashboard metrics
        const metricsQuery = query(
          collection(db, 'dashboardMetrics'),
          where('userId', '==', user.uid)
        );
        const metricsSnapshot = await getDocs(metricsQuery);
        
        let metricsData;
        if (!metricsSnapshot.empty) {
          // Data exists, use it
          metricsData = metricsSnapshot.docs[0].data();
          console.log('Found existing metrics:', metricsData);
        } else {
          // No data exists, create initial data
          console.log('No metrics found, creating initial data...');
          const initialData = await createInitialData(user.uid);
          if (initialData) {
            metricsData = initialData.metrics;
            console.log('Created initial metrics:', metricsData);
          } else {
            // Fallback to random data if creation fails
            metricsData = generateRandomMetrics();
          }
        }

        setDashboardMetrics({
          campaignsRun: metricsData.campaignsRun || 0,
          newMessages: metricsData.newMessages || 0,
          activeClients: metricsData.activeClients || 0,
          monthlyAdSpend: metricsData.monthlyAdSpend || 0
        });

        // Fetch recent activity (simplified query to avoid index requirement)
        const activityQuery = query(
          collection(db, 'userActivity'),
          where('userId', '==', user.uid),
          limit(10) // Get more and sort in JavaScript
        );
        const activitySnapshot = await getDocs(activityQuery);
        
        if (!activitySnapshot.empty) {
          const activityData = activitySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          // Sort by timestamp in JavaScript and take first 4
          .sort((a, b) => {
            const aTime = a.timestamp?.toDate ? a.timestamp.toDate().getTime() : Date.now();
            const bTime = b.timestamp?.toDate ? b.timestamp.toDate().getTime() : Date.now();
            return bTime - aTime;
          })
          .slice(0, 4);
          setRecentActivity(activityData);
          console.log('Found existing activities:', activityData);
        } else {
          // If no activities were created or found, show fallback
          console.log('No activities found, using fallback data');
          setRecentActivity([]);
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Set fallback data on error
        setDashboardMetrics(generateRandomMetrics());
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  if (loading || !userData)
    return <p className="text-center mt-5">Loading dashboard...</p>;

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
            { title: 'Campaigns Run', value: dashboardMetrics.campaignsRun, icon: '🚀' },
            { title: 'New Messages', value: dashboardMetrics.newMessages, icon: '💬' },
            { title: 'Active Clients', value: dashboardMetrics.activeClients, icon: '🤝' },
            { title: 'Monthly Ad Spend', value: `$${dashboardMetrics.monthlyAdSpend.toLocaleString()}`, icon: '💰' },
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
          {recentActivity.length > 0 ? (
            recentActivity.map((item, idx) => (
              <li key={item.id || idx} className="list-group-item">
                {item.activity}
                <small className="text-muted ms-2">
                  {item.timestamp?.toDate ? item.timestamp.toDate().toLocaleDateString() : 'Recently'}
                </small>
              </li>
            ))
          ) : (
            [
              'Created new campaign "Summer Sale"',
              'Received a message from client John Doe',
              'Updated profile information',
              'Reviewed performance report for May',
            ].map((item, idx) => (
              <li key={idx} className="list-group-item">
                {item}
              </li>
            ))
          )}
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
