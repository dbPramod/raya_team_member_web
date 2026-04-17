import { Container, Badge } from 'react-bootstrap';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MENTAL_HEALTH_HISTORY_KEY = 'swann-mental-health-history';

const getHistoryFromStorage = () => {
  if (typeof window === 'undefined') return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(MENTAL_HEALTH_HISTORY_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const formatHistoryDate = (dateValue) => {
  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) return 'Unknown date';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(parsedDate);
};

const getScoreBadgeColor = (score) => {
  if (score >= 8) return '#2f8f79';
  if (score >= 6) return '#4c7da8';
  if (score >= 4) return '#c0823d';
  return '#c45858';
};

const MentalHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const historyItems = useMemo(() => getHistoryFromStorage(), []);
  const showSuccess = Boolean(location.state?.showSuccess);

  return (
    <Container fluid className="px-lg-4 py-3 h-100" style={{ maxWidth: '1100px' }}>
      <div className="rounded-4 p-4" style={{ background: '#d6e5f2' }}>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-sm border-0 shadow-none d-flex align-items-center justify-content-center"
              style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#ffffff', color: 'var(--color-navy-primary)' }}
              onClick={() => navigate('/dashboard')}
              aria-label="Back to dashboard"
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <h4 className="fw-bold mb-0" style={{ color: 'var(--color-navy-primary)' }}>Mental Health History</h4>
          </div>
          <button
            type="button"
            className="btn px-3 py-2 fw-medium border-0 shadow-sm"
            style={{ background: '#40878e', color: '#ffffff', borderRadius: '12px' }}
            onClick={() => navigate('/dashboard')}
          >
            New Check In
          </button>
        </div>

        {showSuccess ? (
          <div
            className="rounded-4 p-3 mb-3 d-flex align-items-center gap-2"
            style={{ background: 'linear-gradient(135deg, #40878e 0%, #0f3780 100%)', color: '#ffffff' }}
          >
            <i className="bi bi-check-circle-fill"></i>
            <span className="fw-medium">Check in submitted successfully.</span>
          </div>
        ) : null}

        {historyItems.length === 0 ? (
          <div className="bg-white rounded-4 p-5 text-center shadow-sm">
            <i className="bi bi-heart fs-1 d-block mb-2" style={{ color: '#94a3b8' }}></i>
            <h6 className="fw-semibold mb-1" style={{ color: 'var(--color-navy-primary)' }}>No history yet</h6>
            <p className="mb-0 text-muted">Complete your first mental health check-in from Dashboard.</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {historyItems.map((entry, index) => (
              <div key={entry.id || `${entry.createdAt}-${index}`} className="bg-white rounded-4 p-4 shadow-sm">
                <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
                  <span className="small fw-medium" style={{ color: 'var(--color-gray-dark)' }}>{formatHistoryDate(entry.createdAt)}</span>
                  <Badge
                    bg="transparent"
                    className="px-3 py-2 rounded-pill fw-semibold"
                    style={{ backgroundColor: '#eef2ff', color: getScoreBadgeColor(Number(entry.score || 0)) }}
                  >
                    Score {Number(entry.score || 0)}/10
                  </Badge>
                </div>
                <p className="mb-0 fw-medium" style={{ color: 'var(--color-navy-primary)', fontSize: '1rem' }}>
                  {entry.note || 'No note added'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default MentalHistory;
