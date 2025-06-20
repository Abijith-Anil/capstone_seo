import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="py-5 pt-5 pb-3 bg-light border-top">
            <div className="container py-5">
                <div className="row align-items-center text-center text-md-start">

                    <div className="col-md-4 mb-4 mb-md-0">
                        <h5 className="fw-bold text-uppercase">Beyond Boundaries</h5>
                        <p className="small mb-0">&copy; {new Date().getFullYear()} All rights reserved.</p>
                    </div>

                    <div className="col-md-4 mb-4 mb-md-0 text-center">
                        <h5 className="fw-bold text-uppercase">Quick Links</h5>
                        <ul className="list-unstyled d-flex justify-content-center justify-content-md-center gap-3 mb-0">
                            <li><Link className="text-decoration-none small" to="/about">About</Link></li>
                            <li><Link className="text-decoration-none small" to="/services">Services</Link></li>
                            <li><Link className="text-decoration-none small" to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-4 text-center text-md-end">
                        <h5 className="fw-bold text-uppercase">Connect</h5>
                        <div className="d-flex justify-content-center justify-content-md-end gap-3">
                            <a href="#" className=""><i className="bi bi-facebook"></i></a>
                            <a href="#" className=""><i className="bi bi-twitter"></i></a>
                            <a href="#" className=""><i className="bi bi-linkedin"></i></a>
                            <a href="#" className=""><i className="bi bi-envelope-fill"></i></a>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
