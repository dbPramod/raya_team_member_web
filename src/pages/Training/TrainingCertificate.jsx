import React from 'react';
import { Modal } from 'react-bootstrap';
import { STRINGS } from '../../constants/strings';

const TrainingCertificate = ({ show, onHide, certificateData }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size="lg"
            className="training-certificate-modal"
        >
            <div className="modal-content overflow-hidden border-0" style={{ borderRadius: '24px' }}>
                <div className="certificate-content">
                    <div className="certificate-border"></div>
                    <div className="certificate-logo">
                        <img src="/logo192.png" alt="Logo" height="40" />
                    </div>
                    <h2 className="certificate-title">Certificate of Completion</h2>
                    <p className="mb-1">This is to certify that</p>
                    <div className="certificate-recipient">{certificateData?.userName || 'Team Member'}</div>
                    <p className="mb-4">has successfully completed the training course</p>
                    <div className="certificate-course fw-bold text-dark">{certificateData?.courseName || 'Professional Development'}</div>
                    
                    <div className="certificate-footer">
                        <div className="footer-item">
                            <div className="footer-label">ISSUED ON</div>
                            <div className="footer-value">{certificateData?.completionDate || 'April 14, 2026'}</div>
                        </div>
                        <div className="footer-item">
                            <div className="footer-label">CERTIFICATE ID</div>
                            <div className="footer-value">{certificateData?.id || 'SAV-TR-8821'}</div>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-white text-center border-top">
                    <button className="btn btn-primary px-4 me-2" style={{ backgroundColor: 'var(--color-teal-brand)', borderColor: 'var(--color-teal-brand)' }}>
                        Download PDF
                    </button>
                    <button className="btn btn-outline-secondary px-4" onClick={onHide}>
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default TrainingCertificate;
