import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import appLogo from '../../assets/images/applogo.png';

const TrainingCertificate = () => {
    const navigate = useNavigate();

    return (
        <Container fluid className="px-lg-5 py-4 vh-100 d-flex flex-column bg-white overflow-auto certificate-container">
            {/* Header with Back Arrow */}
            <div className="d-flex align-items-center gap-3 mb-5">
                <button
                    onClick={() => navigate('/training/detail')}
                    className="border-0 bg-transparent p-0 d-flex align-items-center justify-content-center text-dark"
                >
                    <i className="bi bi-arrow-left fs-3" style={{ color: '#0f1d3a' }}></i>
                </button>
                <h3 className="fw-bold mb-0" style={{ fontSize: '1.4rem', color: '#0f1d3a', letterSpacing: '-0.02em' }}>Workplace Safety Basics Certificate</h3>
            </div>

            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center py-4">
                <h2 className="fw-bold mb-5 text-center" style={{ color: '#0f1d3a' }}>Here’s your certificate!</h2>

                {/* Certificate Card */}
                <div className="certificate-wrapper position-relative p-1" style={{ maxWidth: '900px', width: '100%' }}>
                    <Card className="border-1 p-0 overflow-hidden shadow-lg" style={{ borderRadius: '24px', borderColor: '#0f1d3a', minHeight: '550px' }}>
                        <Card.Body className="p-0 position-relative d-flex flex-column align-items-center text-center justify-content-center">

                            {/* Decorative Background Elements */}
                            <div className="certificate-bg-left"></div>
                            <div className="certificate-bg-right"></div>

                            <div className="position-relative z-1 py-5 px-4 w-100 mt-4">
                                <h4 className="fw-bold mb-1" style={{ color: '#2c5282', fontSize: '2rem' }}>Congratulations!</h4>

                                <div className="my-4">
                                    <h1 className="fw-bold mb-0" style={{ color: '#2c5282', fontSize: '3.5rem' }}>80%</h1>
                                    <p className="text-muted" style={{ fontSize: '1rem' }}>Your score</p>
                                </div>

                                <div className="mt-4 mb-3">
                                    <p className="text-muted mb-2" style={{ fontSize: '1.1rem' }}>This is to certify that</p>
                                    <h2 className="fw-bold mb-2" style={{ color: '#000', fontSize: '2.2rem' }}>Member Name</h2>
                                    <p className="text-muted" style={{ fontSize: '1rem' }}>has successfully completed the course</p>
                                </div>

                                <h4 className="fw-bold mb-5" style={{ color: '#000', fontSize: '1.5rem' }}>Workplace Safety Basics</h4>

                                <div className="d-flex justify-content-center gap-5 mt-4 mb-5 pb-4">
                                    <div>
                                        <p className="text-muted mb-1 text-uppercase small ls-wide">Issued Date</p>
                                        <p className="fw-bold mb-0" style={{ color: '#000', fontSize: '1.1rem' }}>01/18/2026</p>
                                    </div>
                                    <div className="d-flex flex-column align-items-center">
                                        <p className="text-muted mb-2 text-uppercase small ls-wide">Issued By</p>
                                        <div className="d-flex align-items-center gap-2">
                                            <img src={appLogo} alt="Swann Ave" height="28" className="mb-1" />
                                            <span className="fw-bold" style={{ fontSize: '1.3rem', color: '#000', letterSpacing: '0.05em' }}>SWANN AVE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="d-flex gap-3 mt-5">
                    <Button
                        variant="outline-secondary"
                        className="px-4 py-2 fw-bold shadow-sm transition-all hover-scale d-flex align-items-center gap-2"
                        style={{ borderRadius: '10px', borderColor: '#dee2e6' }}
                        onClick={() => window.print()}
                    >
                        <i className="bi bi-printer"></i>
                        Print Certificate
                    </Button>
                    <Button
                        className="px-5 py-2 fw-bold border-0 shadow-sm transition-all hover-scale"
                        style={{ backgroundColor: '#3d8b8b', borderRadius: '10px' }}
                        onClick={() => navigate('/training')}
                    >
                        View Foundation
                    </Button>
                </div>
            </div>

            <style>{`
                .ls-wide {
                    letter-spacing: 0.1em;
                }
                .certificate-bg-left {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 40%;
                    height: 100%;
                    background: radial-gradient(circle at 0% 50%, rgba(68, 139, 139, 0.08) 0%, transparent 70%);
                    z-index: 0;
                    pointer-events: none;
                }
                .certificate-bg-right {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 40%;
                    height: 100%;
                    background: radial-gradient(circle at 100% 50%, rgba(243, 235, 222, 0.6) 0%, transparent 70%);
                    z-index: 0;
                    pointer-events: none;
                }
                .certificate-wrapper::after {
                   content: '';
                   position: absolute;
                   top: 20px;
                   left: 20px;
                   right: 20px;
                   bottom: 20px;
                   border: 1px solid rgba(15, 29, 58, 0.05);
                   border-radius: 12px;
                   pointer-events: none;
                   z-index: 2;
                }
                .hover-scale:hover {
                    transform: scale(1.02);
                    background-color: #317474 !important;
                }
                @media print {
                    @page {
                        size: landscape;
                        margin: 0;
                    }
                    /* Hide ALL elements by default */
                    html, body, #root, #root > div, div, section, main, header, footer, nav, aside {
                        visibility: hidden !important;
                        height: auto !important;
                        overflow: visible !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        border: none !important;
                        background: none !important;
                    }
                    
                    /* Show ONLY the certificate container and its children */
                    .certificate-container, .certificate-container div, .certificate-container span, .certificate-container h1, .certificate-container h2, .certificate-container h3, .certificate-container h4, .certificate-container p, .certificate-container img {
                        visibility: visible !important;
                    }
                    
                    /* Position the certificate to fill the page */
                    .certificate-container {
                        visibility: visible !important;
                        display: flex !important;
                        position: fixed !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 100vw !important;
                        height: 100vh !important;
                        justify-content: center !important;
                        align-items: center !important;
                        background: white !important;
                        z-index: 9999 !important;
                    }
                    
                    .certificate-wrapper {
                        visibility: visible !important;
                        width: 90% !important;
                        max-width: 1000px !important;
                        margin: 0 auto !important;
                        transform: scale(1.05) !important; /* Slightly scale up for better fit */
                        transform-origin: center !important;
                    }
                    
                    .card {
                        visibility: visible !important;
                        border: 2px solid #0f1d3a !important;
                        border-radius: 24px !important;
                        background-color: #fff !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        box-shadow: none !important;
                    }
                    
                    /* Ensure background graphics are preserved */
                    .certificate-bg-left, .certificate-bg-right {
                        visibility: visible !important;
                        display: block !important;
                        print-color-adjust: exact !important;
                        -webkit-print-color-adjust: exact !important;
                    }
                }
                h1, h2, h3, h4, p, span {
                    font-family: 'Plus Jakarta Sans', sans-serif !important;
                }
            `}</style>
        </Container>
    );
};

export default TrainingCertificate;
