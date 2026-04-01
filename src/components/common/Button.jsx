import { Button as BsButton } from 'react-bootstrap';

const Button = ({ children, className, variant = 'primary', ...props }) => {
  const btnClass = variant === 'primary' ? 'bg-teal text-white border-0' : 'btn-outline-teal';
  return (
    <BsButton 
      className={`px-4 py-2 fw-semibold transition-all shadow-sm ${btnClass} ${className}`} 
      style={variant === 'primary' ? { backgroundColor: '#3d8b8b', borderRadius: '6px' } : { borderRadius: '6px' }}
      {...props}
    >
      {children}
    </BsButton>
  );
};

export default Button;
