import React, { useState } from 'react';
import { Container, Nav, Row, Col, Badge, Button, Card, Modal } from 'react-bootstrap';
import './SwannOS.css';

const SwannOS = () => {
    const [activeTab, setActiveTab] = useState('assessments');
    const [showModal, setShowModal] = useState(false);
    const [activeAssessment, setActiveAssessment] = useState('');
    const [selectedOptions, setSelectedOptions] = useState({});

    const assessments = [
        { name: 'DISC', status: 'Take test', type: 'pending', required: true },
        { name: 'Enneagram', status: 'Completed', type: 'done', required: true },
        { name: 'Love Language', status: 'Take test', type: 'pending', required: false },
        { name: 'Human Design', status: 'Take test', type: 'pending', required: false },
        { name: 'Myers-Briggs', status: 'Completed', type: 'done', required: false }
    ];

    const questions = [
        {
            id: 1,
            text: "1. What is the first thing you should do if you notice a safety hazard at the workplace?",
            options: [
                "Ignore it if no one is hurt",
                "Try to fix it yourself without informing anyone",
                "Report it to a supervisor or safety officer",
                "Wait until an accident occurs"
            ]
        },
        {
            id: 2,
            text: "2. Why is wearing personal protective equipment (PPE) important?",
            options: [
                "It improves work speed",
                "It helps prevent injuries and accidents",
                "It is only required for visitors",
                "It makes employees appear professional."
            ]
        },
        {
            id: 3,
            text: "3. How often should safety inspections be carried out?",
            options: [
                "Only after an accident",
                "Once a year",
                "Regularly as per company policy",
                "When requested by employees"
            ]
        }
    ];

    const handleOptionSelect = (questionId, option) => {
        setSelectedOptions(prev => ({
            ...prev,
            [questionId]: option
        }));
    };

    const handleTakeTest = (name) => {
        setActiveAssessment(name);
        setShowModal(true);
    };

    const discData = [
        { label: 'The Engine (D)', value: 88, color: '#c05621' },
        { label: 'Signal (I)', value: 86, color: '#e0b04a' },
        { label: 'Cruise Control (S)', value: 4, color: '#68a08c' },
        { label: 'Navigation System (C)', value: 8, color: '#2d3748' }
    ];

    const renderAssessments = () => (
        <div className="mt-0">
            <h1 className="fw-bold mb-4" style={{ color: '#0f1d3a' }}>Assessments</h1>
            <div className="border rounded-4 overflow-hidden shadow-sm bg-white">
                <div className="assessment-header">Assessments</div>
                {assessments.map((item, index) => (
                    <div key={index} className="assessment-row d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-1">
                            <span className="fw-medium text-secondary" style={{ fontSize: '1.05rem' }}>{item.name}</span>
                            {item.required && <span className="text-danger">*</span>}
                        </div>
                        <div>
                            {item.type === 'done' ? (
                                <Badge className="badge-completed">Completed</Badge>
                            ) : (
                                <Button variant="outline-dark" className="btn-take-test" onClick={() => handleTakeTest(item.name)}>Take test</Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderProfile = () => (
        <div className="mt-4">
            <h1 className="fw-bold mb-4" style={{ color: '#0f1d3a' }}>Swann OS</h1>

            {/* Overall Personality Header */}
            <div className="personality-card mb-5 shadow-sm">
                <h5 className="text-uppercase fw-bold mb-3 ls-1 opacity-75" style={{ fontSize: '1.2rem' }}>OVER ALL PERSONALITY</h5>
                <p className="mb-0 lh-lg opacity-90" style={{ fontSize: '1.1rem', maxWidth: '900px' }}>
                    You exhibit strong leadership qualities and excel in team collaboration. Your communication style is direct yet empathetic,
                    making you effective in both guiding and supporting your colleagues. You thrive in dynamic environments and
                    demonstrate high adaptability to change.
                </p>
            </div>

            {/* DISC Profile Detail */}
            <div className="disc-chart-container shadow-sm p-4 bg-white border-0">
                <Row className="align-items-start g-4">
                    <Col lg={7}>
                        <div className="d-flex align-items-start h-100 ps-2">
                            {/* Y-Axis Labels */}
                            <div className="y-axis-container pt-2 mt-5" style={{ height: '220px', marginTop: '105px' }}>
                                <span>100</span>
                                <span>80</span>
                                <span>60</span>
                                <span>40</span>
                                <span>20</span>
                                <span>0</span>
                            </div>

                            {/* Chart Bars */}
                            <div className="d-flex justify-content-around align-items-start flex-grow-1">
                                {discData.map((bar, i) => (
                                    <div key={i} className="text-center d-flex flex-column align-items-center">
                                        {/* Label Section (TOP) */}
                                        <div className="mb-4" style={{ minHeight: '80px' }}>
                                            <div className="fw-bold text-dark mb-2" style={{ fontSize: '0.9rem', color: bar.color, whiteSpace: 'nowrap' }}>{bar.label}</div>
                                            <i className="bi bi-question-circle text-muted fs-5 pointer"></i>
                                        </div>

                                        {/* Bar Section */}
                                        <div className="d-flex flex-column align-items-center justify-content-end mb-3" style={{ height: '220px', width: '60px' }}>
                                            <div
                                                className="bar-pill shadow-sm"
                                                style={{
                                                    height: `${bar.value}%`,
                                                    backgroundColor: bar.color,
                                                    width: '50px',
                                                    borderRadius: '12px'
                                                }}
                                            ></div>
                                        </div>

                                        {/* Score Circle (BOTTOM) */}
                                        <div className="score-circle" style={{ borderColor: bar.color, color: '#1a202c' }}>
                                            {bar.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                    <Col lg={5} className="ps-lg-5 pt-4">
                        <div className="border-start ps-lg-5 h-100 d-flex flex-column justify-content-center" style={{ minHeight: '350px' }}>
                            <h2 className="fw-bold mb-4" style={{ color: '#0f1d3a', fontSize: '2.2rem' }}>You are dual mode operator</h2>
                            <div className="mb-4">
                                <h5 className="fw-bold text-dark mb-3">Primary Mode: <span className="text-secondary fw-normal">Engine (D)</span></h5>
                                <h5 className="fw-bold text-dark mb-0">Secondary Mode: <span className="text-secondary fw-normal">Navigation System (C)</span></h5>
                            </div>
                            <p className="text-secondary mb-0 lh-base" style={{ fontSize: '1.05rem' }}>
                                You are highly adaptable and adjust your approach based on context, pressure, and responsibility.
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );

    return (
        <Container fluid className="px-lg-4 py-3 swann-os-container bg-white" style={{ minHeight: 'calc(100vh - 80px)' }}>
            {/* Top Navigation Tabs */}
            <div className="flex-shrink-0 border-bottom">
                <Nav variant="tabs" className="swann-os-tabs border-0" activeKey={activeTab}>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="assessments"
                            className={activeTab === 'assessments' ? 'active' : ''}
                            onClick={() => setActiveTab('assessments')}
                        >
                            Assessments
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="swann-os"
                            className={activeTab === 'swann-os' ? 'active' : ''}
                            onClick={() => setActiveTab('swann-os')}
                        >
                            Swann OS™
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>

            {/* Main Content Area */}
            <div className="pb-5">
                {activeTab === 'assessments' ? renderAssessments() : renderProfile()}
            </div>

            {/* Assessment Modal */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                size="lg"
                className="assessment-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{activeAssessment} Assessment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {questions.map((q) => (
                        <div key={q.id} className="question-block">
                            <div className="question-text">{q.text}</div>
                            <div className="options-list">
                                {q.options.map((opt, i) => (
                                    <div
                                        key={i}
                                        className={`option-card ${selectedOptions[q.id] === opt ? 'selected' : ''}`}
                                        onClick={() => handleOptionSelect(q.id, opt)}
                                    >
                                        {opt}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button
                        variant="light"
                        className="btn-cancel"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="btn-submit-premium"
                        onClick={() => setShowModal(false)}
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default SwannOS;
