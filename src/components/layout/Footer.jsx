import Button from './../common/Button';

const Footer = () => {
  return (
    <footer className="d-flex justify-content-between align-items-center bg-white px-lg-5 px-4 py-3 border-top border-light border-opacity-75" style={{ zIndex: 10 }}>
      <span className="small text-muted fw-medium py-1">© 2026 Swann Ave. All rights reserved.</span>
      <Button className="border-0 text-white rounded-pill px-4 shadow-sm fw-medium" size="sm" style={{ backgroundColor: '#386375', fontSize: '0.85rem', padding: '6px 16px' }}>View Foundation</Button>
    </footer>
  );
};

export default Footer;
