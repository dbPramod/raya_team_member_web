import { Container, Row, Col } from 'react-bootstrap';
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

    const columns = [
        {
            key: 'notStarted',
            title: 'Not started',
            icon: 'bi bi-clock-history',
            wrapperClass: 'training-lane not-started',
            countClass: 'training-lane-count not-started'
        },
        {
            key: 'inProgress',
            title: 'In progress',
            icon: 'bi bi-circle',
            wrapperClass: 'training-lane in-progress',
            countClass: 'training-lane-count in-progress'
        },
        {
            key: 'completed',
            title: 'Completed',
            icon: 'bi bi-check-circle',
            wrapperClass: 'training-lane completed',
            countClass: 'training-lane-count completed'
        }
    ];

    const renderActionButton = (statusKey, item) => {
        if (statusKey === 'completed') {
            return (
                <button
                    type="button"
                    className="training-action-btn completed"
                    onClick={() => navigate('/training/detail', { state: { status: statusKey, training: item } })}
                >
                    View Certificate
                </button>
            );
        }

        if (statusKey === 'inProgress') {
            return (
                <button
                    type="button"
                    className="training-action-btn in-progress"
                    onClick={() => navigate('/training/detail', { state: { status: statusKey, training: item } })}
                >
                    Resume
                </button>
            );
        }

        return (
            <button
                type="button"
                className="training-action-btn not-started"
                onClick={() => navigate('/training/detail', { state: { status: statusKey, training: item } })}
            >
                Start
            </button>
        );
    };

    return (
        <Container fluid className="training-page px-lg-4 py-4 h-100 overflow-auto">
            <div className="training-heading-wrap">
                <h2 className="training-page-title mb-0">Training</h2>
                <i className="bi bi-question-circle training-help-icon"></i>
            </div>

            <Row className="g-4">
                {columns.map((column) => {
                    const items = trainingData[column.key];
                    return (
                        <Col key={column.key} lg={4}>
                            <div className={column.wrapperClass}>
                                <div className="training-lane-head">
                                    <div className="d-flex align-items-center gap-2">
                                        <i className={`${column.icon} training-lane-icon`}></i>
                                        <h5 className="training-lane-title mb-0">{column.title}</h5>
                                    </div>
                                    <span className={column.countClass}>{items.length}</span>
                                </div>

                                <div className="training-lane-list">
                                    {items.map((item) => (
                                        <div key={item.id} className="training-task-card">
                                            <h6 className="training-task-title">{item.title}</h6>
                                            <p className="training-task-desc">{item.description}</p>

                                            {column.key === 'inProgress' ? (
                                                <div className="training-progress-wrap">
                                                    <div className="training-progress-label">{item.progress}%</div>
                                                    <div className="training-progress-track">
                                                        <div
                                                            className="training-progress-fill"
                                                            style={{ width: `${item.progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ) : null}

                                            {renderActionButton(column.key, item)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    );
                })}
            </Row>

            <style>{`
                .training-page {
                    background: #f8fafc;
                }
                .training-heading-wrap {
                    display: flex;
                    align-items: center;
                    gap: 0.65rem;
                    margin-bottom: 1.35rem;
                    padding-left: 0.25rem;
                }
                .training-page-title {
                    font-size: 2rem;
                    line-height: 1.1;
                    font-weight: 800;
                    color: #111827;
                    letter-spacing: -0.01em;
                }
                .training-help-icon {
                    color: #64748b;
                    font-size: 1.2rem;
                }
                .training-lane {
                    border-radius: 16px;
                    padding: 14px;
                    height: 100%;
                    border: 1px solid rgba(148, 163, 184, 0.15);
                }
                .training-lane.not-started {
                    background: #f1f3f5;
                }
                .training-lane.in-progress {
                    background: #f9f1e8;
                }
                .training-lane.completed {
                    background: #edf8ef;
                }
                .training-lane-head {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 12px;
                    padding: 2px 2px 0;
                }
                .training-lane-icon {
                    font-size: 1.2rem;
                    color: #475569;
                }
                .training-lane.in-progress .training-lane-icon {
                    color: #8d5e32;
                }
                .training-lane.completed .training-lane-icon {
                    color: #2f8f43;
                }
                .training-lane-title {
                    color: #3f3f46;
                    font-size: 2rem;
                    font-weight: 700;
                }
                .training-lane.in-progress .training-lane-title {
                    color: #8d5e32;
                }
                .training-lane.completed .training-lane-title {
                    color: #2f8f43;
                }
                .training-lane-count {
                    width: 30px;
                    height: 30px;
                    border-radius: 999px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: #ffffff;
                    font-size: 0.88rem;
                    font-weight: 700;
                    line-height: 1;
                }
                .training-lane-count.not-started {
                    background: #52525b;
                }
                .training-lane-count.in-progress {
                    background: #8d5e32;
                }
                .training-lane-count.completed {
                    background: #2f8f43;
                }
                .training-lane-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .training-task-card {
                    background: #ffffff;
                    border: 1px solid #eceff3;
                    border-radius: 12px;
                    padding: 14px 16px;
                    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .training-task-card:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
                }
                .training-task-title {
                    margin: 0;
                    padding-bottom: 8px;
                    border-bottom: 1px solid #e5e7eb;
                    font-size: 1.12rem;
                    line-height: 1.25;
                    font-weight: 700;
                    color: #1f2937;
                }
                .training-task-desc {
                    margin: 10px 0 12px;
                    color: #6b7280;
                    font-size: 0.88rem;
                    line-height: 1.4;
                    min-height: 70px;
                }
                .training-progress-wrap {
                    margin-bottom: 11px;
                }
                .training-progress-label {
                    text-align: right;
                    color: #9ca3af;
                    font-size: 0.8rem;
                    font-weight: 700;
                    margin-bottom: 2px;
                }
                .training-progress-track {
                    width: 100%;
                    height: 10px;
                    border-radius: 999px;
                    background: #d1d5db;
                    overflow: hidden;
                }
                .training-progress-fill {
                    height: 100%;
                    border-radius: inherit;
                    background: linear-gradient(90deg, #111827 0%, #4d8f95 100%);
                }
                .training-action-btn {
                    width: 100%;
                    border: none;
                    border-radius: 9px;
                    height: 34px;
                    font-size: 0.86rem;
                    font-weight: 700;
                    transition: all 0.2s ease;
                }
                .training-action-btn.not-started {
                    background: #e5e7eb;
                    color: #3f3f46;
                }
                .training-action-btn.in-progress {
                    background: #f3d9bf;
                    color: #8d5e32;
                }
                .training-action-btn.completed {
                    background: #ace8b2;
                    color: #1d6a2a;
                }
                .training-action-btn:hover {
                    filter: brightness(0.98);
                    transform: translateY(-1px);
                }
                @media (max-width: 1399px) {
                    .training-page-title {
                        font-size: 1.85rem;
                    }
                    .training-lane-title {
                        font-size: 1.95rem;
                    }
                    .training-task-title {
                        font-size: 1.65rem;
                    }
                }
                @media (max-width: 991px) {
                    .training-page {
                        padding-bottom: 2rem !important;
                    }
                    .training-page-title {
                        font-size: 1.7rem;
                    }
                    .training-lane-title {
                        font-size: 1.35rem;
                    }
                    .training-task-title {
                        font-size: 1.12rem;
                    }
                }
            `}</style>
        </Container>
    );
};

export default Training;
