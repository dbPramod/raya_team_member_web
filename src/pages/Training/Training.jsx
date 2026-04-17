import { Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Training = () => {
    const navigate = useNavigate();

    const renderTooltip = (props) => (
        <Tooltip id="training-help-tooltip" className="custom-training-tooltip" {...props}>
            CEO Hub is where you can take training, earn certificates, and get personality insights.

        </Tooltip>
    );

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
            <div className="training-heading-wrap mb-4">
                <h2 className="training-page-title mb-0">Trainings</h2>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 300, hide: 300 }}
                    overlay={renderTooltip}
                >
                    <i className="bi bi-info-circle training-help-icon ms-2 pointer"></i>
                </OverlayTrigger>
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

        </Container>
    );
};

export default Training;
