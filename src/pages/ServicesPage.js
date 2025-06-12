import { Link } from 'react-router-dom';
import serviceImg from '../assets/images/serviceimg.png';
import '../App.css';

const ServicesPage = () => (
  <div className="container py-5">
    <div className="text-center mb-5">
      <h1 className="fw-bold display-5">
        <span className="text-primary">&lt;&lt;</span> THINGS WE DO <span className="text-primary">&gt;&gt;</span>
      </h1>
      <p className="lead text-muted">Empowering brands through smart, scalable digital marketing strategies.</p>
    </div>

    <div className="row align-items-center g-5">
      <div className="col-lg-5">
        <img src={serviceImg} alt="Phone displaying content" className="img-fluid rounded shadow" />
      </div>

      <div className="col-lg-7">
        <div className="row row-cols-1 row-cols-md-2 g-4">

          {/* SEO */}
          <div className="col">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title"><i className="bi bi-graph-up-arrow text-primary me-2"></i>SEO</h5>
                <p className="card-text text-muted flex-grow-1">Improve visibility on search engines and attract converting traffic.</p>
                <Link to="/services/seo" className="btn btn-outline-primary mt-2">Learn More</Link>
              </div>
            </div>
          </div>

          {/* Service Discovery */}
          <div className="col">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title"><i className="bi bi-search text-success me-2"></i>Service Discovery</h5>
                <p className="card-text text-muted flex-grow-1">Explore customized services built for your specific goals.</p>
                <Link to="/services/discovery" className="btn btn-outline-success mt-2">Learn More</Link>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="col">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title"><i className="bi bi-instagram text-danger me-2"></i>Social Media Marketing</h5>
                <p className="card-text text-muted flex-grow-1">Grow and engage your audience on all major platforms.</p>
                <Link to="/services/social-media" className="btn btn-outline-danger mt-2">Learn More</Link>
              </div>
            </div>
          </div>

          {/* Email Marketing */}
          <div className="col">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title"><i className="bi bi-envelope-paper-fill text-info me-2"></i>Email Marketing</h5>
                <p className="card-text text-muted flex-grow-1">Send engaging, targeted emails to keep clients in the loop.</p>
                <Link to="/services/email-marketing" className="btn btn-outline-info mt-2">Learn More</Link>
              </div>
            </div>
          </div>

          {/* Strategy */}
          <div className="col">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title"><i className="bi bi-lightning-charge-fill text-warning me-2"></i>Strategy</h5>
                <p className="card-text text-muted flex-grow-1">We craft long-term plans aligned with your mission and KPIs.</p>
                <Link to="/services/strategy" className="btn btn-outline-warning mt-2">Learn More</Link>
              </div>
            </div>
          </div>

          {/* Custom Solutions */}
          <div className="col">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title"><i className="bi bi-puzzle-fill text-secondary me-2"></i>Custom Solutions</h5>
                <p className="card-text text-muted flex-grow-1">We tailor our offerings to meet your business’s exact needs.</p>
                <Link to="/services/custom" className="btn btn-outline-secondary mt-2">Learn More</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
);

export default ServicesPage;