import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import client1 from '../assets/images/client1.png';
import client2 from '../assets/images/client2.png';
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
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userCredential = await doCreateUserWithEmailAndPassword(formData.email, formData.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        ...formData,
        createdAt: new Date(),
      });

      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        password: '',
      });
      setLoading(false);
      navigate('/dashboard');
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
      navigate('/dashboard');
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
          <img src={client1} alt="Client 1" />
          <img src={client2} alt="Client 2" />
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

      {/* Registration Form */}
      <section className="form-section" id="form">
        <h2>Get In Touch</h2>
        <h3>Ready to get started?</h3>
        {error && <p className="error">{error}</p>}
        {submitted ? (
          <div className="success-message">Registration successful! Redirecting...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" name="firstName" placeholder="First Name *" value={formData.firstName} onChange={handleChange} required />
              <input type="text" name="lastName" placeholder="Last Name *" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required />
              <input type="tel" name="phone" placeholder="Phone *" value={formData.phone} onChange={handleChange} required />
            </div>
            <input type="text" name="company" placeholder="Company/Organization Name *" value={formData.company} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password *" value={formData.password} onChange={handleChange} required />
            <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
          </form>
        )}
        <button onClick={handleGoogleSignIn} disabled={loading} className="google-btn">
          {loading ? 'Signing in...' : 'Sign Up with Google'}
        </button>
      </section>
    </div>
  );
};

export default HomePage;
