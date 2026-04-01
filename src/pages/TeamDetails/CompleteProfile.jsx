import { Container, Card, Row, Col, Form } from 'react-bootstrap';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Link } from 'react-router-dom';

const CompleteProfile = () => {
  return (
    <div className="min-vh-100 py-5 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow-lg border-0 p-5">
              <div className="text-center mb-5">
                <h1 className="fw-bold text-navy mb-1" style={{ fontSize: '1.8rem', color: '#0f1d3a' }}>
                  SWANN <span className="text-teal" style={{ color: '#3d8b8b' }}>AVE</span>
                </h1>
                <div className="mt-3">
                   <Badge bg="teal" className="p-2 px-3 bg-teal" style={{ backgroundColor: '#3d8b8b' }}>ONBOARDING</Badge>
                </div>
                <h2 className="fw-bold mt-4">Complete Your Profile</h2>
                <p className="text-muted">Enter your details for a better experience</p>
              </div>

              <Form>
                <Row className="g-4">
                  <Col md={6}>
                    <Input label="Full Name" placeholder="Dinesh B" />
                  </Col>
                  <Col md={6}>
                    <Input label="Email" type="email" placeholder="email@example.com" />
                  </Col>
                  <Col md={6}>
                    <Input label="Contact Number" placeholder="+1 234 567 890" />
                  </Col>
                  <Col md={6}>
                    <Input label="Qualification" placeholder="Master of Science" />
                  </Col>
                  <Col md={6}>
                    <Input label="Experience" placeholder="5+ Years" />
                  </Col>
                  <Col md={6}>
                    <Input label="Portfolio Link" placeholder="https://portfolio.com" />
                  </Col>
                </Row>
                
                <div className="mt-5 text-center">
                   <Button className="px-5 py-3 fs-5" as={Link} to="/dashboard">Complete Profile</Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

import { Badge } from 'react-bootstrap';
export default CompleteProfile;
