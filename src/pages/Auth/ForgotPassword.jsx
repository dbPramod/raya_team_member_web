import { Container, Card, Row, Col } from 'react-bootstrap';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0 p-5 text-center">
              <div className="mb-4">
                 <Link to="/login" className="text-muted small text-decoration-none d-flex align-items-center gap-2 mb-3">
                    <i className="bi bi-arrow-left"></i> Back
                 </Link>
                 <h2 className="fw-bold text-navy">Forgot password?</h2>
                 <p className="text-muted">Enter your email address and we'll send you a link to reset your password.</p>
              </div>
              <Input label="Email" type="email" placeholder="email@example.com" />
              <Button className="w-100 py-2 mt-3" as={Link} to="/verification">Proceed</Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;
