import React from 'react';
import { Link } from 'react-router-dom';
import strategyImg from '../../assets/images/strategy.png';

const StrategyPage = () => {
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">
          <span className="text-warning">&lt;&lt;</span> Digital Strategy <span className="text-warning">&gt;&gt;</span>
        </h1>
        <p className="lead text-muted">
          Build a roadmap for success. We help you align digital initiatives with long-term business goals.
        </p>
      </div>

      {/* Main Content */}
      <div className="row align-items-center g-5">
        <div className="col-lg-6">
          <img
            src={strategyImg}
            alt="Strategy Planning Illustration"
            className="img-fluid rounded shadow-sm"
          />
        </div>

        <div className="col-lg-6">
          <h2 className="h4 mb-3">Our Strategic Services</h2>
          <ul className="text-muted ps-3">
            <li className="mb-2">📌 Market & competitor research</li>
            <li className="mb-2">🎯 Goal-setting & KPI development</li>
            <li className="mb-2">🔍 Audit of current digital assets</li>
            <li className="mb-2">🧭 Multi-channel strategy design</li>
            <li className="mb-2">📈 Reporting frameworks & optimization plans</li>
          </ul>

          <Link to="/contact" className="btn btn-warning btn-lg mt-4 text-white">
            🧠 Plan With Us
          </Link>
        </div>
      </div>

      {/* Value Section */}
      <div className="mt-5 bg-light p-4 rounded shadow-sm">
        <h3 className="mb-3">Why Strategy Matters</h3>
        <p className="text-muted">
          Without a clear plan, digital marketing becomes guesswork. We give your business structure, focus, and a competitive edge with strategies that are both visionary and actionable.
        </p>
      </div>
    </div>
  );
};

export default StrategyPage;
