import { Container, Row, Col, Badge, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const TaskDetail = () => {
    const navigate = useNavigate();

    const task = {
        title: 'Create About Us Page Content',
        status: 'Not Started',
        priority: 'High',
        description: 'Draft and finalize the "About Us" content, including company mission, values, and brand story. Ensure tone aligns with brand guidelines.',
        dueDate: '12/08/2026',
        startDate: '10/08/2026',
        assignedBy: 'Business owner',
        attachments: [
            { name: 'About-Us.doc', size: '2.0 MB', type: 'doc' },
            { name: 'About-Us.pdf', size: '2.0 MB', type: 'pdf' }
        ]
    };

    return (
        <Container fluid className="py-4 px-4 px-xl-5 projects-container bg-white" style={{ minHeight: '100vh' }}>
            {/* Header */}
            <div className="d-flex align-items-center gap-3 mb-5 mt-2">
                <Button 
                    variant="link" 
                    className="p-0 text-dark" 
                    onClick={() => navigate('/projects/detail')}
                >
                    <i className="bi bi-arrow-left fs-3"></i>
                </Button>
                <h2 className="fw-bold mb-0" style={{ color: 'var(--swann-navy)', fontSize: '2.2rem' }}>{task.title}</h2>
            </div>

            <Row className="mb-4 align-items-center">
                <Col md={6}>
                    <h4 className="fw-bold mb-0" style={{ color: 'var(--swann-navy)', fontSize: '1.5rem' }}>Description</h4>
                </Col>
                <Col md={6} className="d-flex justify-content-md-end gap-3 align-items-center">
                    <Badge bg="danger" className="bg-opacity-10 text-danger rounded-pill px-3 py-2 fw-bold d-flex align-items-center gap-2" style={{ fontSize: '0.9rem' }}>
                        <i className="bi bi-flag-fill"></i> {task.priority}
                    </Badge>
                    <Form.Select 
                        className="w-auto border shadow-sm rounded- pill px-3 py-2 custom-select-premium" 
                        style={{ fontSize: '0.9rem', color: 'var(--swann-navy)', fontWeight: '600', minWidth: '160px' }}
                        defaultValue={task.status}
                    >
                        <option>{task.status}</option>
                        <option>In-progress</option>
                        <option>Completed</option>
                    </Form.Select>
                </Col>
            </Row>

            <div className="mb-5">
                <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.7', maxWidth: '1000px' }}>
                    {task.description}
                </p>
            </div>

            {/* Metadata Section */}
            <div className="mb-5 pt-3">
                <div className="task-detail-row d-flex justify-content-between align-items-center">
                    <span className="fw-bold" style={{ color: 'var(--swann-navy)', fontSize: '1.1rem' }}>Due date</span>
                    <span className="text-muted fw-bold" style={{ fontSize: '1.1rem' }}>{task.dueDate}</span>
                </div>
                <div className="task-detail-row d-flex justify-content-between align-items-center">
                    <span className="fw-bold" style={{ color: 'var(--swann-navy)', fontSize: '1.1rem' }}>Start date</span>
                    <span className="text-muted fw-bold" style={{ fontSize: '1.1rem' }}>{task.startDate}</span>
                </div>
                <div className="task-detail-row d-flex justify-content-between align-items-center">
                    <span className="fw-bold" style={{ color: 'var(--swann-navy)', fontSize: '1.1rem' }}>Assigned by</span>
                    <span className="text-muted fw-bold" style={{ fontSize: '1.1rem' }}>{task.assignedBy}</span>
                </div>
            </div>

            {/* Attachments */}
            <div className="mt-5">
                <h5 className="fw-bold mb-4" style={{ color: 'var(--swann-navy)' }}>Attachments</h5>
                <div className="d-flex flex-wrap gap-4">
                    {task.attachments.map((file, i) => (
                        <div key={i} className="attachment-card d-flex align-items-center gap-3">
                            <div className={`file-icon-wrapper ${file.type === 'doc' ? 'bg-doc' : 'bg-pdf'}`}>
                                <i className={`bi bi-file-earmark-${file.type === 'doc' ? 'word' : 'pdf'}-fill fs-5`}></i>
                            </div>
                            <div className="flex-grow-1 overflow-hidden">
                                <h6 className="mb-0 fw-bold text-truncate" style={{ fontSize: '0.95rem' }}>{file.name}</h6>
                                <span className="text-muted small">{file.size}</span>
                            </div>
                            <i className="bi bi-download text-muted fs-5 ms-2"></i>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default TaskDetail;
