import { useState } from 'react';
import { Container, Row, Col, Card, ProgressBar, Badge, Form, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const ProjectDetail = () => {
    const navigate = useNavigate();

    const teamMembers = [
        { name: 'Emerald Muse', avatar: 'https://i.pravatar.cc/150?u=1' },
        { name: 'Azure Gale', avatar: 'https://i.pravatar.cc/150?u=2' },
        { name: 'Emerald Muse', avatar: 'https://i.pravatar.cc/150?u=3' },
        { name: 'Amber Bliss', avatar: 'https://i.pravatar.cc/150?u=4' },
        { name: 'Emerald Muse', avatar: 'https://i.pravatar.cc/150?u=5' }
    ];

    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Create About Us Page Content',
            description: "Draft and finalize the 'About Us' content, including company mission, values, and brand story. Ensure tone aligns with brand guidelines.",
            dueDate: '12/12/2025',
            priority: 'High',
            status: 'In-progress',
            completed: false
        },
        {
            id: 2,
            title: 'Create About Us Page Content',
            description: "Draft and finalize the 'About Us' content, including company mission, values, and brand story. Ensure tone aligns with brand guidelines.",
            dueDate: '12/12/2025',
            priority: 'High',
            status: 'In-progress',
            completed: false
        }
    ]);

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const completedCount = tasks.filter(t => t.completed).length;
    const totalCount = tasks.length;
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return (
        <Container fluid className="py-4 px-4 px-xl-5 projects-container" style={{ backgroundColor: 'var(--bg-light)', minHeight: '100vh' }}>
            {/* Header */}
            <div className="d-flex align-items-center gap-3 mb-4">
                <Button
                    variant="link"
                    className="p-0 text-dark"
                    onClick={() => navigate('/projects')}
                    style={{ fontSize: '1.5rem' }}
                >
                    <i className="bi bi-arrow-left"></i>
                </Button>
                <h2 className="fw-bold mb-0" style={{ color: 'var(--swann-navy)' }}>Project Name</h2>
            </div>

            {/* Project Overview Card */}
            <Card className="border-0 rounded-4 shadow-lg mb-5 overflow-hidden"
                style={{ background: 'linear-gradient(90deg, #40878E 0%, #0F1D3A 100%)', color: '#ffffff' }}>
                <Card.Body className="p-4 p-lg-5">
                    <Row className="mb-5 g-0">
                        <Col md={4} className="border-end border-white border-opacity-10 py-2">
                            <span className="small text-uppercase fw-bold opacity-50 ls-1 d-block mb-2">Tasks</span>
                            <h2 className="fw-bold mb-0 text-white" style={{ fontSize: '2.5rem' }}>{completedCount}/{totalCount}</h2>
                        </Col>
                        <Col md={4} className="border-end border-white border-opacity-10 ps-md-5 py-2">
                            <span className="small text-uppercase fw-bold opacity-50 ls-1 d-block mb-2">Team Members</span>
                            <h2 className="fw-bold mb-0 text-white" style={{ fontSize: '2.5rem' }}>{teamMembers.length}</h2>
                        </Col>
                        <Col md={4} className="ps-md-5 py-2">
                            <span className="small text-uppercase fw-bold opacity-50 ls-1 d-block mb-2">Due Date</span>
                            <h2 className="fw-bold mb-0 text-white text-nowrap" style={{ fontSize: '2.5rem' }}>12/12/2025</h2>
                        </Col>
                    </Row>

                    <div className="mt-4 pt-2">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="fw-bold text-uppercase ls-1 opacity-75">Progress</span>
                            <span className="fw-bold fs-5">{progressPercent}%</span>
                        </div>
                        <ProgressBar
                            now={progressPercent}
                            variant="light"
                            style={{ height: '10px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '20px' }}
                        />
                    </div>
                </Card.Body>
            </Card>

            <Row className="g-4">
                {/* Tasks Column */}
                <Col lg={9}>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h4 className="fw-bold mb-0" style={{ color: 'var(--swann-navy)', fontSize: '1.75rem' }}>Tasks</h4>
                        <Form.Select className="w-auto border-0 shadow-sm rounded-3 px-4 py-2 custom-select-premium" style={{ fontSize: '0.95rem', color: 'var(--swann-navy)', fontWeight: '600' }}>
                            <option>Priority</option>
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </Form.Select>
                    </div>

                    <div className="p-4 rounded-4 shadow-sm" style={{ backgroundColor: '#D6E5F2' }}>
                        {tasks.map((task, i) => (
                            <Card key={task.id} className={`border-0 rounded-4 shadow-sm mb-4 transition-all hover-translate hover-shadow ${task.completed ? 'opacity-75' : ''}`} style={{ backgroundColor: '#ffffff' }}>
                                <Card.Body className="p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4 text-muted small text-uppercase fw-bold ls-1 opacity-50">
                                        <span>Due date <span className="ms-2 text-dark opacity-100">{task.dueDate}</span></span>
                                        <span
                                            className="pointer hover-teal transition-all"
                                            onClick={() => navigate('/projects/task-detail')}
                                        >View More</span>
                                    </div>
                                    <div className="d-flex gap-4">
                                        <div className="pt-1">
                                            <div className="pointer transition-all hover-scale"
                                                onClick={() => toggleTask(task.id)}
                                                style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="10" stroke="#0F1D3A" strokeWidth="2"/>
                                                    <circle cx="12" cy="12" r="5" stroke="#0F1D3A" strokeWidth="1.5"/>
                                                    {task.completed && <circle cx="12" cy="12" r="3" fill="#0F1D3A"/>}
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h4 className="fw-bold mb-0" style={{
                                                    color: 'var(--swann-navy)',
                                                    fontSize: '1.5rem',
                                                    letterSpacing: '-0.01em',
                                                    opacity: task.completed ? 0.8 : 1
                                                }}>{task.title}</h4>

                                                {task.completed && (
                                                    <Badge bg="success" className="bg-opacity-10 text-success rounded-pill px-3 py-2 fw-bold" style={{ fontSize: '0.85rem', backgroundColor: '#D1F8D1', color: '#2D6A2D' }}>
                                                        Completed
                                                    </Badge>
                                                )}
                                            </div>

                                            <p className="text-muted mb-4" style={{
                                                lineHeight: '1.6',
                                                fontSize: '1rem',
                                                opacity: task.completed ? 0.6 : 1
                                            }}>{task.description}</p>

                                            {!task.completed && (
                                                <div className="d-flex gap-3">
                                                    <Badge bg="danger" className="bg-opacity-10 text-danger rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2" style={{ fontSize: '0.85rem' }}>
                                                        <i className="bi bi-flag-fill"></i> {task.priority}
                                                    </Badge>
                                                    <Badge bg="warning" className="bg-opacity-10 text-warning rounded-pill px-4 py-2 fw-bold" style={{ fontSize: '0.85rem' }}>
                                                        {task.status}
                                                    </Badge>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </Col>

                {/* Team Sidebar */}
                <Col lg={3}>
                    <div className="p-4 rounded-4 shadow-sm h-100" style={{ backgroundColor: '#D6E5F2' }}>
                        <h4 className="fw-bold mb-4" style={{ color: 'var(--swann-navy)', fontSize: '1.5rem' }}>Team</h4>

                        <div className="bg-white rounded-4 shadow-sm overflow-hidden">
                            {teamMembers.map((member, i) => (
                                <div key={i}
                                    className={`p-3 d-flex align-items-center gap-3 transition-all hover-bg-light ${i !== teamMembers.length - 1 ? 'border-bottom' : ''}`}
                                    style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                                    <Image
                                        src={member.avatar}
                                        roundedCircle
                                        style={{ width: '42px', height: '42px', objectFit: 'cover' }}
                                    />
                                    <span className="fw-bold" style={{ color: 'var(--swann-navy)', fontSize: '0.95rem' }}>{member.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>

        </Container>
    );
};

export default ProjectDetail;
