import { useState } from 'react';
import { Container, Row, Col, Card, ProgressBar, Badge, Form, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ProjectsTasks.css';

const ProjectsTasks = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('project'); // 'todo' or 'project'

    const stats = [
        { label: 'Active Projects', value: 20, icon: 'bi-window-stack', bg: '#D6E5F2' },
        { label: 'Total Tasks', value: 5, icon: 'bi-clipboard-check', bg: '#D6E5F2' },
        { label: 'Completed', value: 15, icon: 'bi-journal-check', bg: '#D6E5F2' },
        { label: 'Pending', value: 15, icon: 'bi-journal-text', bg: '#D6E5F2' },
    ];

    const projects = [
        {
            title: 'Customer Portal Redesign',
            description: 'Modernize the customer-facing portal with new UI/UX',
            progress: 45,
            tasks: '12/20',
            dueDate: '07/01/2026'
        },
        {
            title: 'Q4 Training Initiative',
            description: 'Roll out new training programs for all departments',
            progress: 85,
            tasks: '1/4',
            dueDate: '10/01/2026'
        },
        {
            title: 'Customer Portal Redesign',
            description: 'Modernize the customer-facing portal with new UI/UX',
            progress: 45,
            tasks: '12/20',
            dueDate: '07/01/2026'
        },
        {
            title: 'Q4 Training Initiative',
            description: 'Roll out new training programs for all departments',
            progress: 85,
            tasks: '1/4',
            dueDate: '10/01/2026'
        }
    ];

    const todoSections = [
        {
            title: 'Must Do Today',
            tasks: [
                { title: 'Close Front Desk', type: 'Daily', status: 'In-progress' },
                { title: 'Sanitation Check', type: 'One-time', status: 'In-progress' },
                { title: 'Daily Sales Reconciliation', type: 'Weekly', status: 'Not started' }
            ]
        },
        {
            title: 'Upcoming',
            tasks: [
                { title: 'Quarterly Safety Review', type: 'Weekly', status: 'Not started' },
                { title: 'Monthly Equipment Audit', type: 'Weekly', status: 'Not started' }
            ]
        }
    ];

    return (
        <Container fluid className="px-lg-4 py-3 h-100 d-flex flex-column bg-white overflow-auto projects-container" style={{ maxWidth: '1400px' }}>
            {/* Tabs Header */}
            <div className="d-flex align-items-center mb-4 border-bottom">
                <Nav variant="tabs" className="border-0 gap-4" activeKey={activeTab}>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="todo"
                            onClick={() => setActiveTab('todo')}
                            className={`border-0 px-4 py-3 fw-medium transition-all ${activeTab === 'todo' ? 'text-teal border-bottom-teal' : 'text-muted'}`}
                            style={{
                                backgroundColor: 'transparent',
                                borderBottom: activeTab === 'todo' ? '2px solid #3d8b8b' : 'none',
                                color: activeTab === 'todo' ? '#3d8b8b' : '#6c757d'
                            }}
                        >
                            To-do
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="project"
                            onClick={() => setActiveTab('project')}
                            className={`border-0 px-4 py-3 fw-medium transition-all ${activeTab === 'project' ? 'text-teal border-bottom-teal' : 'text-muted'}`}
                            style={{
                                backgroundColor: 'transparent',
                                borderBottom: activeTab === 'project' ? '2px solid #3d8b8b' : 'none',
                                color: activeTab === 'project' ? '#3d8b8b' : '#6c757d'
                            }}
                        >
                            Project
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>

            <div className="flex-grow-1">
                {activeTab === 'project' ? (
                    <>
                        <h3 className="fw-bold mb-4" style={{ color: '#0f1d3a', fontSize: '1.75rem' }}>Projects</h3>

                        {/* Stats Row */}
                        <Row className="g-4 mb-5">
                            {stats.map((stat, i) => (
                                <Col key={i} sm={6} lg={3}>
                                    <div className="p-3 rounded-4 d-flex align-items-center gap-3 transition-all hover-shadow" style={{ background: 'linear-gradient(259.82deg, #EFECE4 -24.5%, #40878E 99.17%)', borderColor: '#DCDCDC', borderWidth: 1 }}>
                                        <div className="bg-white bg-opacity-25 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px', backdropFilter: 'blur(4px)' }}>
                                            <i className={`bi ${stat.icon} fs-4 text-white`}></i>
                                        </div>
                                        <div>
                                            <h2 className="fw-bold mb-0" style={{ color: '#ffffff', fontSize: '1.5rem' }}>{stat.value}</h2>
                                            <span className="small fw-semibold text-uppercase text-white opacity-75 ls-1">{stat.label}</span>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>

                        {/* Project Grid */}
                        <Row className="g-4 mb-5">
                            {projects.map((proj, i) => (
                                <Col key={i} md={6}>
                                    <Card className="border-1 rounded-4 transition-all hover-translate shadow-sm h-100" style={{ borderColor: '#A7B0C0', backgroundColor: '#FCFAF7' }}>
                                        <Card.Body className="p-4 p-xl-5 d-flex flex-column">
                                            <div className="mb-4">
                                                <h4 className="fw-bold mb-2" style={{ color: '#0f1d3a' }}>{proj.title}</h4>
                                                <p className="text-muted small mb-0">{proj.description}</p>
                                            </div>

                                            <Card className="border-0 rounded-4 shadow-sm mb-4" style={{ backgroundColor: '#ffffff' }}>
                                                <Card.Body className="p-4">
                                                    <div className="mb-4">
                                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                                            <span className="text-muted small fw-medium">Progress</span>
                                                            <span className="fw-bold small" style={{ color: '#0f1d3a' }}>{proj.progress}%</span>
                                                        </div>
                                                        <ProgressBar
                                                            now={proj.progress}
                                                            style={{
                                                                height: '8px',
                                                                backgroundColor: '#eef2f6',
                                                                borderRadius: '10px',
                                                                overflow: 'hidden'
                                                            }}
                                                            className="custom-progress-gradient"
                                                        />
                                                    </div>

                                                    <Row className="g-0 border-top pt-4" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                                                        <Col xs={6} className="pe-3">
                                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                                <i className="bi bi-check2-circle text-muted"></i>
                                                                <span className="text-muted small fw-medium">Tasks</span>
                                                            </div>
                                                            <h6 className="fw-bold mb-0" style={{ color: '#0f1d3a' }}>{proj.tasks}</h6>
                                                        </Col>
                                                        <Col xs={6} className="ps-3 text-end">
                                                            <div className="d-flex align-items-center justify-content-end gap-2 mb-2">
                                                                <i className="bi bi-calendar3 text-muted"></i>
                                                                <span className="text-muted small fw-medium">Due Date</span>
                                                            </div>
                                                            <h6 className="fw-bold mb-0" style={{ color: '#0f1d3a' }}>{proj.dueDate}</h6>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>

                                            <div className="d-flex justify-content-end mt-auto">
                                                <span
                                                    className="text-muted small fw-bold pointer hover-teal d-flex align-items-center gap-1 transition-all"
                                                    onClick={() => navigate('/projects/detail')}
                                                >
                                                    View <i className="bi bi-arrow-right fs-6"></i>
                                                </span>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </>
                ) : (
                    <>
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h3 className="fw-bold mb-0" style={{ color: '#0f1d3a', fontSize: '1.75rem' }}>To-do</h3>
                            <Button 
                                variant="outline-dark" 
                                className="rounded-3 border-secondary border-opacity-25 px-3 py-2 d-flex align-items-center gap-2" 
                                style={{ fontSize: '0.9rem' }}
                                onClick={() => navigate('/projects/todo-history')}
                            >
                                <i className="bi bi-arrow-counterclockwise"></i> History
                            </Button>
                        </div>

                        {todoSections.map((section, idx) => (
                            <div key={idx} className="mb-5">
                                <div className="p-3 rounded-top-4" style={{ background: 'linear-gradient(259.82deg, #EFECE4 -24.5%, #40878E 99.17%)' }}>
                                    <h6 className="fw-bold mb-0 text-white">{section.title}</h6>
                                </div>
                                <div className="border border-top-0 rounded-bottom-4 bg-white overflow-hidden" style={{ borderColor: '#eff2f5' }}>
                                    {section.tasks.map((task, tidx) => (
                                        <div key={tidx} className={`p-4 d-flex align-items-center justify-content-between ${tidx !== section.tasks.length - 1 ? 'border-bottom' : ''}`} style={{ borderColor: '#eff2f5' }}>
                                            <div className="d-flex align-items-center gap-3">
                                                <span className="fw-medium text-dark" style={{ fontSize: '1.05rem' }}>{task.title}</span>
                                                <Badge bg="transparent" className="border text-muted fw-normal px-3 py-2 rounded-2" style={{ fontSize: '0.8rem', backgroundColor: '#f8f9fa' }}>{task.type}</Badge>
                                            </div>
                                            <div style={{ width: '150px' }}>
                                                <Form.Select className="border-secondary border-opacity-25 rounded-3 py-2" style={{ fontSize: '0.85rem' }} defaultValue={task.status}>
                                                    <option>In-progress</option>
                                                    <option>Not started</option>
                                                    <option>Completed</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

        </Container>
    );
};

export default ProjectsTasks;
