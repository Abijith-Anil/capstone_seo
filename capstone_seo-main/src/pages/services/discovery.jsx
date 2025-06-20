import React from 'react';
import { Link } from 'react-router-dom';
import discoveryImg from '../../assets/images/discovery.png';

const ServiceDiscoveryPage = () => {
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">
          <span className="text-success">&lt;&lt;</span> Service Discovery <span className="text-success">&gt;&gt;</span>
        </h1>
        <p className="lead text-muted">Uncover the perfect mix of services to elevate your business strategy and digital presence.</p>
      </div>

      {/* Image + Description */}
      <div className="row align-items-center g-5">
        <div className="col-lg-6">
          <img
            src={discoveryImg}
            alt="Service Discovery"
            className="img-fluid rounded shadow-sm"
          />
        </div>

        <div className="col-lg-6">
          <h2 className="h4 mb-3">How It Works</h2>
          <ol className="text-muted ps-3">
            <li className="mb-2">✅ Initial Consultation & Needs Assessment</li>
            <li className="mb-2">✅ Industry and Competitor Analysis</li>
            <li className="mb-2">✅ Tailored Service Roadmap Creation</li>
            <li className="mb-2">✅ Goal-Based Budget Planning</li>
            <li className="mb-2">✅ Ongoing Optimization Recommendations</li>
          </ol>

          <Link to="/contact" className="btn btn-success btn-lg mt-4">
            🔍 Get Started with Discovery
          </Link>
        </div>
      </div>

      {/* Value Section */}
      <div className="mt-5 bg-light p-4 rounded shadow-sm">
        <h3 className="mb-3">Why Choose Discovery First?</h3>
        <p className="text-muted">
          Many businesses jump straight into execution without a clear understanding of their market. Our Discovery process ensures you get a data-backed, custom roadmap aligned with your brand goals — saving you time, money, and confusion.
        </p>
      </div>
    </div>
  );
};

export default ServiceDiscoveryPage;
