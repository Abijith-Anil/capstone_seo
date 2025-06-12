import { useState, useEffect } from 'react';
import { db, auth } from '../firebase/firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import '../App.css';

const ContactPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

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
    <div>
      <div className="full-width-wrapper">

        {/* Map Section */}
        <div className="mb-5">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2807.152850110463!2d-80.961224!3d46.523716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4d2e4f43efc72fcb%3A0x75fcf4ff2bfe8b3d!2s1400%20Barry%20Downe%20Rd%2C%20Greater%20Sudbury%2C%20ON%20P3A%203V8%2C%20Canada!5e0!3m2!1sen!2sca!4v1623184861165!5m2!1sen!2sca"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded-bottom"
          ></iframe>
        </div>

        {/* Contact Form Section */}
        <div className="container mb-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0">
                <div className="card-body p-5">
                  <h2 className="section-title text-center mb-4 text-primary fw-bold">Contact Us</h2>
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

                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary btn-lg">Send Message</button>
                    </div>
                  </form>

                  {/* Contact Info */}
                  <div className="mt-5">
                    <h5 className="mb-3 text-secondary">Contact Information</h5>
                    <ul className="list-unstyled">
                      <li className="mb-2"><i className="bi bi-envelope-fill me-2 text-primary"></i> info@beyondboundaries.com</li>
                      <li className="mb-2"><i className="bi bi-telephone-fill me-2 text-primary"></i> +1 705-566-8101</li>
                      <li><i className="bi bi-geo-alt-fill me-2 text-primary"></i> 1400 Barry Downe Rd, Sudbury, ON, Canada</li>
                    </ul>
                  </div>

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
