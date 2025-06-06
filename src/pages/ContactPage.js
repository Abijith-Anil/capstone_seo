import React, { useState } from 'react';
import '../App.css';

const ContactPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="contact-section">
      <div className="full-width-wrapper">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card contact-card shadow-lg">
              <div className="card-body p-5">
                <h1 className="section-title text-center mb-4">Contact Us</h1>
                <p className="lead text-center mb-4">Get in touch with our team to discuss your marketing needs.</p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="name" required placeholder="Enter your full name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" required placeholder="Enter your email" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows="5" required placeholder="Enter your message"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Send Message</button>
                </form>
                <div className="contact-details mt-4">
                  <p><i className="bi bi-envelope-fill"></i> Email: info@beyondboundaries.com</p>
                  <p><i className="bi bi-telephone-fill"></i> Phone: +1 705-566-8101</p>
                  <p><i className="bi bi-geo-alt-fill"></i> Address: Barry Downe Campus (Sudbury) 1400 Barry Downe Road Sudbury, Ontario, Canada P3A 3V8.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: showModal ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Message Sent!</h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <p>Thank you for reaching out! We'll get back to you soon.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;