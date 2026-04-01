import { Container, Card, Row, Col } from 'react-bootstrap';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

const ResetSuccess = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0 p-5 text-center">
               <div className="mb-4">
                  <div className="text-success mb-4">
                     <i className="bi bi-check-circle-fill" style={{ fontSize: '5rem' }}></i>
                  </div>
                  <h2 className="fw-bold text-navy">Your Password has been updated successfully.</h2>
               </div>
               <Button className="w-100 py-2 mt-3" as={Link} to="/login">Login</Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetSuccess;
