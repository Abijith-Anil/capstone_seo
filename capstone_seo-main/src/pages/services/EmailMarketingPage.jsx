import React from 'react';
import { Link } from 'react-router-dom';
import emailImg from '../../assets/images/email.png';

const EmailMarketingPage = () => {
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">
          <span className="text-info">&lt;&lt;</span> Email Marketing <span className="text-info">&gt;&gt;</span>
        </h1>
        <p className="lead text-muted">
          Deliver personalized messages that drive clicks, conversions, and customer loyalty.
        </p>
      </div>

      {/* Main Content */}
      <div className="row align-items-center g-5">
        <div className="col-lg-6">
          <img
            src={emailImg}
            alt="Email Marketing Illustration"
            className="img-fluid rounded shadow-sm"
          />
        </div>

        <div className="col-lg-6">
          <h2 className="h4 mb-3">What’s Included</h2>
          <ul className="text-muted ps-3">
            <li className="mb-2">✉️ Beautiful, responsive email design</li>
            <li className="mb-2">🎯 Segmented campaigns based on user behavior</li>
            <li className="mb-2">🧪 A/B testing to optimize subject lines & content</li>
            <li className="mb-2">📊 Real-time analytics & click-through tracking</li>
            <li className="mb-2">🔁 Automated workflows for lead nurturing</li>
          </ul>

          <Link to="/contact" className="btn btn-info btn-lg mt-4 text-white">
            ✉️ Book a Free Consultation
          </Link>
        </div>
      </div>

      {/* Impact Section */}
      <div className="mt-5 bg-light p-4 rounded shadow-sm">
        <h3 className="mb-3">Why Email Still Wins</h3>
        <p className="text-muted">
          With a return on investment of over 4000%, email remains one of the most powerful tools for reaching your audience. Our strategies ensure your emails hit the inbox — and make an impact.
        </p>
      </div>
    </div>
  );
};

export default EmailMarketingPage;
