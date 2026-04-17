import React, { useState } from 'react';
import FoundationModal from './../common/FoundationModal';

const Footer = () => {
  const [showFoundation, setShowFoundation] = useState(false);

  return (
    <footer className="d-flex justify-content-between align-items-center bg-white px-lg-5 px-4 py-3 border-top border-light border-opacity-75" style={{ zIndex: 10 }}>
      <span className="small text-muted fw-medium py-1">© 2026 Swann Ave. All rights reserved.</span>
      <button
        type="button"
        onClick={() => setShowFoundation(true)}
        className="btn text-white rounded-2 shadow-sm fw-medium"
        style={{ background: 'linear-gradient(90deg, var(--color-navy-primary) 0%, var(--color-teal-brand) 100%)', border: '1px solid var(--color-navy-primary)', fontSize: '0.85rem', padding: '6px 14px' }}
      >
        View Foundation
      </button>

      <FoundationModal
        show={showFoundation}
        onHide={() => setShowFoundation(false)}
      />
    </footer>
  );
};

export default Footer;
