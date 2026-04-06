import { Container, Row, Col, Badge, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const TodoHistory = () => {
    const navigate = useNavigate();

    const historyItems = [
        { task: 'Submit Weekly Timesheet', status: 'Due on 00/00/000', type: 'due' },
        { task: 'Update Client Contact', status: 'Due on 00/00/000', type: 'due' },
        { task: 'Submit Weekly Timesheet', status: 'Due on 00/00/000', type: 'due' },
        { task: 'Update Client Contact', status: 'Completed', type: 'done' },
        { task: 'Submit Weekly Timesheet', status: 'Completed', type: 'done' },
        { task: 'Update Client Contact', status: 'Completed', type: 'done' },
        { task: 'Submit Weekly Timesheet', status: 'Completed', type: 'done' },
        { task: 'Update Client Contact', status: 'Completed', type: 'done' }
    ];

    return (
        <Container fluid className="px-lg-4 py-0 h-100 d-flex flex-column projects-container bg-white" style={{ maxWidth: '1400px', height: 'calc(100vh - 120px)', overflow: 'hidden' }}>
            {/* Fixed Header Section */}
            <div className="flex-shrink-0">
                {/* Tabs Header */}
                <div className="d-flex align-items-center mb-0 border-bottom">
                    <Nav variant="tabs" className="border-0 gap-4" activeKey="todo">
                        <Nav.Item>
                            <Nav.Link
                                eventKey="todo"
                                className="border-0 px-4 py-3 fw-medium text-teal border-bottom-teal"
                                style={{ backgroundColor: 'transparent' }}
                            >
                                To-do
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="project"
                                onClick={() => navigate('/projects')}
                                className="border-0 px-4 py-3 fw-medium text-muted"
                                style={{ backgroundColor: 'transparent' }}
                            >
                                Project
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>

                {/* Back Header */}
                <div className="d-flex align-items-center gap-3 mb-2 mt-2">
                    <Button
                        variant="link"
                        className="p-0 text-dark"
                        onClick={() => navigate('/projects')}
                    >
                        <i className="bi bi-arrow-left fs-3"></i>
                    </Button>
                    <h2 className="fw-bold mb-0" style={{ color: 'var(--swann-navy)', fontSize: '2rem' }}>To do History</h2>
                </div>
            </div>

            {/* Scrollable Table Section */}
            <div className="flex-grow-1 overflow-auto border rounded-4 shadow-sm mb-0" style={{ borderColor: '#eff2f5' }}>
                {/* Table Header (Sticky) */}
                <Row className="g-0 p-3 bg-light-blue fw-bold sticky-top z-1" style={{ color: 'var(--swann-navy)', fontSize: '1.05rem', borderBottom: '1px solid #eff2f5' }}>
                    <Col xs={8} className="ps-2">Task</Col>
                    <Col xs={4} className="text-end pe-2">Status</Col>
                </Row>

                {/* Table Rows */}
                <div className="bg-white">
                    {historyItems.map((item, i) => (
                        <Row key={i} className={`g-0 p-4 align-items-center ${i !== historyItems.length - 1 ? 'border-bottom' : ''}`} style={{ borderColor: '#eff2f5' }}>
                            <Col xs={8}>
                                <span className="fw-medium text-dark" style={{ fontSize: '1.1rem' }}>{item.task}</span>
                            </Col>
                            <Col xs={4} className="text-end">
                                <span className={`badge-status ${item.type === 'due' ? 'badge-due' : 'badge-completed'}`}>
                                    {item.status}
                                </span>
                            </Col>
                        </Row>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default TodoHistory;
