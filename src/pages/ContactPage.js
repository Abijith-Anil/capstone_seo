import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import '../App.css';

const ContactPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null); // Store user's full name from Firestore

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Fetch user details from Firestore
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = e.target.message.value.trim();
    if (!message) return;

    const name = user
      ? `${userData?.firstName || ''} ${userData?.lastName || ''}`.trim() || user.displayName || ''
      : e.target.name.value.trim();

    const email = user ? user.email : e.target.email.value.trim();

    try {
      await addDoc(collection(db, 'contactMessages'), {
        name,
        email,
        message,
        createdAt: serverTimestamp(),
        fromUid: user?.uid || null,
      });

      setShowModal(true);
      e.target.reset();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('There was a problem sending your message. Please try again.');
    }
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
                <p className="lead text-center mb-4">
                  {user
                    ? `Welcome back, ${userData?.firstName || user.displayName || user.email.split('@')[0]}!`
                    : 'Get in touch with our team to discuss your marketing needs.'}
                </p>

                <form onSubmit={handleSubmit}>
                  {!user && (
                    <>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          id="name"
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          id="email"
                          required
                          placeholder="Enter your email"
                        />
                      </div>
                    </>
                  )}

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      name="message"
                      className="form-control"
                      id="message"
                      rows="5"
                      required
                      placeholder="Enter your message"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">Send Message</button>
                </form>

                <div className="contact-details mt-4">
                  <p><i className="bi bi-envelope-fill"></i> Email: info@beyondboundaries.com</p>
                  <p><i className="bi bi-telephone-fill"></i> Phone: +1 705-566-8101</p>
                  <p><i className="bi bi-geo-alt-fill"></i> Address: 1400 Barry Downe Rd, Sudbury, ON, Canada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
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
      )}
    </div>
  );
};

export default ContactPage;
