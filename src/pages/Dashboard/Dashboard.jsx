import { Container, Row, Col, Card, ProgressBar, Badge } from 'react-bootstrap';

const Dashboard = () => {
  const trainings = [
    { name: 'Customer Service Excellence', progress: 65 },
    { name: 'Safety Training', progress: 60 },
    { name: 'Customer Service Excellence', progress: 65 },
  ];

  const leaderboard = [
    { rank: '1st', name: 'Robert Parker', score: '80%', img: 'https://i.pravatar.cc/150?u=robert' },
    { rank: '2nd', name: 'Rick Owens', score: '78%', img: 'https://i.pravatar.cc/150?u=rick' },
    { rank: '3rd', name: 'George Orwell', score: '75%', img: 'https://i.pravatar.cc/150?u=george' },
  ];

  return (
    <Container fluid className="px-0">
      <Row className="mb-4">
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0"><i className="bi bi-bullseye me-2 text-teal"></i>Trainings</h5>
                <a href="#" className="small text-muted-light text-decoration-none">View All</a>
              </div>
              {trainings.map((t, i) => (
                <div key={i} className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-medium text-dark">{t.name}</span>
                    <span className="fw-bold">{t.progress}%</span>
                  </div>
                  <ProgressBar now={t.progress} variant="teal" style={{ height: '8px', backgroundColor: '#e9ecef' }} />
                </div>
              ))}
            </Card.Body>
          </Card>

          <Card>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0"><i className="bi bi-bar-chart me-2 text-teal"></i>Leaderboard</h5>
                <a href="#" className="small text-muted-light text-decoration-none">View All</a>
              </div>
              <div className="leaderboard-list">
                {leaderboard.map((user, i) => (
                  <div key={i} className="d-flex align-items-center justify-content-between py-3 border-bottom last-border-0">
                    <div className="d-flex align-items-center gap-3">
                      <Badge bg="light" className="text-dark border px-2 py-1">{user.rank}</Badge>
                      <img src={user.img} alt={user.name} className="rounded-circle" width="40" height="40" />
                      <span className="fw-semibold">{user.name}</span>
                    </div>
                    <div className="d-flex align-items-center gap-3 w-50">
                      <ProgressBar now={parseInt(user.score)} variant="navy" className="flex-grow-1" style={{ height: '6px' }} />
                      <span className="fw-bold">{user.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4 bg-white">
            <Card.Body className="p-4 text-center">
              <div className="mb-3">
                <img src="https://i.pravatar.cc/150?u=me" alt="user" className="rounded-circle border border-3 border-teal p-1" width="80" height="80" />
              </div>
              <h5 className="fw-bold mb-1">Dinesh B</h5>
              <p className="text-muted small">Team Lead</p>
              <hr className="my-4 opacity-10" />
              <div className="row text-center">
                <div className="col-6 border-end">
                  <h6 className="fw-bold mb-0">12</h6>
                  <small className="text-muted">Courses</small>
                </div>
                <div className="col-6">
                  <h6 className="fw-bold mb-0">85%</h6>
                  <small className="text-muted">Avg Score</small>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body className="p-4">
              <h6 className="fw-bold mb-3">Upcoming Assessments</h6>
              <div className="d-flex gap-3 mb-3 p-3 rounded bg-light border-start border-4 border-info">
                <div>
                  <div className="fw-bold small">Safety Quiz</div>
                  <small className="text-muted">Due: Tomorrow</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
