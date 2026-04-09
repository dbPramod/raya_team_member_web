import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TermsConditions = () => {
    const navigate = useNavigate();

    const sections = [
        {
            title: '1. Acceptance of Terms',
            body: 'By accessing or using this application, you agree to follow these Terms & Conditions and all applicable laws. If you do not agree, please stop using the application.'
        },
        {
            title: '2. User Account Responsibilities',
            body: 'You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.'
        },
        {
            title: '3. Acceptable Use',
            body: 'You agree not to misuse the platform, attempt unauthorized access, interfere with service performance, or upload harmful or unlawful content.'
        },
        {
            title: '4. Intellectual Property',
            body: 'All platform content, branding, and software are owned by the company or its licensors. You may not copy, modify, or distribute content without permission.'
        },
        {
            title: '5. Service Availability',
            body: 'We may update, suspend, or discontinue parts of the service at any time to improve reliability, performance, or security.'
        },
        {
            title: '6. Limitation of Liability',
            body: 'To the maximum extent allowed by law, we are not liable for indirect, incidental, or consequential damages arising from use of the platform.'
        },
        {
            title: '7. Changes to Terms',
            body: 'These terms may be updated from time to time. Continued use after updates means you accept the revised terms.'
        },
        {
            title: '8. Contact',
            body: 'For questions regarding these terms, please contact your administrator or support team.'
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
                <h2 className="fw-bold m-0" style={{ color: '#0f1d3a' }}>Terms & Conditions</h2>
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

export default TermsConditions;
