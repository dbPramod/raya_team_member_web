import { useState } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <Container className="py-5">
      <Row className="align-items-center min-vh-75">
        <Col lg={6}>
          <h1 className="display-3 fw-bold text-navy mb-4" style={{ color: '#0f1d3a' }}>
            Elevate Your <span className="text-teal" style={{ color: '#3d8b8b' }}>Team's Potential</span>
          </h1>
          <p className="lead text-muted mb-5">
            The ultimate training and performance management platform for modern teams. 
            Track progress, assessments, and leaderboards in one centralized place.
          </p>
          <div className="d-flex gap-3">
            <Button size="lg" as={Link} to="/login">Get Started</Button>
            <Button size="lg" variant="outline-primary" as={Link} to="/register">Create Account</Button>
          </div>
        </Col>
        <Col lg={6} className="d-none d-lg-block">
          <div className="p-5 bg-teal bg-opacity-10 rounded-circle position-relative overflow-hidden shadow-sm" style={{ backgroundColor: 'rgba(61, 139, 139, 0.1)' }}>
             <img src="https://img.freepik.com/free-vector/learning-concept-illustration_114360-6186.jpg" className="img-fluid rounded shadow-lg" alt="Team Work" />
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={4}>
          <Card className="bg-secondary border-0 text-light h-100 shadow">
            <Card.Body className="p-4">
              <Badge bg="info" className="mb-3">New Feature</Badge>
              <Card.Title className="fs-4 fw-bold">Real-time Analytics</Card.Title>
              <Card.Text className="text-light-50">
                Track your team's performance with instant updates and dynamic data visualizations.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {/* Aditional cards here */}
      </Row>
    </Container>
  );
}

export default Home;
