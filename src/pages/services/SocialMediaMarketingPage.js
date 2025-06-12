import React from 'react';
import { Link } from 'react-router-dom';
import socialImg from '../../assets/images/social.png';

const SocialMediaMarketingPage = () => {
    return (
        <div className="container py-5">
            {/* Header */}
            <div className="text-center mb-5">
                <h1 className="fw-bold display-5">
                    <span className="text-danger">&lt;&lt;</span> Social Media Marketing <span className="text-danger">&gt;&gt;</span>
                </h1>
                <p className="lead text-muted">
                    Amplify your brand's voice and connect with your audience on the platforms that matter most.
                </p>
            </div>

            {/* Main Content */}
            <div className="row align-items-center g-5">
                <div className="col-lg-6">
                    <img
                        src={socialImg}
                        alt="Social Media Marketing"
                        className="img-fluid rounded shadow-sm"
                    />
                </div>

                <div className="col-lg-6">
                    <h2 className="h4 mb-3">What We Offer</h2>
                    <ul className="text-muted ps-3">
                        <li className="mb-2">📱 Platform-specific content strategies</li>
                        <li className="mb-2">🎯 Targeted ad campaigns for growth</li>
                        <li className="mb-2">📈 Weekly analytics and performance reports</li>
                        <li className="mb-2">💬 Community management & engagement</li>
                        <li className="mb-2">🧠 Influencer partnerships & content calendars</li>
                    </ul>

                    <Link to="/contact" className="btn btn-danger btn-lg mt-4">
                        🚀 Start Growing Today
                    </Link>
                </div>
            </div>

            {/* Impact Section */}
            <div className="mt-5 bg-light p-4 rounded shadow-sm">
                <h3 className="mb-3">Why Social Media Matters</h3>
                <p className="text-muted">
                    With over 4 billion users worldwide, social platforms offer unmatched potential to reach, engage, and convert. Whether you're building awareness or driving sales, our social team ensures your message is heard — and acted on.
                </p>
            </div>
        </div>
    );
};

export default SocialMediaMarketingPage;
