import React from 'react';
import { Link } from 'react-router-dom';
import customImg from '../../assets/images/custom.png';

const CustomSolutionsPage = () => {
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">
          <span className="text-secondary">&lt;&lt;</span> Custom Solutions <span className="text-secondary">&gt;&gt;</span>
        </h1>
        <p className="lead text-muted">
          No two businesses are alike. That’s why we build marketing strategies that are as unique as your goals.
        </p>
      </div>

      {/* Main Content */}
      <div className="row align-items-center g-5">
        <div className="col-lg-6">
          <img
            src={customImg}
            alt="Custom digital solutions"
            className="img-fluid rounded shadow-sm"
          />
        </div>

        <div className="col-lg-6">
          <h2 className="h4 mb-3">We Deliver What You Actually Need</h2>
          <ul className="text-muted ps-3">
            <li className="mb-2">🧩 Personalized digital marketing plans</li>
            <li className="mb-2">🛠 Website & landing page design</li>
            <li className="mb-2">📱 Platform-specific campaign creation</li>
            <li className="mb-2">🧪 Experimentation & A/B testing setup</li>
            <li className="mb-2">🔁 Ongoing optimization & strategy iteration</li>
          </ul>

          <Link to="/contact" className="btn btn-secondary btn-lg mt-4 text-white">
            🧩 Start Building
          </Link>
        </div>
      </div>

      {/* Value Section */}
      <div className="mt-5 bg-light p-4 rounded shadow-sm">
        <h3 className="mb-3">Built For You, Not Just Anyone</h3>
        <p className="text-muted">
          Every organization has unique challenges. We work alongside your team to understand your market, customers, and objectives—then tailor our toolkit to fit you perfectly.
        </p>
      </div>
    </div>
  );
};

export default CustomSolutionsPage;
