import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase/firebase';
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from '../firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Puma from '../assets/images/Puma.png';
import Nike from '../assets/images/Nike.png';
import '../assets/styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null); // Track current user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await doSignInWithEmailAndPassword(formData.email, formData.password);
        navigate('/Dashboard');
      } else {
        const userCredential = await doCreateUserWithEmailAndPassword(formData.email, formData.password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
          ...formData,
          createdAt: new Date(),
        });

        navigate('/Dashboard');
      }

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        password: '',
      });

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await doSignInWithGoogle();
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
          email: user.email,
          phone: '',
          company: '',
          createdAt: new Date(),
        });
      }

      setLoading(false);
      navigate('/Dashboard');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="text">
          <h1>Beyond Boundaries:</h1>
          <p>Reimagine Your Marketing Journey</p>
        </div>
        <div className="images">
          <img src={Puma} alt="Puma" />
          <img src={Nike} alt="Nike" />
        </div>
        <a href="#form" className="discover">🔍 Discover More Clients</a>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <h2>Trusted Worldwide</h2>
        <h3>Raising Global Awareness</h3>
        <div className="cards">
          <div className="card">
            <h4>500 +</h4>
            <p>Businesses served: Partnering globally, we deliver tailored marketing solutions to meet diverse needs and goals.</p>
          </div>
          <div className="card">
            <h4>200K</h4>
            <p>Monthly Website Visits: Our campaigns consistently drive significant traffic, boosting online presence and engagement.</p>
          </div>
          <div className="card">
            <h4>$2M +</h4>
            <p>Gross Monthly Ad Spend: Managing substantial ad budgets, we optimize campaigns for high return of investment.</p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      {!user && (
        <section className="form-section" id="form">
          <h2>{isLogin ? 'Login' : 'Get In Touch'}</h2>
          <h3>{isLogin ? 'Access your account' : 'Ready to get started?'}</h3>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="form-row">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone *"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company/Organization *"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
            <input
              type="password"
              name="password"
              placeholder="Password *"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <button type="submit" disabled={loading}>
              {loading ? (isLogin ? 'Logging in...' : 'Registering...') : isLogin ? 'Login' : 'Register'}
            </button>
          </form>

          <button onClick={handleGoogleSignIn} disabled={loading} className="google-btn">
            {loading ? 'Please wait...' : 'Sign In with Google'}
          </button>

          <button onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </section>
      )}
    </div>
  );
};

export default HomePage;
