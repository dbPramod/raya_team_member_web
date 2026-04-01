import { Form } from 'react-bootstrap';

const Input = ({ label, type = 'text', placeholder, className, ...props }) => {
  return (
    <Form.Group className="mb-3 text-start">
      {label && <Form.Label className="fw-medium small text-dark mb-2">{label}</Form.Label>}
      <Form.Control 
        type={type} 
        placeholder={placeholder} 
        className={`bg-white border py-2 ps-3 shadow-none ${className}`} 
        style={{ borderRadius: '6px', borderColor: '#e2e8f0', fontSize: '0.95rem' }}
        {...props} 
      />
    </Form.Group>
  );
};

export default Input;
