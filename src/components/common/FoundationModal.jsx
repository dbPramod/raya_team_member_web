import React from 'react';
import { Modal } from 'react-bootstrap';

const FoundationModal = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      contentClassName="border-0 shadow-lg"
      style={{ borderRadius: '16px' }}
    >
      <div className="position-relative p-4 p-md-5">
        <button
          type="button"
          className="btn-close position-absolute top-0 end-0 m-4 shadow-none border-0"
          onClick={onHide}
          aria-label="Close"
          style={{ fontSize: '0.9rem' }}
        ></button>

        <div className="text-center mb-5">
          <h3 className="fw-bold text-dark" style={{ fontSize: '1.75rem', letterSpacing: '-0.02em' }}>
            Your Business Foundations
          </h3>
        </div>

        <div className="space-y-4">
          {/* Mission */}
          <div className="mb-5 pb-4 border-bottom border-light">
            <h6 className="text-uppercase fw-bold text-muted mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
              Mission
            </h6>
            <p className="text-dark mb-0 lh-lg" style={{ fontSize: '1rem', fontWeight: '450' }}>
              To provide professional beauty and grooming services in a clean, welcoming, and comfortable environment, delivered by skilled staff using high-quality products, while ensuring customer satisfaction and long-term relationships.
            </p>
          </div>

          {/* Vision */}
          <div className="mb-5 pb-4 border-bottom border-light">
            <h6 className="text-uppercase fw-bold text-muted mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
              Vision
            </h6>
            <p className="text-dark mb-0 lh-lg" style={{ fontSize: '1rem', fontWeight: '450' }}>
              To be a trusted beauty and wellness destination that enhances confidence and well-being through exceptional service, modern techniques, and consistent quality.
            </p>
          </div>

          {/* Values */}
          <div className="">
            <h6 className="text-uppercase fw-bold text-muted mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
              Values
            </h6>
            <div className="text-dark mb-0 lh-lg" style={{ fontSize: '1rem', fontWeight: '450' }}>
              <p className="mb-3">
                <span className="fw-bold">Customer First:</span> Every service is delivered with care, respect, and attention to individual needs.
              </p>
              <p className="mb-0">
                <span className="fw-bold">Quality & Hygiene:</span> We follow strict hygiene standards and use reliable, premium products.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .modal-content {
          border-radius: 12px !important;
          overflow: hidden;
        }
        .btn-close:focus {
          box-shadow: none;
        }
        @media (max-width: 576px) {
          .modal-content {
            margin: 1rem;
          }
        }
      `}} />
    </Modal>
  );
};

export default FoundationModal;
