import { Container, Card, Row, Col } from 'react-bootstrap';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

const Verification = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0 p-5 text-center">
              <div className="mb-4 text-start">
                <Link to="/forgot" className="text-muted small text-decoration-none d-flex align-items-center gap-2 mb-3">
                  <i className="bi bi-arrow-left"></i> Back
                </Link>
                <h2 className="fw-bold text-navy">Verification</h2>
                <p className="text-muted">You've received a 4-digit code in your email address to reset your password.</p>
              </div>

              <div className="d-flex justify-content-center gap-3 mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    className="form-control text-center fw-bold fs-4"
                    style={{ width: '60px', height: '60px', borderColor: '#e1e5eb' }}
                  />
                ))}
              </div>

              <Button className="w-100 py-2 mb-3" as={Link} to="/reset-success">Verify OTP</Button>
              <p className="small text-muted">Didn't receive code? <a href="#" className="text-teal text-decoration-none fw-bold">Resend OTP</a></p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Verification;
