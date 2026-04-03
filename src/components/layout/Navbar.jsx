import { Container, Navbar as BsNavbar, Nav, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <BsNavbar bg="white" expand="lg" className="px-4 py-3 border-bottom border-light">
      <Form className="d-none d-md-flex flex-grow-1 max-w-400">
        <div className="position-relative w-100" style={{ maxWidth: '400px' }}>
          <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
          <FormControl
            type="search"
            placeholder="Search..."
            className="ps-5 bg-white rounded-pill"
            style={{ fontSize: '0.9rem', borderColor: '#e2e8f0', boxShadow: 'none' }}
            aria-label="Search"
          />
        </div>
      </Form>
      
      <Nav className="ms-auto d-flex align-items-center gap-4 pe-2">
        <Nav.Link href="#" className="text-muted p-0"><i className="bi bi-bell text-secondary" style={{ fontSize: '1.2rem' }}></i></Nav.Link>
        <Link to="/settings" className="text-decoration-none d-flex align-items-center gap-2 pointer border-0 bg-transparent p-0">
           <img src="https://i.pravatar.cc/150?u=sapphire" alt="Sapphire Bright" className="rounded-circle border border-2 border-white shadow-sm" width="36" height="36" />
           <div className="d-none d-sm-flex flex-column lh-1 text-start">
             <span className="small fw-semibold text-dark" style={{ fontSize: '0.9rem' }}>Sapphire Bright</span>
             <span className="text-muted" style={{ fontSize: '0.75rem', marginTop: '2px' }}>Role</span>
           </div>
        </Link>
      </Nav>
    </BsNavbar>
  );
};

export default Navbar;
