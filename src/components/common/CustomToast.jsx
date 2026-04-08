import React from 'react';

const CustomToast = ({ show, title, message, variant = 'info', onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={`custom-toast custom-toast-${variant}`} role="status" aria-live="polite">
      <div className="custom-toast-icon">
        <i className={`bi ${variant === 'success' ? 'bi-check2-circle' : variant === 'error' ? 'bi-x-circle' : 'bi-info-circle'}`}></i>
      </div>
      <div className="custom-toast-body">
        <div className="custom-toast-title">{title}</div>
        {message ? <div className="custom-toast-message">{message}</div> : null}
      </div>
      <button type="button" className="custom-toast-close" onClick={onClose} aria-label="Close notification">
        <i className="bi bi-x-lg"></i>
      </button>
    </div>
  );
};

export default CustomToast;
