import '../App.css';
import About from '../assets/images/about.jpg';
import Def from '../assets/images/person.webp';

const AboutPage = () => (
  <div className="about-page">

    {/* Hero Section */}
    <div className="hero-section position-relative text-white mb-5" style={{ backgroundImage: 'url(https://www.boardeffect.com/wp-content/uploads/2021/08/Crafting-a-Good-Mission-Statement-The-Essential-Elements.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '400px' }}>
      <div className="container h-100 d-flex flex-column justify-content-center align-items-center position-relative">
        <h1 className="display-4 fw-bold">About Us</h1>
        <p className="lead">Discover the heart of Beyond Boundaries</p>
      </div>
    </div>

    {/* Who We Are */}
    <div className="container mb-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Who We Are</h2>
        <p className="lead">
          At Beyond Boundaries, we are passionate about helping businesses expand their reach through innovative marketing strategies. Our team of experts specializes in SEO, email marketing, social media, and more, ensuring your brand stands out in a competitive global market.
        </p>
      </div>

      {/* Core Values Cards */}
      <div className="row text-center g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <i className="bi bi-lightbulb-fill fs-1 text-primary mb-3"></i>
              <h5 className="card-title">Innovation</h5>
              <p className="card-text">We leverage cutting-edge techniques to deliver unparalleled results.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <i className="bi bi-star-fill fs-1 text-warning mb-3"></i>
              <h5 className="card-title">Excellence</h5>
              <p className="card-text">Our commitment to quality drives every project we undertake.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <i className="bi bi-people-fill fs-1 text-success mb-3"></i>
              <h5 className="card-title">Collaboration</h5>
              <p className="card-text">We work closely with our clients to achieve shared success.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Mission & Vision Section */}
    <div className="bg-light py-5">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <img src={About} alt="Our Mission" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-6">
            <h3 className="fw-bold mb-3">Our Mission</h3>
            <p className="text-muted">
              Our mission is to empower businesses to grow beyond limits by crafting custom marketing strategies tailored to their goals. We blend creativity, technology, and data-driven insights to maximize impact and return on investment.
            </p>

            <h3 className="fw-bold mt-4 mb-3">Our Vision</h3>
            <p className="text-muted">
              To be a global leader in digital marketing, known for transforming brands and exceeding expectations through collaboration, innovation, and measurable results.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Team Section */}
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Meet Our Team</h2>
        <p className="text-muted">A passionate group of experts dedicated to your success.</p>
      </div>

      <div className="row g-4">
        {['Parth', 'Ujjawal', 'abhi','saurav'].map((name, i) => (
          <div className="col-md-4" key={i}>
            <div className="card border-0 text-center p-3">
              <img src={Def} className="rounded-circle mx-auto mb-3" style={{ width: '50px', height: '50px', objectFit: 'cover' }} alt={name} />
              <h5 className="mb-1">{name} Cambrian</h5>
              <p className="text-muted small">Digital Strategist</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Call to Action */}
    <div className="bg-primary text-white text-center py-5">
      <h2 className="fw-bold mb-3">Let’s Elevate Your Brand Together</h2>
      <p className="mb-4">Ready to go beyond boundaries with us?</p>
      <a href="/contact" className="btn btn-light btn-lg">Get in Touch</a>
    </div>
  </div>
);

export default AboutPage;