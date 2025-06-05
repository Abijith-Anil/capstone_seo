import React from 'react';
import '../App.css';
import serviceImg from '../assets/images/serviceimg.png'; // Import the image

const ServicesPage = () => (
  <div className="container services-section">
    <div className="row align-items-center">
      <div className="col-md-6">
        <div className="services-image-placeholder">
          {/* Use the imported image */}
          <img src={serviceImg} alt="Phone displaying content" className="img-fluid rounded" />
        </div>
      </div>
      <div className="col-md-6">
        <h1 className="things-we-do">
          <span className="arrow-left">&lt;&lt;</span> THINGS WE DO <span className="arrow-right">&gt;&gt;</span>
        </h1>
        <div className="service-item">
          <h3>SEO</h3>
          <p>This is the space to introduce the business and what it has to offer. Define the qualities and values that make it unique.</p>
        </div>
        <div className="service-item">
          <h3>Service Discovery Page</h3>
          <p>This is the space to introduce the business and what it has to offer. Define the qualities and values that make it unique.</p>
        </div>
        <div className="service-item">
          <h3>Social Media Marketing</h3>
          <p>This is the space to introduce the business and what it has to offer. Define the qualities and values that make it unique.</p>
        </div>
        <div className="service-item">
          <h3>E-mail Marketing</h3>
          <p>This is the space to introduce the business and what it has to offer. Define the qualities and values that make it unique.</p>
        </div>
        <div className="service-item">
          <h3>Strategy</h3>
          <p>This is the space to introduce the business and what it has to offer. Define the qualities and values that make it unique.</p>
        </div>
      </div>
    </div>
  </div>
);

export default ServicesPage;