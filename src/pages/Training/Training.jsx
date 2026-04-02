import { Container, Row, Col, Card, ProgressBar, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Training = () => {
    const navigate = useNavigate();
    const trainingData = {
        notStarted: [
            {
                id: 1,
                title: 'Company Code and Conduct',
                description: 'Overview of company policies, ethical standards, and expected professional behavior.'
            },
            {
                id: 2,
                title: 'Company Code and Conduct',
                description: 'Overview of company policies, ethical standards, and expected professional behavior.'
            }
        ],
        inProgress: [
            {
                id: 3,
                title: 'Data Protection & Privacy',
                description: 'Understand data security principles, privacy regulations, and best practices for handling sensitive information.',
                progress: 40
            },
            {
                id: 4,
                title: 'Data Protection & Privacy',
                description: 'Understand data security principles, privacy regulations, and best practices for handling sensitive information.',
                progress: 50
            }
        ],
        completed: [
            {
                id: 5,
                title: 'Workplace Safety Basics',
                description: 'Learn essential workplace safety guidelines, hazard prevention, and emergency procedures.'
            },
            {
                id: 6,
                title: 'Workplace Safety Basics',
                description: 'Learn essential workplace safety guidelines, hazard prevention, and emergency procedures.'
            },
            {
                id: 7,
                title: 'Workplace Safety Basics',
                description: 'Learn essential workplace safety guidelines, hazard prevention, and emergency procedures.'
            },
            {
                id: 8,
                title: 'Workplace Safety Basics',
                description: 'Learn essential workplace safety guidelines, hazard prevention, and emergency procedures.'
            }
        ]
    };

    const renderCard = (item, status) => {
        let buttonText = 'Start';
        let buttonBg = '#E9ECEF';
        let buttonColor = '#495057';

        if (status === 'inProgress') {
            buttonText = 'Resume';
            buttonBg = '#FDE6D2';
            buttonColor = '#8D5E32';
        } else if (status === 'completed') {
            buttonText = 'View Certificate';
            buttonBg = '#D1FAE5';
            buttonColor = '#065F46';
        }

        return (
            <Card key={item.id} className="border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
                <Card.Body className="p-4">
                    <h6 className="fw-bold mb-3" style={{ fontSize: '1rem', color: '#111827', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.title}</h6>
                    <p className="small text-muted mb-4" style={{ fontSize: '0.85rem', lineHeight: '1.6', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {item.description}
                    </p>
                    
                    {status === 'inProgress' && (
                        <div className="mb-4">
                            <div className="d-flex justify-content-end mb-2">
                                <span className="fw-bold" style={{ fontSize: '0.75rem', color: '#6B7280' }}>{item.progress}%</span>
                            </div>
                            <div className="progress" style={{ height: '6px', backgroundColor: '#E5E7EB', borderRadius: '10px' }}>
                                <div 
                                    className="progress-bar" 
                                    role="progressbar" 
                                    style={{ width: `${item.progress}%`, backgroundColor: '#3d8b8b' }} 
                                    aria-valuenow={item.progress} 
                                    aria-valuemin="0" 
                                    aria-valuemax="100"
                                ></div>
                            </div>
                        </div>
                    )}
                    
                    <button 
                        className="w-100 border-0 py-2 fw-medium transition-all" 
                        onClick={() => (status === 'notStarted' || status === 'inProgress') && navigate('/training/detail')}
                        style={{ 
                            backgroundColor: buttonBg, 
                            color: buttonColor, 
                            borderRadius: '8px', 
                            fontSize: '0.85rem',
                            fontFamily: "'Plus Jakarta Sans', sans-serif"
                        }}
                    >
                        {buttonText}
                    </button>
                </Card.Body>
            </Card>
        );
    };

    return (
        <Container fluid className="px-lg-4 py-4 h-100 overflow-auto bg-white">
            <h3 className="fw-bold mb-4 ms-2" style={{ color: '#000000', fontSize: '1.75rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Training</h3>
            
            <Row className="gx-4 mx-0">
                {/* Not started column */}
                <Col md={4} className="mb-4">
                    <div className="rounded-4 p-4 h-100" style={{ backgroundColor: '#F3F5F8' }}>
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-record-circle fs-5" style={{ color: '#6B7280' }}></i>
                                <h6 className="fw-bold mb-0" style={{ color: '#374151', fontSize: '1.1rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Not started</h6>
                            </div>
                            <div className="rounded-pill d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" style={{ width: '26px', height: '26px', fontSize: '0.85rem', backgroundColor: '#475569', minWidth: '26px' }}>
                                {trainingData.notStarted.length}
                            </div>
                        </div>
                        {trainingData.notStarted.map(item => renderCard(item, 'notStarted'))}
                    </div>
                </Col>

                {/* In progress column */}
                <Col md={4} className="mb-4">
                    <div className="rounded-4 p-4 h-100" style={{ backgroundColor: '#FEF3E7' }}>
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-circle fs-5" style={{ color: '#8D5E32' }}></i>
                                <h6 className="fw-bold mb-0" style={{ color: '#8D5E32', fontSize: '1.1rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>In progress</h6>
                            </div>
                            <div className="rounded-pill d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" style={{ width: '26px', height: '26px', fontSize: '0.85rem', backgroundColor: '#92400E', minWidth: '26px' }}>
                                {trainingData.inProgress.length}
                            </div>
                        </div>
                        {trainingData.inProgress.map(item => renderCard(item, 'inProgress'))}
                    </div>
                </Col>

                {/* Completed column */}
                <Col md={4} className="mb-4">
                    <div className="rounded-4 p-4 h-100" style={{ backgroundColor: '#F2FAF5' }}>
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-check-circle fs-5" style={{ color: '#059669' }}></i>
                                <h6 className="fw-bold mb-0" style={{ color: '#059669', fontSize: '1.1rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Completed</h6>
                            </div>
                            <div className="rounded-pill d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" style={{ width: '26px', height: '26px', fontSize: '0.85rem', backgroundColor: '#059669', minWidth: '26px' }}>
                                {trainingData.completed.length}
                            </div>
                        </div>
                        {trainingData.completed.map(item => renderCard(item, 'completed'))}
                    </div>
                </Col>
            </Row>

            <style>{`
                .progress-bar {
                    background-color: #0f1d3a !important;
                }
                .transition-all {
                    transition: all 0.2s ease-in-out;
                }
                .transition-all:hover {
                    opacity: 0.8;
                }
            `}</style>
        </Container>
    );
};

export default Training;
