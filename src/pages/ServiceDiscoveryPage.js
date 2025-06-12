import React from 'react';
import { Link } from 'react-router-dom';

import Addidas from '../assets/images/Addidas.png';
import Puma from '../assets/images/Puma.png';
import Nike from '../assets/images/Nike.png';
import underarmour from '../assets/images/UnderArmour.png';
import '../App.css';

const ServiceDiscoveryPage = () => (
  <div className="container py-5">
    <div className="text-center mb-5">
      <h1 className="display-5 fw-bold">
        <span className="text-primary">&lt;&lt;</span> Our Work <span className="text-primary">&gt;&gt;</span>
      </h1>
      <p className="lead text-muted">Brands we've proudly collaborated with on innovative marketing campaigns.</p>
    </div>

    <div className="row g-4">

      {/* Adidas */}
      <div className="col-md-6 col-lg-4">
        <Link to="/companies/adidas" className="text-decoration-none text-reset">
          <div className="card h-100 shadow-sm border-0 work-card" role="button">
            <img src={Addidas} alt="Adidas Project" className="card-img-top rounded-top" />
            <div className="card-body">
              <h5 className="card-title fw-semibold">Adidas</h5>
              <p className="card-text text-muted">2025 — Digital ad campaign boosting urban streetwear visibility.</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Puma */}
      <div className="col-md-6 col-lg-4">
        <Link to="/companies/puma" className="text-decoration-none text-reset">
          <div className="card h-100 shadow-sm border-0 work-card" role="button">
            <img src={Puma} alt="Puma Project" className="card-img-top rounded-top" />
            <div className="card-body">
              <h5 className="card-title fw-semibold">Puma</h5>
              <p className="card-text text-muted">2023 — Social media strategy targeting Gen-Z lifestyle enthusiasts.</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Nike */}
      <div className="col-md-6 col-lg-4">
        <Link to="/companies/nike" className="text-decoration-none text-reset">
          <div className="card h-100 shadow-sm border-0 work-card" role="button">
            <img src={Nike} alt="Nike Project" className="card-img-top rounded-top" />
            <div className="card-body">
              <h5 className="card-title fw-semibold">Nike</h5>
              <p className="card-text text-muted">2024 — Performance-focused email marketing to increase loyalty.</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Under Armour */}
      <div className="col-md-6 col-lg-4">
        <Link to="/companies/underarmour" className="text-decoration-none text-reset">
          <div className="card h-100 shadow-sm border-0 work-card" role="button">
            <img src={underarmour} alt="Under Armour Project" className="card-img-top rounded-top" />
            <div className="card-body">
              <h5 className="card-title fw-semibold">Under Armour</h5>
              <p className="card-text text-muted">2024 — Full-funnel campaign for winter athletic gear in Canada.</p>
            </div>
          </div>
        </Link>
      </div>

    </div>
  </div>
);

export default ServiceDiscoveryPage;