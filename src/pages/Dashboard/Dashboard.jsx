import { useState } from 'react';
import { Container, Row, Col, Card, ProgressBar, Badge, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import AnimatedCounter from '../../components/common/AnimatedCounter';

const MENTAL_HEALTH_HISTORY_KEY = 'swann-mental-health-history';

const Dashboard = () => {
  const navigate = useNavigate();
  const [mentalHealthValue, setMentalHealthValue] = useState(1);
  const [mentalHealthNote, setMentalHealthNote] = useState('');
  const [isMentalHealthCheckedIn, setIsMentalHealthCheckedIn] = useState(false);
  const [latestMentalEntry, setLatestMentalEntry] = useState(null);

  const getDefaultFeelingText = (value) => {
    const numericValue = Number(value);

    if (numericValue >= 8) return "I'm feeling good";
    if (numericValue >= 6) return "I'm feeling okay";
    if (numericValue >= 4) return "I'm feeling low";
    return 'I need support today';
  };

  const handleMentalHealthCheckIn = () => {
    const historyEntry = {
      id: Date.now(),
      score: Number(mentalHealthValue),
      note: mentalHealthNote.trim() || getDefaultFeelingText(mentalHealthValue),
      createdAt: new Date().toISOString()
    };

    try {
      const currentHistory = JSON.parse(window.localStorage.getItem(MENTAL_HEALTH_HISTORY_KEY) || '[]');
      window.localStorage.setItem(
        MENTAL_HEALTH_HISTORY_KEY,
        JSON.stringify([historyEntry, ...currentHistory].slice(0, 50))
      );
    } catch (error) {
      window.localStorage.setItem(MENTAL_HEALTH_HISTORY_KEY, JSON.stringify([historyEntry]));
    }

    setLatestMentalEntry(historyEntry);
    setIsMentalHealthCheckedIn(true);
  };

  const trainings = [
    { name: 'Customer Service Excellence', progress: 65 },
    { name: 'Safety Training', progress: 60 },
    { name: 'Customer Service Excellence', progress: 65 },
    { name: 'Safety Training', progress: 60 },
    { name: 'Customer Service Excellence', progress: 65 },
  ];

  const upcomingEvents = [
    { type: 'birthday', name: "Sarah Johnson's Birthday", date: 'Nov 16, 2025', due: '2d', icon: 'bi-cake2' },
    { type: 'anniversary', name: "Mike Chen - 5 Years", date: 'Nov 18, 2025', due: '4d', icon: 'bi-stars' },
  ];

  const leaderboard = [
    { rank: '1st', name: 'Robert Parker', score: 80, img: 'https://i.pravatar.cc/150?u=robert' },
    { rank: '2nd', name: 'Rick Owens', score: 78, img: 'https://i.pravatar.cc/150?u=rick' },
    { rank: '3rd', name: 'George Orwell', score: 75, img: 'https://i.pravatar.cc/150?u=george' },
    { rank: '4th', name: 'George Orwell', score: 75, img: 'https://i.pravatar.cc/150?u=george2' },
    { rank: '5th', name: 'George Orwell', score: 75, img: 'https://i.pravatar.cc/150?u=george3' },
  ];

  const messages = [
    { name: 'Robert Parker', text: 'Awesome!', time: '16:45', img: 'https://i.pravatar.cc/150?u=robert' },
    { name: 'Kate Rose', text: 'you: See you tomorrow!', time: '16:45', img: 'https://i.pravatar.cc/150?u=katerose' },
    { name: 'Robert Parker', text: 'Awesome!', time: '16:45', img: 'https://i.pravatar.cc/150?u=robert' },
  ];

  return (
    <Container fluid className="px-lg-4 py-3 h-100 d-flex flex-column" style={{ maxWidth: '1400px' }}>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <Row className="flex-grow-1 gx-4 gy-4">
        {/* LEFT COLUMN */}
        <Col lg={7} xl={8} className="d-flex flex-column gap-4">



          {/* Trainings Widget */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="rounded-4 p-4" style={{ backgroundColor: '#D6E5F2' }}>
              <div className="d-flex align-items-center mb-4 gap-2">
                <i className="bi bi-bullseye fs-5" style={{ color: '#0f1d3a' }}></i>
                <h5 className="fw-bold mb-0" style={{ color: '#0f1d3a' }}>Trainings</h5>
              </div>

              <div className="bg-white p-3 pt-4 rounded-4 shadow-sm border-0 d-flex flex-column gap-4 mb-4">
                {trainings.map((t, i) => (
                  <div key={i}>
                    <div className="d-flex justify-content-between align-items-center mb-2 px-1">
                      <span className="fw-medium text-dark" style={{ fontSize: '0.95rem' }}>{t.name}</span>
                      <span className="fw-bold" style={{ fontSize: '0.9rem', color: '#0f1d3a' }}>{t.progress}%</span>
                    </div>
                    <ProgressBar
                      now={t.progress}
                      style={{ height: '6px', backgroundColor: '#e2e8f0', border: 'none', borderRadius: '10px' }}
                      variant="info"
                      className="trainings-progress"
                    />
                  </div>
                ))}
              </div>
              <div className="text-center mt-2">
                <span
                  className="small fw-medium text-decoration-none pointer transition-all"
                  style={{ color: '#7a8b9a', cursor: 'pointer' }}
                  onClick={() => navigate('/training')}
                >
                  View All
                </span>
              </div>
            </div>
          </div>

          {/* Leaderboard Widget */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="rounded-4 p-4" style={{ backgroundColor: '#D6E5F2' }}>
              <div className="d-flex align-items-center mb-4 gap-2">
                <i className="bi bi-bar-chart-line fs-5" style={{ color: '#0f1d3a' }}></i>
                <h5 className="fw-bold mb-0" style={{ color: '#0f1d3a' }}>Leaderboard</h5>
              </div>

              <div className="bg-white p-3 pt-4 pb-2 rounded-4 shadow-sm border-0 d-flex flex-column gap-4">
                {leaderboard.map((user, i) => (
                  <div key={i} className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3" style={{ minWidth: '180px' }}>
                      {user.rank === '1st' ? (
                        <Badge bg="transparent" className="px-3 py-2 rounded-3 text-white fw-semibold" style={{ backgroundColor: '#62a8a8', width: '48px' }}>{user.rank}</Badge>
                      ) : (
                        <div className="text-center fw-medium text-dark" style={{ width: '48px', fontSize: '0.9rem' }}>{user.rank}</div>
                      )}
                      <img src={user.img} alt={user.name} className="rounded-circle" width="36" height="36" />
                      <span className="fw-medium text-dark" style={{ fontSize: '0.95rem' }}>{user.name}</span>
                    </div>
                    <div className="d-flex align-items-center gap-3 flex-grow-1 ms-4 justify-content-end">
                      <ProgressBar now={user.score} style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '10px', width: '100%' }} className="leaderboard-progress" />
                      <span className="fw-bold" style={{ fontSize: '0.9rem', color: '#0f1d3a', minWidth: '35px', textAlign: 'right' }}>{user.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <span
                  className="small fw-medium text-decoration-none pointer transition-all"
                  style={{ color: '#7a8b9a', cursor: 'pointer' }}
                  onClick={() => navigate('/kpis')}
                >
                  View All
                </span>
              </div>
            </div>
          </div>

        </Col>

        {/* RIGHT COLUMN */}
        <Col lg={5} xl={4} className="d-flex flex-column gap-4">

          {/* Mental Health Check In Widget */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="rounded-4 p-4 position-relative" style={{ background: 'linear-gradient(259.82deg, #EFECE4 -24.5%, #40878E 99.17%)', color: '#ffffff' }}>
              <div className="d-flex align-items-center justify-content-between mb-4 gap-2">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-heart fs-5"></i>
                  <h5 className="fw-semibold mb-0">Mental Health Check In</h5>
                </div>
                <div className="d-flex align-items-center gap-2">

                  <button
                    type="button"
                    className="btn btn-sm border-0 shadow-none fw-medium"
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      borderRadius: '999px',
                      minWidth: '78px'
                    }}
                    onClick={() => navigate('/dashboard/mental-history')}
                  >
                    History
                  </button>
                </div>
              </div>

              {isMentalHealthCheckedIn && latestMentalEntry ? (
                <div className="d-flex flex-column align-items-center justify-content-center py-3">
                  <div
                    className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                    style={{ width: '96px', height: '96px' }}
                  >
                    <span className="fw-bold" style={{ fontSize: '2.7rem', lineHeight: 1, color: '#40878E' }}>
                      <AnimatedCounter value={Number(latestMentalEntry.score)} duration={300} />
                    </span>
                  </div>
                  <p className="mb-0 mt-2" style={{ color: '#e2eff2', fontSize: '1rem' }}>Score</p>
                  <h5 className="fw-medium mb-0 mt-4 text-center" style={{ color: '#ffffff' }}>
                    {latestMentalEntry.note}
                  </h5>
                  <button
                    type="button"
                    className="btn btn-sm border-0 shadow-none fw-medium mt-4"
                    style={{
                      background: 'rgba(15, 29, 58, 0.9)',
                      color: '#ffffff',
                      borderRadius: '999px',
                      minWidth: '112px'
                    }}
                    onClick={() => setIsMentalHealthCheckedIn(false)}
                  >
                    Check In Again
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-4 pt-3 position-relative">
                    <div className="d-flex align-items-center position-relative">
                      <div className="position-absolute" style={{ left: `calc(${mentalHealthValue * 10}% - 14px)`, top: '-30px', transition: 'left 0.2s' }}>
                        <div className="bg-white text-dark rounded-1 fw-bold text-center d-flex align-items-center justify-content-center" style={{ width: '28px', height: '22px', fontSize: '11px' }}>
                          <AnimatedCounter value={mentalHealthValue} duration={300} />
                        </div>
                        <div style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '4px solid white', margin: '0 auto' }}></div>
                      </div>
                      <Form.Range
                        min={1}
                        max={10}
                        value={mentalHealthValue}
                        onChange={(e) => setMentalHealthValue(Number(e.target.value))}
                        className="custom-range-slider"
                      />
                    </div>
                  </div>

                  <h6 className="fw-medium mb-3">How are you feeling ?</h6>
                  <Form.Control
                    type="text"
                    placeholder="Express yourself"
                    value={mentalHealthNote}
                    onChange={(e) => setMentalHealthNote(e.target.value)}
                    className="border-0 px-3 py-2 mb-3 shadow-none text-muted"
                    style={{ borderRadius: '8px', fontSize: '0.9rem' }}
                  />

                  <Button
                    className="w-100 py-2 border-0 fw-medium shadow-none mt-2"
                    style={{ backgroundColor: '#1a2b4b', borderRadius: '8px', color: '#fff' }}
                    onClick={handleMentalHealthCheckIn}
                  >
                    Check in
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Upcoming Events Widget */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
            <div className="rounded-4 p-4 d-flex flex-column" style={{ backgroundColor: '#D6E5F2' }}>
              <div className="d-flex align-items-center mb-4 gap-2">
                <i className="bi bi-calendar-event fs-5" style={{ color: '#0f1d3a' }}></i>
                <h5 className="fw-bold mb-0" style={{ color: '#0f1d3a' }}>Upcoming Events</h5>
              </div>

              <div className="d-flex flex-column gap-3 mb-4 flex-grow-1 bg-white p-3 rounded-4 shadow-sm">
                {upcomingEvents.map((ev, i) => (
                  <div key={i} className="bg-transparent border-0 d-flex align-items-center gap-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: '#eef2f6' }}>
                      <i className={`bi ${ev.icon} text-muted fs-5`}></i>
                    </div>
                    <div className="flex-grow-1 lh-1">
                      <p className="fw-medium text-dark mb-1" style={{ fontSize: '0.95rem' }}>{ev.name}</p>
                      <small className="text-muted" style={{ fontSize: '0.8rem' }}>{ev.date}</small>
                    </div>
                    <Badge bg="white" text="dark" className="border border-secondary border-opacity-25 px-2 py-1 fw-medium rounded-2">
                      {ev.due}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="text-center mt-auto">
                <span
                  className="small fw-medium text-decoration-none pointer transition-all"
                  style={{ color: '#7a8b9a', cursor: 'pointer' }}
                  onClick={() => navigate('/calendar')}
                >
                  View All Events
                </span>
              </div>
            </div>
          </div>

          {/* Messages Widget */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="rounded-4 p-4 d-flex flex-column" style={{ backgroundColor: '#D6E5F2' }}>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-chat-dots fs-5" style={{ color: '#0f1d3a' }}></i>
                  <h5 className="fw-bold mb-0" style={{ color: '#0f1d3a' }}>Messages</h5>
                </div>
                <Badge bg="navy" className="rounded-circle d-flex align-items-center justify-content-center" style={{ backgroundColor: '#0f1d3a', width: '28px', height: '28px' }}>3</Badge>
              </div>

              <div className="d-flex flex-column gap-4 mb-4 flex-grow-1 bg-white p-4 rounded-4 shadow-sm">
                {messages.map((msg, i) => (
                  <div key={i} className="bg-transparent border-0 d-flex align-items-center gap-3">
                    <img src={msg.img} alt={msg.name} className="rounded-circle" width="38" height="38" />
                    <div className="flex-grow-1 lh-1">
                      <p className="fw-medium text-dark mb-1" style={{ fontSize: '0.95rem' }}>{msg.name}</p>
                      <small className="text-muted" style={{ fontSize: '0.8rem' }}>{msg.text}</small>
                    </div>
                    <div className="text-muted small" style={{ fontSize: '0.75rem' }}>{msg.time}</div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-auto">
                <span
                  className="small fw-medium text-decoration-none pointer transition-all"
                  style={{ color: '#7a8b9a', cursor: 'pointer' }}
                  onClick={() => navigate('/messages')}
                >
                  View All
                </span>
              </div>
            </div>
          </div>

        </Col>
      </Row>

    </Container>
  );
};

export default Dashboard;
