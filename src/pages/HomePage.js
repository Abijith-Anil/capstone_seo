import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../App.css';

const HomePage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "registrations"), formData);
      setSubmitted(true);
      console.log("Registration saved to Firestore.");
    } catch (err) {
      console.error("Error adding document:", err);
    }
  };

  return (
    <div className="container">
      <div className="card p-4 mb-4">
        <h1 className="section-title">Beyond Boundaries</h1>
        <p className="lead">
          Explore how our global marketing strategies empower businesses like yours to reach international audiences.
        </p>
      </div>

      <div className="card p-4 mb-4">
        <h2 className="section-title">Trusted Worldwide</h2>
        <p>
          Our proven strategies have helped businesses across the globe achieve their marketing goals.
        </p>
        <Link to="/services" className="btn btn-primary mt-3">View Our Services →</Link>
      </div>

      <div className="card p-4">
        <h2 className="section-title">Get in Touch</h2>
        <p className="lead">Ready to get started? Fill out the form below to connect with our team.</p>
        {submitted ? (
          <div className="alert alert-success" role="alert">
            Thank you, {formData.firstName}! We'll be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="company" className="form-label">Company/Organization Name</label>
              <input
                type="text"
                className="form-control"
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default HomePage;