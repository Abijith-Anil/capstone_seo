import React from 'react';
import { Link } from 'react-router-dom';
import Baseline from '../assets/images/Baseline.png'; 
import Tera from '../assets/images/Tera.png'; 
import luminaTech from '../assets/images/lumaniaTech.png'; 
import SoruMag from '../assets/images/SoruMag.png';    
import '../App.css';


const ServiceDiscoveryPage = () => (
  <div className="container work-section">
    <h1 className="things-we-do">
      <span className="arrow-left"></span> Our Work <span className="arrow-right"></span>
    </h1>
    <div className="row g-4">
      <div className="col-md-6">
        <div className="work-item" onClick={() => window.location.href = 'https://tera-design.com'}>
          <img src={Tera} alt="Tera Design" className="img-fluid rounded work-image-placeholder" />
          <p className="work-title">tera Design, 2024</p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="work-item" onClick={() => window.location.href = 'https://baseline.com'}>
          <img src={Baseline} alt="Baseline" className="img-fluid rounded work-image-placeholder" />
          <p className="work-title">Baseline, 2023</p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="work-item" onClick={() => window.location.href = 'https://soru-mag.com'}>
          <img src={SoruMag} alt="SORU MAG" className="img-fluid rounded work-image-placeholder" />
          <p className="work-title">SORU MAG, 2024</p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="work-item" onClick={() => window.location.href = 'https://luminatech.com'}>
          <img src={luminaTech} alt="LuminaTech" className="img-fluid rounded work-image-placeholder" />
          <p className="work-title">LuminaTech, 2024</p>
        </div>
      </div>
    </div>
  </div>
);

export default ServiceDiscoveryPage;