import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    const sections = [
        {
            title: '1. Information We Collect',
            body: 'We may collect profile information, account details, usage activity, and technical data (such as browser and device information) needed to provide and improve the service.'
        },
        {
            title: '2. How We Use Information',
            body: 'Your information is used to operate the platform, personalize your experience, improve features, communicate updates, and maintain security.'
        },
        {
            title: '3. Sharing of Information',
            body: 'We do not sell personal information. Data may be shared with trusted service providers who support platform operations under confidentiality obligations.'
        },
        {
            title: '4. Data Retention',
            body: 'We retain data only for as long as needed for legitimate business and legal purposes, then delete or anonymize it when no longer required.'
        },
        {
            title: '5. Security',
            body: 'We use administrative, technical, and organizational safeguards to protect personal data. No method of transmission or storage is completely secure.'
        },
        {
            title: '6. Your Rights',
            body: 'Depending on your location, you may have rights to access, correct, delete, or restrict processing of your personal information.'
        },
        {
            title: '7. Cookies and Analytics',
            body: 'We may use cookies and similar tools to remember preferences, measure usage, and enhance application performance.'
        },
        {
            title: '8. Policy Updates',
            body: 'We may revise this Privacy Policy periodically. Updates are effective when published in the application.'
        }
    ];

    return (
        <Container fluid className="px-3 px-md-4 py-3 py-md-4 min-vh-100 bg-white">
            <div className="d-flex align-items-center gap-3 mb-4">
                <button
                    type="button"
                    onClick={() => navigate('/settings')}
                    className="border-0 bg-transparent p-0 d-flex align-items-center justify-content-center"
                >
                    <i className="bi bi-arrow-left fs-3" style={{ color: '#0f1d3a' }}></i>
                </button>
                <h2 className="fw-bold m-0" style={{ color: '#0f1d3a' }}>Privacy Policy</h2>
            </div>

            <Card className="border-0 shadow-sm rounded-4 overflow-hidden" style={{ backgroundColor: '#f0f7ff' }}>
                <Card.Body className="p-4 p-md-5">
                    <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                        Effective date: April 9, 2026
                    </p>
                    <div className="d-flex flex-column gap-4">
                        {sections.map((section) => (
                            <div key={section.title}>
                                <h5 className="fw-bold mb-2" style={{ color: '#0f1d3a' }}>{section.title}</h5>
                                <p className="mb-0 text-muted" style={{ lineHeight: '1.8' }}>{section.body}</p>
                            </div>
                        ))}
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PrivacyPolicy;
