import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div>
      <h1>Beyond Boundaries</h1>

      <p>
        Explore how our global marketing strategies empower businesses like yours to reach international audiences.
      </p>

      <h2>Trusted Worldwide</h2>

      <div>
        <h2>Raising Global Awareness</h2>
        <Link to="/services">View Our Services →</Link>
      </div>

      <div>
        <div>
          <h2>Get in touch</h2>
          <p>Ready to get started?</p>
        </div>

        <div>
          {submitted ? (
            <p>Thank you, {formData.firstName}! We'll be in touch soon.</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div>
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Company/Organization Name:</label>
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <button type="submit">Register</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
