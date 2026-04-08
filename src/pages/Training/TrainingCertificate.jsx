import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import appLogo from '../../assets/images/applogo.png';
import certificateBg from '../../assets/svg/Certificate_bg.svg';

const TrainingCertificate = () => {
    const navigate = useNavigate();

    return (
        <Container fluid className="px-lg-5 py-4 min-vh-100 d-flex flex-column bg-white certificate-container">
            {/* Header with Back Arrow */}
            <div className="d-flex align-items-center gap-3 mb-5">
                <button
                    onClick={() => navigate('/training/detail')}
                    className="border-0 bg-transparent p-0 d-flex align-items-center justify-content-center text-dark"
                >
                    <i className="bi bi-arrow-left fs-3" style={{ color: '#0f1d3a' }}></i>
                </button>
                <h3 className="fw-bold mb-0" style={{ fontSize: '1.38rem', color: '#0f1d3a', letterSpacing: '-0.02em' }}>Workplace Safety Basics Certificate</h3>
            </div>

            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center py-3 py-md-4 px-2">
                <h2 className="fw-bold mb-4 mb-md-5 text-center certificate-title" style={{ color: '#0f1d3a' }}>Here&apos;s your certificate!</h2>

                {/* Certificate Card */}
                <div className="certificate-wrapper position-relative p-1" style={{ maxWidth: '900px', width: '100%' }}>
                    <Card className="border-1 p-0 overflow-hidden shadow-lg certificate-card" style={{ borderRadius: '24px', borderColor: '#d9e3f0', minHeight: '550px' }}>
                        <Card.Body className="p-0 position-relative d-flex flex-column align-items-center text-center justify-content-center overflow-hidden">
                            {/* Decorative Background SVG */}
                            <img
                                src={certificateBg}
                                alt=""
                                className="certificate-bg-svg-img"
                            />

                            <div className="position-relative z-1 py-5 px-4 w-100 mt-4 certificate-content-shell">
                                <h4 className="fw-bold mb-1 congratulations-text" style={{ color: '#2c5282', fontSize: '2.2rem', letterSpacing: '-0.02em' }}>Congratulations!</h4>
                                <div className="my-3 my-md-4">
                                    <h1 className="fw-bold mb-0 score-text" style={{ color: '#2c5282', fontSize: '4rem', letterSpacing: '-0.03em' }}>80%</h1>
                                    <p className="text-muted score-label" style={{ fontSize: '1rem' }}>Your score</p>
                                </div>
                                <div className="mt-3 mt-md-4 mb-2 mb-md-3">
                                    <p className="text-muted mb-1 mb-md-2 certify-text" style={{ fontSize: '1.1rem' }}>This is to certify that</p>
                                    <h2 className="fw-bold mb-1 mb-md-2 name-text" style={{ color: '#000', fontSize: '2.45rem', letterSpacing: '-0.02em' }}>Member Name</h2>
                                    <p className="text-muted" style={{ fontSize: '1rem' }}>has successfully completed the course</p>
                                </div>
                                <h4 className="fw-bold mb-4 mb-md-5 course-text" style={{ color: '#000', fontSize: '1.65rem', letterSpacing: '-0.01em' }}>Workplace Safety Basics</h4>

                                <div className="d-flex justify-content-center gap-3 gap-md-5 mt-3 mt-md-4 mb-4 mb-md-5 pb-3 pb-md-4 certificate-meta-row">
                                    <div className="text-start">
                                        <p className="text-muted mb-1 text-uppercase small ls-wide" style={{ fontSize: '0.7rem' }}>Issued Date</p>
                                        <p className="fw-bold mb-0 info-text" style={{ color: '#000', fontSize: '1.1rem', letterSpacing: '0.01em' }}>01/18/2026</p>
                                    </div>
                                    <div className="certificate-meta-divider"></div>
                                    <div className="d-flex flex-column align-items-center">
                                        <p className="text-muted mb-1 text-uppercase small ls-wide" style={{ fontSize: '0.7rem' }}>Issued By</p>
                                        <div className="d-flex align-items-center gap-2">
                                            <img src={appLogo} alt="Swann Ave" height="20" className="mb-1 d-md-inline" />
                                            {/* <span className="fw-bold info-text" style={{ fontSize: '1.1rem', color: '#000', letterSpacing: '0.05em' }}>SWANN AVE</span> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="d-flex gap-3 mt-5">
                    <Button
                        className="px-4 py-2 fw-bold shadow-sm transition-all hover-scale d-flex align-items-center gap-2 certificate-print-btn"
                        style={{ borderRadius: '10px' }}
                        onClick={() => window.print()}
                    >
                        <i className="bi bi-printer"></i>
                        Print Certificate
                    </Button>

                </div>
            </div>

            <style>{`
                .certificate-bg-svg-img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: 0;
                    pointer-events: none;
                    opacity: 0.58;
                }
                .certificate-card {
                    background: linear-gradient(180deg, #ffffff 0%, #fcfdff 100%);
                }
                .certificate-content-shell {
                    max-width: 640px;
                    margin: 0 auto;
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
                .certificate-meta-row {
                    align-items: center;
                }
                .certificate-meta-divider {
                    width: 1px;
                    height: 42px;
                    background: rgba(15, 29, 58, 0.14);
                }
                .certificate-print-btn {
                    background: linear-gradient(180deg, #ffffff 0%, #f6f9ff 100%);
                    border: 1px solid #d3dfef;
                    color: #1e3a5f;
                }
                .hover-scale:hover {
                    transform: scale(1.02);
                    background: linear-gradient(180deg, #40878E 0%, #2f6f74 100%) !important;
                    color: #ffffff !important;
                    border-color: #317474 !important;
                }
                @media print {
                    @page {
                        size: landscape;
                        margin: 0;
                    }

                    html, body {
                        width: 100%;
                        height: 100%;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: #ffffff !important;
                        overflow: hidden !important;
                    }

                    body * {
                        visibility: hidden !important;
                    }

                    .certificate-wrapper,
                    .certificate-wrapper * {
                        visibility: visible !important;
                    }

                    .certificate-container > div:first-child,
                    .certificate-title,
                    .certificate-container .d-flex.gap-3.mt-5 {
                        display: none !important;
                    }

                    .certificate-wrapper {
                        position: fixed !important;
                        top: 50% !important;
                        left: 50% !important;
                        transform: translate(-50%, -50%) !important;
                        width: calc(100vw - 24mm) !important;
                        max-width: calc(100vw - 24mm) !important;
                        max-height: calc(100vh - 24mm) !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                        z-index: 9999 !important;
                    }

                    .certificate-wrapper::after {
                        display: none !important;
                    }

                    .certificate-card,
                    .certificate-card .card-body {
                        height: auto !important;
                        min-height: 0 !important;
                        box-shadow: none !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        color-adjust: exact !important;
                    }

                    .certificate-content-shell {
                        max-width: 700px !important;
                        padding-top: 2.25rem !important;
                        padding-bottom: 2.25rem !important;
                    }

                    .certificate-bg-svg-img {
                        display: block !important;
                        opacity: 0.62 !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }
                h1, h2, h3, h4, p, span {
                    font-family: 'Plus Jakarta Sans', sans-serif !important;
                }
                @media (max-width: 768px) {
                    .certificate-title { font-size: 1.5rem !important; }
                    .congratulations-text { font-size: 1.4rem !important; }
                    .score-text { font-size: 2.5rem !important; }
                    .name-text { font-size: 1.6rem !important; }
                    .course-text { font-size: 1.1rem !important; }
                    .certify-text { font-size: 0.9rem !important; }
                    .info-text { font-size: 0.9rem !important; }
                    .card { min-height: 400px !important; }
                    .ls-wide { letter-spacing: 0.05em; }
                    .certificate-meta-divider { display: none; }
                }
                @media (max-width: 480px) {
                    .certificate-wrapper { padding: 0 !important; }
                    .card { border-radius: 16px !important; }
                    .score-text { font-size: 2rem !important; }
                    .name-text { font-size: 1.3rem !important; }
                    .course-text { font-size: 1rem !important; }
                    .congratulations-text { font-size: 1.2rem !important; }
                }
            `}</style>
        </Container>
    );
};

export default TrainingCertificate;
