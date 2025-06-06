import React from 'react';
import '../App.css';

const AboutPage = () => (
  <div className="about-page">
    <div className="hero-section" style={{ backgroundImage: 'url(https://via.placeholder.com/1200x400?text=About+Us+Hero)' }}>
      <div className="hero-overlay">
        <h1 className="hero-title">About Us</h1>
        <p className="hero-subtitle">Discover the heart of Beyond Boundaries</p>
      </div>
    </div>
    <div className="container">
      <div className="about-content">
        <h2 className="section-title">Who We Are</h2>
        <p className="lead">
          At Beyond Boundaries, we are passionate about helping businesses expand their reach through innovative marketing strategies. Our team of experts specializes in SEO, email marketing, social media, and more, ensuring your brand stands out in a competitive global market.
        </p>
      </div>
      <div className="row g-4 mt-5">
        <div className="col-md-4">
          <div className="card about-card">
            <div className="card-body text-center">
              <h3 className="card-title">Innovation</h3>
              <p className="card-text">We leverage cutting-edge techniques to deliver unparalleled results.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card about-card">
            <div className="card-body text-center">
              <h3 className="card-title">Excellence</h3>
              <p className="card-text">Our commitment to quality drives every project we undertake.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card about-card">
            <div className="card-body text-center">
              <h3 className="card-title">Collaboration</h3>
              <p className="card-text">We work closely with our clients to achieve shared success.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <a href="/contact" className="btn btn-primary btn-lg">Get in Touch</a>
      </div>
    </div>
  </div>
);

export default AboutPage;