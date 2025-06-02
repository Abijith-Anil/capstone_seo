import React from 'react';
import '../App.css';

const ServicesPage = () => (
  <div className="container">
    <div className="card p-4">
      <h1 className="section-title">Our Services</h1>
      <p className="lead">
        Discover our comprehensive range of marketing services designed to elevate your brand.
      </p>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Search Engine Optimization (SEO)</li>
        <li className="list-group-item">Email Marketing Campaigns</li>
        <li className="list-group-item">Social Media Marketing</li>
        <li className="list-group-item">Content Creation and Strategy</li>
        <li className="list-group-item">Pay-Per-Click (PPC) Advertising</li>
      </ul>
    </div>
  </div>
);

export default ServicesPage;