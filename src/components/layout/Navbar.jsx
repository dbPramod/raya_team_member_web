import { Container, Navbar as BsNavbar, Nav, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = ({ onToggleSidebar }) => {
  return (
    <BsNavbar bg="white" className="px-3 py-3 border-bottom border-light d-flex flex-row flex-nowrap align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <button
          className="btn btn-link text-dark p-0 me-3 d-lg-none flex-shrink-0"
          onClick={onToggleSidebar}
        >
          <i className="bi bi-list fs-2"></i>
        </button>
        <Form className="d-none d-lg-flex flex-grow-1" style={{ width: '450px' }}>
          <div className="position-relative w-100">
            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3" style={{ color: '#94a3b8', fontSize: '1.05rem' }}></i>
            <FormControl
              type="search"
              placeholder="Search..."
              className="ps-5 bg-white shadow-none"
              style={{ fontSize: '0.95rem', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '0.7rem 1rem', color: '#334155' }}
              aria-label="Search"
            />
          </div>
        </Form>
      </div>

      <Nav className="ms-auto d-flex flex-row flex-nowrap align-items-center gap-3 pe-2">
        <Link
          to="/notifications"
          className="d-flex align-items-center justify-content-center text-decoration-none bg-white"
          style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1.5px solid #40878E', color: '#40878E', transition: 'all 0.2s', flexShrink: 0 }}
        >
          <i className="bi bi-bell" style={{ fontSize: '1.3rem' }}></i>
        </Link>
        <Link to="/settings" className="text-decoration-none d-flex align-items-center gap-2 pointer border-0 bg-transparent p-0 ms-1">
          <img src="https://i.pravatar.cc/150?u=sapphire" alt="Sapphire Bright" className="rounded-circle border border-2 border-white shadow-sm" width="42" height="42" />
          <div className="d-none d-sm-flex flex-column lh-1 text-start">
            <span className="fw-semibold text-dark" style={{ fontSize: '0.95rem' }}>Sapphire Bright</span>
            <span className="text-muted" style={{ fontSize: '0.8rem', marginTop: '4px' }}>Role</span>
          </div>
        </Link>
      </Nav>
    </BsNavbar>
  );
};

export default Navbar;
