import { Form } from 'react-bootstrap';

const Input = ({ label, type = 'text', placeholder, className, error, ...props }) => {
  return (
    <Form.Group className="mb-3 text-start">
      {label && <Form.Label className="fw-medium small text-dark mb-2">{label}</Form.Label>}
      <Form.Control 
        type={type} 
        placeholder={placeholder} 
        className={`bg-white border py-2 ps-3 shadow-none ${className || ''}`} 
        style={{ borderRadius: '6px', borderColor: 'var(--color-gray-light)', fontSize: '0.95rem' }}
        isInvalid={!!error}
        {...props} 
      />
      {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
    </Form.Group>
  );
};

export default Input;
