import { Container, Row, Col, Card, ProgressBar, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import trainingAvatar from '../../assets/images/training_avatar.png';

const TrainingDetail = () => {
    const navigate = useNavigate();

    const lessonData = {
        title: 'Workplace Safety Basics',
        description: 'Learn essential workplace safety guidelines, hazard prevention, and emergency procedures hazard prevention, and emergency procedures..',
        progress: 50,
        lessonsCount: 1,
        quizzesCount: 2,
        transcription: 'Learn essential workplace safety guidelines, hazard prevention, and emergency procedures hazard prevention, and emergency procedures. Understand data security principles, privacy regulations, and best practices for handling sensitive information. Explore agile methodologies, sprint planning, and team collaboration to enhance project delivery. Explore agile methodologies, sprint planning, and team collaboration to enhance project delivery.'
    };

    return (
        <Container fluid className="px-lg-5 py-4 h-100 overflow-auto bg-white">
            {/* Header with Back Arrow */}
            <div className="d-flex align-items-center gap-3 mb-5">
                <button 
                    onClick={() => navigate('/training')} 
                    className="border-0 bg-transparent p-0 d-flex align-items-center justify-content-center text-dark"
                >
                    <i className="bi bi-arrow-left fs-3" style={{ color: '#0f1d3a' }}></i>
                </button>
                <h3 className="fw-bold mb-0" style={{ fontSize: '1.8rem', color: '#0f1d3a', letterSpacing: '-0.02em' }}>{lessonData.title}</h3>
            </div>

            <Row className="gx-5">
                {/* Left Column: Overview and List */}
                <Col lg={4} className="mb-4">
                    <Card className="border-0 bg-white mb-4 shadow-sm" style={{ borderRadius: '16px', backgroundColor: '#f8f9fa' }}>
                        <Card.Body className="p-4">
                            <h5 className="fw-bold mb-3" style={{ fontSize: '1.15rem', color: '#0f1d3a' }}>{lessonData.title}</h5>
                            <p className="text-muted mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                                {lessonData.description}
                            </p>
                            
                            <div className="mt-auto pt-2">
                                <div className="d-flex justify-content-end mb-2">
                                    <span className="fw-bold" style={{ fontSize: '0.85rem', color: '#3d8b8b' }}>{lessonData.progress}%</span>
                                </div>
                                <ProgressBar 
                                    now={lessonData.progress} 
                                    style={{ height: '8px', backgroundColor: '#e9ecef', borderRadius: '10px' }} 
                                    className="custom-progress"
                                />
                            </div>
                        </Card.Body>
                    </Card>

                    <div className="rounded-4 overflow-hidden shadow-sm" style={{ border: '1px solid #e9ecef' }}>
                        <div className="bg-white d-flex align-items-center justify-content-between p-3 border-bottom">
                            <div className="d-flex align-items-center gap-3">
                                <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '42px', height: '42px', backgroundColor: '#f0f4f4' }}>
                                    <i className="bi bi-camera-video fs-5" style={{ color: '#3d8b8b' }}></i>
                                </div>
                                <span className="fw-bold text-dark" style={{ fontSize: '0.95rem' }}>Lesson</span>
                            </div>
                            <div className="rounded-pill d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" style={{ width: '28px', height: '28px', backgroundColor: '#3d8b8b', fontSize: '0.85rem' }}>
                                {lessonData.lessonsCount}
                            </div>
                        </div>
                        <div className="bg-white d-flex align-items-center justify-content-between p-3">
                            <div className="d-flex align-items-center gap-3">
                                <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '42px', height: '42px', backgroundColor: '#f0f4f4' }}>
                                    <i className="bi bi-file-earmark-text fs-5" style={{ color: '#3d8b8b' }}></i>
                                </div>
                                <span className="fw-bold text-dark" style={{ fontSize: '0.95rem' }}>Quiz</span>
                            </div>
                            <div className="rounded-pill d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" style={{ width: '28px', height: '28px', backgroundColor: '#3d8b8b', fontSize: '0.85rem' }}>
                                {lessonData.quizzesCount}
                            </div>
                        </div>
                    </div>
                </Col>

                {/* Right Column: Video Player UI */}
                <Col lg={8} className="mb-4">
                    <div className="position-relative overflow-hidden rounded-4 shadow-lg bg-dark" style={{ aspectRatio: '16/9' }}>
                        <img 
                            src={trainingAvatar} 
                            alt="Training Content" 
                            className="w-100 h-100 object-fit-cover opacity-75"
                        />
                        
                        {/* Video Controls Overlay Mockup */}
                        <div className="position-absolute bottom-0 start-0 w-100 p-4 pb-3" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.85))' }}>
                            <div className="d-flex flex-column gap-3">
                                {/* seeker bar */}
                                <div className="position-relative" style={{ height: '4px', background: 'rgba(255,255,255,0.25)', borderRadius: '2px' }}>
                                    <div className="position-absolute start-0 top-0 h-100" style={{ width: '70%', background: '#3d8b8b', borderRadius: '2px' }}></div>
                                    <div className="position-absolute shadow" style={{ left: '70%', top: '-6px', width: '16px', height: '16px', background: '#ffffff', borderRadius: '50%', border: '2px solid #3d8b8b' }}></div>
                                </div>

                                <div className="d-flex align-items-center justify-content-center gap-5 text-white">
                                    <i className="bi bi-chevron-double-left fs-4 pointer opacity-75 hover-opacity-100"></i>
                                    <div className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm pointer" style={{ width: '64px', height: '64px' }}>
                                        <i className="bi bi-play-fill" style={{ fontSize: '2.5rem', color: '#0f1d3a', marginLeft: '4px' }}></i>
                                    </div>
                                    <i className="bi bi-chevron-double-right fs-4 pointer opacity-75 hover-opacity-100"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Transcription Section */}
            <div className="mt-5 pt-3 mb-5 border-top border-light">
                <h5 className="fw-bold mb-4" style={{ color: '#0f1d3a', fontSize: '1.25rem' }}>Transcription</h5>
                <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.9', maxWidth: '1000px', fontWeight: '400' }}>
                    {lessonData.transcription}
                </p>
            </div>

            <style>{`
                .custom-progress .progress-bar {
                    background-color: #3d8b8b !important;
                }
                .pointer {
                    cursor: pointer;
                }
                .hover-opacity-100:hover {
                    opacity: 1 !important;
                }
                h3, h5, span, p {
                    font-family: 'Plus Jakarta Sans', sans-serif !important;
                }
            `}</style>
        </Container>
    );
};

export default TrainingDetail;
