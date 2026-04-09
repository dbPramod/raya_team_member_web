import { useState } from 'react';
import { Container, Row, Col, Card, ProgressBar, Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import trainingAvatar from '../../assets/images/training_avatar.png';

const TrainingDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('lesson'); // 'lesson' or 'quiz'
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const status = location.state?.status || 'inProgress';
    const selectedTraining = location.state?.training;
    const progressByStatus = {
        notStarted: 0,
        inProgress: selectedTraining?.progress ?? 50,
        completed: 100
    };
    const currentProgress = progressByStatus[status] ?? 50;
    const isCompletedTraining = status === 'completed';

    const lessonData = {
        title: selectedTraining?.title || 'Workplace Safety Basics',
        description: selectedTraining?.description || 'Learn essential workplace safety guidelines, hazard prevention, and emergency procedures hazard prevention, and emergency procedures..',
        progress: currentProgress,
        lessonsCount: 1,
        quizzesCount: 2,
        videoUrl: 'https://archive.org/download/SampleVideo1280x7205mb/SampleVideo_1280x720_5mb.mp4',
        transcription: 'Learn essential workplace safety guidelines, hazard prevention, and emergency procedures hazard prevention, and emergency procedures. Understand data security principles, privacy regulations, and best practices for handling sensitive information. Explore agile methodologies, sprint planning, and team collaboration to enhance project delivery. Explore agile methodologies, sprint planning, and team collaboration to enhance project delivery.'
    };

    const quizQuestions = [
        {
            id: 1,
            question: "1. What is the first thing you should do if you notice a safety hazard at the workplace?",
            options: [
                "Ignore it if no one is hurt",
                "Try to fix it yourself without informing anyone",
                "Report it to a supervisor or safety officer",
                "Wait until an accident happens"
            ]
        },
        {
            id: 2,
            question: "2. Why is wearing personal protective equipment (PPE) important?",
            options: [
                "It improves work speed",
                "It helps prevent injuries and accidents",
                "It is only required for visitors",
                "It makes employees look professional"
            ]
        },
        {
            id: 5,
            question: "5. When should workplace safety training be reviewed?",
            options: [
                "Only during onboarding",
                "Once every five years",
                "Regularly and whenever procedures change",
                "Only after an accident occurs"
            ]
        }
    ];

    const handleOptionSelect = (questionId, option) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: option
        });
    };

    return (
        <Container fluid className="px-lg-5 py-4 vh-100 d-flex flex-column bg-white overflow-hidden">
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

            <Row className="gx-5 flex-grow-1 overflow-hidden">
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
                                    className="custom-progress mb-3"
                                />
                                {isCompletedTraining && (
                                    <Button
                                        variant="outline-primary"
                                        className="w-100 fw-bold border-1 py-2 training-cert-btn"
                                        style={{ color: '#3d8b8b', borderColor: '#3d8b8b', borderRadius: '10px', fontSize: '0.9rem' }}
                                        onClick={() => navigate('/training/certificate')}
                                    >
                                        <i className="bi bi-award me-2"></i>
                                        View Certification
                                    </Button>
                                )}
                            </div>
                        </Card.Body>
                    </Card>

                    <div className="rounded-4 overflow-hidden shadow-sm" style={{ border: '1px solid #e9ecef' }}>
                        <div
                            className={`d-flex align-items-center justify-content-between p-3 border-bottom pointer transition-all ${activeTab === 'lesson' ? 'bg-aliceblue' : 'bg-white'}`}
                            onClick={() => setActiveTab('lesson')}
                        >
                            <div className="d-flex align-items-center gap-3">
                                <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '42px', height: '42px', backgroundColor: activeTab === 'lesson' ? '#ffffff' : '#f0f4f4', boxShadow: activeTab === 'lesson' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}>
                                    <i className="bi bi-camera-video fs-5" style={{ color: '#3d8b8b' }}></i>
                                </div>
                                <span className={`fw-bold ${activeTab === 'lesson' ? 'text-dark' : 'text-muted'}`} style={{ fontSize: '0.95rem' }}>Lesson</span>
                            </div>
                            <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" style={{ width: '28px', height: '28px', backgroundColor: '#3d8b8b', fontSize: '0.85rem' }}>
                                <i className="bi bi-check-lg"></i>
                            </div>
                        </div>
                        <div
                            className={`d-flex align-items-center justify-content-between p-3 pointer transition-all ${activeTab === 'quiz' ? 'bg-aliceblue' : 'bg-white'}`}
                            onClick={() => setActiveTab('quiz')}
                        >
                            <div className="d-flex align-items-center gap-3">
                                <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '42px', height: '42px', backgroundColor: activeTab === 'quiz' ? '#ffffff' : '#f0f4f4', boxShadow: activeTab === 'quiz' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}>
                                    <i className="bi bi-file-earmark-text fs-5" style={{ color: '#3d8b8b' }}></i>
                                </div>
                                <span className={`fw-bold ${activeTab === 'quiz' ? 'text-dark' : 'text-muted'}`} style={{ fontSize: '0.95rem' }}>Quiz</span>
                            </div>
                            <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" style={{ width: '28px', height: '28px', backgroundColor: activeTab === 'quiz' ? '#3d8b8b' : '#dee2e6', fontSize: '0.85rem' }}>
                                {lessonData.quizzesCount}
                            </div>
                        </div>
                    </div>
                </Col>

                {/* Right Column Content */}
                <Col lg={8} className="h-100 overflow-y-auto custom-scrollbar pb-5">
                    {activeTab === 'lesson' ? (
                        <>
                            {/* Real Video Player */}
                            <div className="position-relative overflow-hidden rounded-4 shadow-lg bg-dark" style={{ aspectRatio: '16/9', border: '1px solid #e2e8f0' }}>
                                <video
                                    className="w-100 h-100 object-fit-contain"
                                    controls
                                    poster={trainingAvatar}
                                    playsInline
                                >
                                    <source src={lessonData.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            {/* Transcription Section for Lesson */}
                            <div className="mt-5 pt-3 mb-5 border-top border-light">
                                <h5 className="fw-bold mb-4" style={{ color: '#0f1d3a', fontSize: '1.25rem' }}>Transcription</h5>
                                <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.9', maxWidth: '1000px', fontWeight: '400' }}>
                                    {lessonData.transcription}
                                </p>
                            </div>
                        </>
                    ) : (
                        /* Quiz Content UI */
                        <div className="quiz-container">
                            {quizQuestions.map((q) => (
                                <div key={q.id} className="mb-5 p-4 rounded-4" style={{ backgroundColor: '#f8fbfc' }}>
                                    <h5 className="fw-bold mb-4" style={{ color: '#0f1d3a', fontSize: '1.1rem', lineHeight: '1.5' }}>{q.question}</h5>
                                    <div className="d-flex flex-column gap-3">
                                        {q.options.map((option, idx) => (
                                            <div
                                                key={idx}
                                                className={`option-card p-3 rounded-3 pointer transition-all ${selectedAnswers[q.id] === option ? 'border-teal bg-white shadow-sm' : 'border-light bg-white'}`}
                                                onClick={() => handleOptionSelect(q.id, option)}
                                                style={{
                                                    border: '1px solid',
                                                    borderColor: selectedAnswers[q.id] === option ? '#3d8b8b' : '#eff2f5',
                                                    fontSize: '0.95rem',
                                                    color: '#495057'
                                                }}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="d-flex justify-content-end mt-4 mb-5 gap-3">
                                <Button
                                    className="px-5 py-2 fw-bold border-0 shadow-sm"
                                    style={{ backgroundColor: '#3d8b8b', borderRadius: '10px' }}
                                    onClick={() => {
                                        if (isCompletedTraining) {
                                            navigate('/training/certificate');
                                            return;
                                        }

                                        navigate('/training');
                                    }}
                                >
                                    {isCompletedTraining ? 'View Certificate' : 'Submit'}
                                </Button>
                            </div>
                        </div>
                    )}
                </Col>
            </Row>

            <style>{`
                .bg-aliceblue {
                    background-color: #eef7f7 !important;
                }
                .border-teal {
                    border-color: #3d8b8b !important;
                }
                .option-card:hover {
                    background-color: #f8f9fa !important;
                    border-color: #dee2e6 !important;
                }
                .transition-all {
                    transition: all 0.2s ease-in-out;
                }
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
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #dee2e6;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #3d8b8b;
                }
                .training-cert-btn,
                .training-cert-btn:hover,
                .training-cert-btn:focus,
                .training-cert-btn:active,
                .training-cert-btn:focus-visible,
                .btn-check:checked + .training-cert-btn,
                :not(.btn-check) + .training-cert-btn:active {
                    color: #3d8b8b !important;
                    border-color: #3d8b8b !important;
                    background-color: transparent !important;
                    box-shadow: none !important;
                }
                .training-cert-btn:hover {
                    background-color: #eef7f7 !important;
                }
            `}</style>
        </Container>
    );
};

export default TrainingDetail;
