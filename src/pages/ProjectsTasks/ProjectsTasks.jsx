import { useState } from 'react';
import { Container, Row, Col, Card, ProgressBar, Badge, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '../../components/common/CustomSelect';

// SVG Stats Icons
import totalIcon from '../../assets/svg/total_project_icon.svg';
import scheduledIcon from '../../assets/svg/completed_icon.svg';
import inProgressIcon from '../../assets/svg/draft_icon.svg';
import completedIcon from '../../assets/svg/pending_icon.svg';

const ProjectsTasks = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('project'); // 'todo' or 'project'
    const [projectFilter, setProjectFilter] = useState('All');
    const [todoStatuses, setTodoStatuses] = useState({
        'Must Do Today-0': 'In-progress',
        'Must Do Today-1': 'In-progress',
        'Must Do Today-2': 'Not started',
        'Upcoming-0': 'Not started',
        'Upcoming-1': 'Not started'
    });

    const projects = [
        {
            title: 'Customer Portal Redesign',
            description: 'Modernize the customer-facing portal with new UI/UX',
            progress: 45,
            tasks: '12/20',
            dueDate: '07/01/2026',
            status: 'In-progress'
        },
        {
            title: 'Q4 Training Initiative',
            description: 'Roll out new training programs for all departments',
            progress: 85,
            tasks: '1/4',
            dueDate: '10/01/2026',
            status: 'Completed'
        },

        {
            title: 'Inventory System Migration',
            description: 'Migrate legacy inventory data to the new cloud system',
            progress: 15,
            tasks: '3/25',
            dueDate: '09/01/2026',
            status: 'In-progress'
        }
    ];

    const stats = [
        { label: 'Total', value: projects.length, icon: totalIcon, filter: 'All' },
        { label: 'In-progress', value: projects.filter(p => p.status === 'In-progress').length, icon: inProgressIcon, filter: 'In-progress' },
        { label: 'Completed', value: projects.filter(p => p.status === 'Completed').length, icon: completedIcon, filter: 'Completed' },
    ];

    const filteredProjects = projectFilter === 'All'
        ? projects
        : projects.filter(p => p.status === projectFilter);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return '#28a745';
            case 'In-progress': return '#40878E';
            default: return '#6c757d';
        }
    };

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
    const todoStatusOptions = [
        { value: 'In-progress', label: 'In-progress' },
        { value: 'Not started', label: 'Not started' },
        { value: 'Completed', label: 'Completed' }
    ];

    return (
        <Container fluid className="px-3 py-3 h-100 d-flex flex-column bg-white overflow-auto projects-container">
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
                                    <div
                                        onClick={() => setProjectFilter(stat.filter)}
                                        className={`p-3 rounded-4 d-flex align-items-center gap-3 transition-all hover-shadow pointer ${projectFilter === stat.filter ? 'active-filter-card' : ''}`}
                                        style={{
                                            background: projectFilter === stat.filter
                                                ? 'linear-gradient(259.82deg, #3d8b8b -24.5%, #0f1d3a 99.17%)'
                                                : 'linear-gradient(259.82deg, #EFECE4 -24.5%, #40878E 99.17%)',
                                            borderColor: projectFilter === stat.filter ? '#0f1d3a' : '#DCDCDC',
                                            borderWidth: 2,
                                            borderStyle: 'solid',
                                            cursor: 'pointer',
                                            transform: projectFilter === stat.filter ? 'scale(1.02)' : 'none'
                                        }}
                                    >
                                        <div className="bg-white bg-opacity-25 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px', backdropFilter: 'blur(4px)' }}>
                                            <img src={stat.icon} alt={stat.label} style={{ width: '32px', height: '32px' }} />
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
                            {filteredProjects.map((proj, i) => (
                                <Col key={i} md={6}>
                                    <Card className="border-1 rounded-4 transition-all hover-translate shadow-sm h-100" style={{ borderColor: '#A7B0C0', backgroundColor: '#FCFAF7' }}>
                                        <Card.Body className="p-4 p-xl-5 d-flex flex-column">
                                            <div className="mb-4 d-flex justify-content-between align-items-start">
                                                <div>
                                                    <h4 className="fw-bold mb-2" style={{ color: '#0f1d3a' }}>{proj.title}</h4>
                                                    <p className="text-muted small mb-0">{proj.description}</p>
                                                </div>
                                                <Badge
                                                    bg="transparent"
                                                    className="rounded-pill px-3 py-2 fw-bold"
                                                    style={{
                                                        fontSize: '0.75rem',
                                                        color: getStatusColor(proj.status),
                                                        backgroundColor: `${getStatusColor(proj.status)}15`,
                                                        border: `1px solid ${getStatusColor(proj.status)}40`
                                                    }}
                                                >
                                                    {proj.status}
                                                </Badge>
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
                            <div key={idx} className="mb-5 projects-todo-section">
                                <div className="p-3 rounded-top-4" style={{ background: 'linear-gradient(259.82deg, #EFECE4 -24.5%, #40878E 99.17%)' }}>
                                    <h6 className="fw-bold mb-0 text-white">{section.title}</h6>
                                </div>
                                <div className="border border-top-0 rounded-bottom-4 bg-white projects-todo-list" style={{ borderColor: '#eff2f5' }}>
                                    {section.tasks.map((task, tidx) => (
                                        <div key={tidx} className={`p-4 d-flex align-items-center justify-content-between projects-todo-row ${tidx !== section.tasks.length - 1 ? 'border-bottom' : ''}`} style={{ borderColor: '#eff2f5' }}>
                                            <div className="d-flex align-items-center gap-3">
                                                <span className="fw-medium text-dark" style={{ fontSize: '1.05rem' }}>{task.title}</span>
                                                <Badge bg="transparent" className="border text-muted fw-normal px-3 py-2 rounded-2" style={{ fontSize: '0.8rem', backgroundColor: '#f8f9fa' }}>{task.type}</Badge>
                                            </div>
                                            <div className="projects-todo-status-wrap" style={{ width: '150px' }}>
                                                <CustomSelect
                                                    options={todoStatusOptions}
                                                    value={todoStatuses[`${section.title}-${tidx}`] || task.status}
                                                    onChange={(event) => setTodoStatuses((prev) => ({
                                                        ...prev,
                                                        [`${section.title}-${tidx}`]: event.target.value
                                                    }))}
                                                    className="compact-project-select"
                                                />
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
