import { useState } from 'react';
import { Container, Row, Col, Card, ProgressBar, Badge, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '../../components/common/CustomSelect';
const ProjectDetail = () => {
    const navigate = useNavigate();
    const priorityOptions = [
        { value: 'Priority', label: 'Priority' },
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' }
    ];

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
    const [priorityFilter, setPriorityFilter] = useState('Priority');

    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'High':
                return {
                    color: '#f06f5c',
                    backgroundColor: '#fff3ef',
                    border: '1px solid #ffd8d0'
                };
            case 'Medium':
                return {
                    color: '#c7852d',
                    backgroundColor: '#fff5df',
                    border: '1px solid #f5e0b4'
                };
            default:
                return {
                    color: '#64748b',
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #e2e8f0'
                };
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'In-progress':
                return {
                    color: '#8c6540',
                    backgroundColor: '#f6e8d7',
                    border: '1px solid #ead3bc'
                };
            case 'Completed':
                return {
                    color: '#3f8a4b',
                    backgroundColor: '#d7f4c7',
                    border: '1px solid #b8e6a3'
                };
            default:
                return {
                    color: '#64748b',
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #e2e8f0'
                };
        }
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task => {
            if (task.id !== id) {
                return task;
            }

            const nextCompleted = !task.completed;

            return {
                ...task,
                completed: nextCompleted,
                status: nextCompleted ? 'Completed' : 'In-progress'
            };
        }));
    };

    const completedCount = tasks.filter((task) => task.completed).length;
    const totalCount = tasks.length;
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return (
        <Container fluid className="py-4 px-3 px-lg-4 projects-container" style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
            <div className="d-flex align-items-center gap-3 mb-4 mb-lg-5">
                <Button
                    variant="link"
                    className="p-0 text-dark"
                    onClick={() => navigate('/projects')}
                    style={{ fontSize: '1.35rem', lineHeight: 1 }}
                >
                    <i className="bi bi-arrow-left"></i>
                </Button>
                <h2 className="fw-bold mb-0" style={{ color: '#151515', fontSize: '2rem' }}>Project Name</h2>
            </div>

            <Row className="g-4">
                <Col lg={9}>
                    <Card
                        className="border-0 rounded-4 overflow-hidden mb-4 mb-lg-5"
                        style={{ background: 'linear-gradient(135deg, #4a95a0 0%, #1b458f 100%)', boxShadow: '0 12px 28px rgba(27, 69, 143, 0.18)' }}
                    >
                        <Card.Body className="p-4 p-lg-5">
                            <Row className="g-4 mb-4 align-items-start">
                                <Col md={4}>
                                    <div className="text-white text-opacity-75 fw-medium mb-2" style={{ fontSize: '0.95rem' }}>Tasks</div>
                                    <div className="fw-bold text-white" style={{ fontSize: '2.2rem' }}>{completedCount}/{20}</div>
                                </Col>
                                <Col md={4}>
                                    <div className="text-white text-opacity-75 fw-medium mb-2" style={{ fontSize: '0.95rem' }}>Team Members</div>
                                    <div className="fw-bold text-white" style={{ fontSize: '2.2rem' }}>8</div>
                                </Col>
                                <Col md={4}>
                                    <div className="text-white text-opacity-75 fw-medium mb-2" style={{ fontSize: '0.95rem' }}>Due Date</div>
                                    <div className="fw-bold text-white" style={{ fontSize: '2.2rem' }}>12/12/2025</div>
                                </Col>
                            </Row>

                            <div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-white text-opacity-75 fw-medium">Progress</span>
                                    <span className="text-white fw-semibold">{progressPercent}%</span>
                                </div>
                                <ProgressBar
                                    now={progressPercent}
                                    style={{
                                        height: '8px',
                                        backgroundColor: 'rgba(255,255,255,0.25)',
                                        borderRadius: '999px'
                                    }}
                                    className="project-detail-progress-bar"
                                />
                            </div>
                        </Card.Body>
                    </Card>

                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h4 className="fw-bold mb-0" style={{ color: '#151515', fontSize: '1.9rem' }}>Tasks</h4>
                        <div style={{ minWidth: '140px' }}>
                            <CustomSelect
                                options={priorityOptions}
                                value={priorityFilter}
                                onChange={(event) => setPriorityFilter(event.target.value)}
                                placeholder="Priority"
                                className="custom-select-premium-wrapper project-detail-priority-select"
                            />
                        </div>
                    </div>

                    <div className="project-detail-task-list">
                        {tasks.map((task) => (
                            <Card
                                key={task.id}
                                className="border-0 rounded-4 mb-3 mx-3"
                                style={{
                                    backgroundColor: '#d8e9f7',
                                    boxShadow: '0 12px 28px rgba(27, 69, 143, 0.18)',
                                    padding: '0.5rem 0.5rem'
                                }}
                            >
                                <Card.Body className="p-0">
                                    <div className="d-flex justify-content-between align-items-center px-3 px-lg-4 pt-3 pb-2">
                                        <div className="d-flex align-items-center gap-3 text-dark">
                                            <span className="fw-medium" style={{ fontSize: '0.92rem' }}>Due date</span>
                                            <span className="fw-medium" style={{ fontSize: '0.92rem' }}>{task.dueDate}</span>
                                        </div>
                                        <span
                                            className="pointer"
                                            onClick={() => navigate('/projects/task-detail')}
                                            style={{ color: '#64748b', fontWeight: 500, fontSize: '0.88rem' }}
                                        >
                                            View More
                                        </span>
                                    </div>

                                    <div
                                        className="bg-white rounded-4 d-flex gap-3 align-items-start px-3 px-lg-4 py-3 project-detail-task-card"
                                        style={{ boxShadow: '0 8px 18px rgba(15, 29, 58, 0.08)' }}
                                    >
                                        <button
                                            type="button"
                                            className="border-0 bg-transparent p-0 mt-1"
                                            onClick={() => toggleTask(task.id)}
                                            aria-label="Toggle task status"
                                        >
                                            <span
                                                style={{
                                                    width: '28px',
                                                    height: '28px',
                                                    borderRadius: '50%',
                                                    border: '2px solid #294c7a',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: task.completed ? '#294c7a' : 'transparent'
                                                }}
                                            >
                                                {task.completed ? <i className="bi bi-check text-white"></i> : null}
                                            </span>
                                        </button>

                                        <div className="flex-grow-1">
                                            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-start gap-3 mb-2">
                                                <h4 className="fw-bold mb-0" style={{ color: '#202020', fontSize: '1.03rem', lineHeight: 1.35 }}>
                                                    {task.title}
                                                </h4>
                                                <div className="d-flex gap-2 flex-wrap">
                                                    {task.completed ? (
                                                        <Badge
                                                            bg="transparent"
                                                            className="rounded-pill px-3 py-2"
                                                            style={{
                                                                ...getStatusStyles('Completed'),
                                                                fontSize: '0.78rem',
                                                                fontWeight: 500,
                                                                lineHeight: 1,
                                                                paddingTop: '0.55rem',
                                                                paddingBottom: '0.55rem',
                                                                paddingLeft: '0.95rem',
                                                                paddingRight: '0.95rem'
                                                            }}
                                                        >
                                                            Completed
                                                        </Badge>
                                                    ) : (
                                                        <>
                                                            <Badge
                                                                bg="transparent"
                                                                className="rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2"
                                                                style={{
                                                                    ...getPriorityStyles(task.priority),
                                                                    fontSize: '0.78rem',
                                                                    fontWeight: 500,
                                                                    lineHeight: 1,
                                                                    paddingTop: '0.55rem',
                                                                    paddingBottom: '0.55rem',
                                                                    paddingLeft: '0.9rem',
                                                                    paddingRight: '0.9rem'
                                                                }}
                                                            >
                                                                <i className="bi bi-flag" style={{ fontSize: '0.82rem' }}></i>
                                                                {task.priority}
                                                            </Badge>
                                                            <Badge
                                                                bg="transparent"
                                                                className="rounded-pill px-3 py-2"
                                                                style={{
                                                                    ...getStatusStyles(task.status),
                                                                    fontSize: '0.78rem',
                                                                    fontWeight: 500,
                                                                    lineHeight: 1,
                                                                    paddingTop: '0.55rem',
                                                                    paddingBottom: '0.55rem',
                                                                    paddingLeft: '0.95rem',
                                                                    paddingRight: '0.95rem'
                                                                }}
                                                            >
                                                                {task.status}
                                                            </Badge>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <p className="mb-0" style={{ color: '#6b7280', fontSize: '0.98rem', lineHeight: 1.6, maxWidth: '92%' }}>
                                                {task.description}
                                            </p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </Col>

                <Col lg={3}>
                    <div className="rounded-4 h-100 p-3 p-lg-4" style={{ backgroundColor: '#d8e9f7' }}>
                        <h4 className="fw-bold mb-4" style={{ color: '#151515', fontSize: '2rem' }}>Team</h4>
                        <div className="bg-white rounded-4 overflow-hidden" style={{ boxShadow: '0 8px 18px rgba(15, 29, 58, 0.06)' }}>
                            {teamMembers.map((member, index) => (
                                <div
                                    key={index}
                                    className={`d-flex align-items-center gap-3 px-3 py-3 ${index !== teamMembers.length - 1 ? 'border-bottom' : ''}`}
                                    style={{ borderColor: '#dbe6f1' }}
                                >
                                    <Image
                                        src={member.avatar}
                                        roundedCircle
                                        style={{ width: '34px', height: '34px', objectFit: 'cover' }}
                                    />
                                    <span style={{ color: '#283245', fontWeight: 500, fontSize: '1.2rem' }}>{member.name}</span>
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
