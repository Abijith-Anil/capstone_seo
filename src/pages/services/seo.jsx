import React from 'react';
import { Link } from 'react-router-dom';
import seoImage from '../../assets/images/seo.png';

const SEOServicePage = () => {
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">
          <span className="text-primary">&lt;&lt;</span> Search Engine Optimization <span className="text-primary">&gt;&gt;</span>
        </h1>
        <p className="lead text-muted">Increase your visibility and attract high-converting organic traffic with our comprehensive SEO solutions.</p>
      </div>

      {/* Image + Content */}
      <div className="row align-items-center g-5">
        <div className="col-lg-6">
          <img
            src={seoImage}
            alt="SEO Illustration"
            className="img-fluid rounded shadow-sm"
          />
        </div>

        <div className="col-lg-6">
          <h2 className="h4 mb-3">What We Offer</h2>
          <ul className="list-unstyled text-muted">
            <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> Keyword Research & Strategy</li>
            <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> Technical SEO Audits</li>
            <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> On-Page Optimization</li>
            <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> Content Planning & Optimization</li>
            <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> Link Building Campaigns</li>
            <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> SEO Reporting & Analytics</li>
          </ul>

          <Link to="/contact" className="btn btn-primary btn-lg mt-4">🚀 Start Your SEO Journey</Link>
        </div>
      </div>

      {/* Extra Section */}
      <div className="mt-5 bg-light p-4 rounded shadow-sm">
        <h3 className="mb-3">Why SEO Matters</h3>
        <p className="text-muted">
          SEO is not just about ranking higher in search engines. It’s about delivering the right content to the right audience at the right time.
          We help your brand grow organically, ensuring long-term success and trust.
        </p>
      </div>
    </div>
  );
};

export default SEOServicePage;
