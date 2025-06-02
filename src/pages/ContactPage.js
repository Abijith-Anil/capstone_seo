import React from 'react';
import '../App.css';

const ContactPage = () => (
  <div className="container">
    <div className="card p-4">
      <h1 className="section-title">Contact Us</h1>
      <p className="lead">
        Get in touch with our team to discuss your marketing needs.
      </p>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea className="form-control" id="message" rows="5" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Send Message</button>
      </form>
    </div>
  </div>
);

export default ContactPage;