import { Container, Row, Col, Card, Form, Badge } from 'react-bootstrap';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Link } from 'react-router-dom';
import loginScreenImg from '../../assets/images/login_screen.png';
import appLogo from '../../assets/images/applogo.png';

const Login = () => {
  return (
    <div className="min-vh-100 py-4 ps-4 pe-0 bg-login-gradient d-flex align-items-center justify-content-center overflow-hidden">
      <Container fluid className="h-100 w-100 pe-0">
        <div className="mb-5 d-flex align-items-center gap-2 position-absolute top-0 start-0 m-4 m-lg-5">
          <img src={appLogo} alt="Swann Ave" height="32" />
        </div>

        <Row className="align-items-center justify-content-between min-vh-75 w-100 g-5 me-0">
          <Col lg={4} className="mx-auto" style={{ maxWidth: '420px' }}>
            <div className="text-start">
              <div className="mb-4 text-center">
                <Badge
                  bg="transparent"
                  text="navy"
                  className="px-3 py-2 fw-semibold mb-4 text-uppercase border"
                  style={{ fontSize: '0.75rem', borderColor: '#0f1d3a', borderRadius: '4px', letterSpacing: '0.5px', color: '#0f1d3a' }}
                >
                  Step 1 of 2
                </Badge>
                <h1 className="fw-bolder mb-2 fs-2" style={{ color: '#0f1d3a' }}>Login</h1>
                <p className="small mb-4" style={{ color: '#6b7280' }}>Log in to manage your tasks and stay productive.</p>
              </div>

              <Form>
                <Input label="Email" type="email" placeholder="Enter email" />

                <div className="mb-2 text-start">
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium small text-dark mb-2">Password</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        className="bg-white border py-2 ps-3 pe-5 shadow-none"
                        style={{ borderRadius: '6px', borderColor: '#e2e8f0', fontSize: '0.95rem' }}
                      />
                      <i className="bi bi-eye-slash position-absolute top-50 end-0 translate-middle-y me-3 text-muted pointer"></i>
                    </div>
                  </Form.Group>
                </div>

                <div className="text-end mb-4">
                  <Link to="/forgot" className="small text-decoration-none fw-medium" style={{ color: '#0056b3' }}>Forgot Password?</Link>
                </div>

                <Form.Group className="mb-4 d-flex align-items-center gap-2">
                  <Form.Check type="checkbox" id="trust-device" className="custom-checkbox" />
                  <Form.Label htmlFor="trust-device" className="small text-muted mb-0 pointer fw-medium">Trust this device for 7 days</Form.Label>
                </Form.Group>

                <Button className="w-100 py-2 mb-4 shadow-sm" style={{ fontSize: '1rem', borderRadius: '4px' }} as={Link} to="/dashboard">Login</Button>
              </Form>
            </div>
          </Col>
          <Col lg={7} className="d-none d-lg-block text-end pe-0 pt-5">
            <img
              src={loginScreenImg}
              alt="Dashboard Preview"
              //className="img-fluid rounded-start shadow-sm"
              style={{ maxHeight: '80vh', objectFit: 'contain', objectPosition: 'right' }}
            />
          </Col>

        </Row>

      </Container>
    </div>
  );
};

export default Login;
