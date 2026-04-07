import React, { useState } from 'react';
import Button from './../common/Button';
import FoundationModal from './../common/FoundationModal';

const Footer = () => {
  const [showFoundation, setShowFoundation] = useState(false);

  return (
    <footer className="d-flex justify-content-between align-items-center bg-white px-lg-5 px-4 py-3 border-top border-light border-opacity-75" style={{ zIndex: 10 }}>
      <span className="small text-muted fw-medium py-1">© 2026 Swann Ave. All rights reserved.</span>
      <Button 
        onClick={() => setShowFoundation(true)}
        className="border-0 text-white rounded-pill px-4 shadow-sm fw-medium" 
        size="sm" 
        style={{ background: 'linear-gradient(270deg, #40878E 0%, #19305A 100%)', fontSize: '0.85rem', padding: '6px 14px' }}
      >
        View Foundation
      </Button>

      <FoundationModal 
        show={showFoundation} 
        onHide={() => setShowFoundation(false)} 
      />
    </footer>
  );
};

export default Footer;
