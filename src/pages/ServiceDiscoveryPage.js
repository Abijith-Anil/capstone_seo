import React from 'react';
import { Link } from 'react-router-dom';
import Addidas from '../assets/images/Addidas.png'; 
import Puma from '../assets/images/Puma.png'; 
import Nike from '../assets/images/Nike.png'; 
import underarmour from '../assets/images/UnderArmour.png';    
import '../App.css';


const ServiceDiscoveryPage = () => (
  <div className="container work-section">
    <h1 className="things-we-do">
      <span className="arrow-left"></span> Our Work <span className="arrow-right"></span>
    </h1>
    <div className="row g-4">
      <div className="col-md-6">
        <div className="work-item" onClick={() => window.location.href = 'https://www.adidas.ca/en'}>
          <img src={Addidas} alt="Addidas" className="img-fluid rounded work-image-placeholder" />
          <p className="work-title">Addidas, 2025</p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="work-item" onClick={() => window.location.href = 'https://ca.puma.com/ca/en'}>
          <img src={Puma} alt="Puma" className="img-fluid rounded work-image-placeholder" />
          <p className="work-title">Puma, 2023</p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="work-item" onClick={() => window.location.href = 'https://www.nike.com/ca/?msockid=2f8578963a62669f29ca6d943b486764'}>
          <img src={Nike} alt="Nike" className="img-fluid rounded work-image-placeholder" />
          <p className="work-title">Nike, 2024</p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="work-item" onClick={() => window.location.href = 'https://www.underarmour.ca/fr-ca/?cid=PS|CA|BR|ggl|all|under+armour|all|all|all|broad|dg|p54551912547&gclid=236e54dcd1bf10a09d6e3c9ecf35aa6b&gclsrc=3p.ds&&cid=PS_OMD_CA_30601_FX4I8FMGFH_58700006012683581_71700000068189469&msclkid=236e54dcd1bf10a09d6e3c9ecf35aa6b'}>
          <img src={underarmour} alt="UnderArmour" className="img-fluid rounded work-image-placeholder" />
          <p className="work-title">Under Armour, 2024</p>
        </div>
      </div>
    </div>
  </div>
);

export default ServiceDiscoveryPage;