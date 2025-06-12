import { useState, useEffect } from 'react';
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
import Marketing from '../assets/images/marketing-strategy.png';
import About from '../assets/images/about.jpg';
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
  const [user, setUser] = useState(null);

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
        const signInUser = await doSignInWithEmailAndPassword(formData.email, formData.password);
        const signedInUser = signInUser.user;

        const userDoc = await getDoc(doc(db, 'users', signedInUser.uid));
        const userData = userDoc.data();

        if (userData?.isAdmin) {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        const userCredential = await doCreateUserWithEmailAndPassword(formData.email, formData.password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
          ...formData,
          createdAt: new Date(),
          isAdmin: false,
        });

        navigate('/dashboard');
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
          isAdmin: false,
        });
        navigate('/dashboard');
      } else {
        const userData = userDocSnap.data();
        navigate(userData?.isAdmin ? '/admin-dashboard' : '/dashboard');
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="home-container">

      {/* Hero Section / Jumbotron */}
      <section className="bg-light py-5 mb-4">
        <div className="container text-center">
          <h1 className="display-4 fw-bold text-primary">Beyond Boundaries</h1>
          <p className="lead">Reimagine Your Marketing Journey</p>
          <div className="d-flex justify-content-center my-4 gap-4">
            <img src={Puma} alt="Puma" className="img-fluid" style={{ maxHeight: '60px' }} />
            <img src={Nike} alt="Nike" className="img-fluid" style={{ maxHeight: '60px' }} />
          </div>
          <a href="#form" className="btn btn-primary btn-lg mt-3">
            🔍 Discover More Clients
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-2">Trusted Worldwide</h2>
          <p className="text-muted mb-5">Raising Global Awareness</p>
          <div className="row g-4">

            {/* Businesses Served */}
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-globe2 fs-1 text-primary mb-3"></i>
                  <h4 className="fw-bold">500+</h4>
                  <p>Businesses served globally.</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-bar-chart-line fs-1 text-success mb-3"></i>
                  <h4 className="fw-bold">200K</h4>
                  <p>Monthly Website Visits.</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-currency-dollar fs-1 text-warning mb-3"></i>
                  <h4 className="fw-bold">$2M+</h4>
                  <p>Gross Monthly Ad Spend.</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-megaphone fs-1 text-danger mb-3"></i>
                  <h4 className="fw-bold">1,200+</h4>
                  <p>Campaigns Successfully Managed.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">

            {/* Text Content */}
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="fw-bold mb-3 text-primary">What We Do</h2>
              <p className="text-muted">
                We empower brands to grow beyond boundaries.
                Our expertise spans strategic digital marketing, paid ad campaigns, SEO, branding, and
                growth consulting. We collaborate with global clients to deliver measurable, impactful results.
              </p>
              <p className="text-muted">
                Whether you're a startup or an established business, we tailor marketing strategies that drive traffic, boost conversions, and maximize ROI.
              </p>
              <a href="#form" className="btn btn-outline-primary mt-3">
                Get in Touch
              </a>
            </div>

            <div className="col-md-6 text-center">
              <img
                src={About}
                alt="What We Do"
                className="img-fluid rounded shadow"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Form Section */}
      {!user && (
        <section id="form" className="py-5 bg-white">
          <div className="container">
            <div className="text-center mb-4">
              <h2>{isLogin ? 'Login' : 'Get In Touch'}</h2>
              <p className="text-muted">{isLogin ? 'Access your account' : 'Ready to get started?'}</p>
            </div>

            <div className="row align-items-center">

              {/* Left Side - Image */}
              <div className="col-md-6 mb-4 mb-md-0">
                <img
                  src={Marketing}
                  alt="Contact Us"
                  className="img-fluid rounded shadow"
                />
              </div>

              {/* Right Side - Form */}
              <div className="col-md-6 mb-4 mb-md-0">
                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <>
                      <div className="mb-3">
                        <input
                          type="text"
                          name="firstName"
                          className="form-control"
                          placeholder="First Name *"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          name="lastName"
                          className="form-control"
                          placeholder="Last Name *"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          placeholder="Phone *"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          name="company"
                          className="form-control"
                          placeholder="Company/Organization *"
                          value={formData.company}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password *"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-3">
                    <button type="submit" className="btn btn-success rounded-pill" disabled={loading}>
                      {loading ? (isLogin ? 'Logging in...' : 'Registering...') : isLogin ? 'Login' : 'Register'}
                    </button>

                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="btn btn-outline-danger rounded-pill"
                      disabled={loading}
                    >
                      {loading ? 'Please wait...' : 'Sign In with Google'}
                    </button>
                  </div>

                  <div>
                    <button type="button" onClick={() => setIsLogin(!isLogin)} className="btn text-primary">
                      {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
