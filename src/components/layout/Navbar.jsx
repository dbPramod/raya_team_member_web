import { Container, Navbar as BsNavbar, Nav, Form, FormControl } from 'react-bootstrap';

const Navbar = () => {
  return (
    <BsNavbar bg="white" expand="lg" className="px-4 py-3 border-bottom border-light">
      <Form className="d-none d-md-flex flex-grow-1 max-w-400">
        <div className="position-relative w-100" style={{ maxWidth: '400px' }}>
          <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
          <FormControl
            type="search"
            placeholder="Search training..."
            className="ps-5 bg-light border-0 rounded-pill"
            aria-label="Search"
          />
        </div>
      </Form>
      
      <Nav className="ms-auto d-flex align-items-center gap-3">
        <Nav.Link href="#" className="text-muted"><i className="bi bi-bell fs-5"></i></Nav.Link>
        <Nav.Link href="#" className="text-muted"><i className="bi bi-question-circle fs-5"></i></Nav.Link>
        <div className="d-flex align-items-center gap-2 ms-2 p-1 pe-3 rounded-pill bg-light">
           <img src="https://i.pravatar.cc/150?u=me" alt="user" className="rounded-circle" width="32" height="32" />
           <span className="small fw-bold text-dark d-none d-sm-inline">Dinesh B</span>
        </div>
      </Nav>
    </BsNavbar>
  );
};

export default Navbar;
