import { useEffect, useMemo, useState } from 'react';
import { Container, Card, Row, Col, Badge } from 'react-bootstrap';
import Button from '../../components/common/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import appLogo from '../../assets/images/applogo.png';
import { STRINGS } from '../../constants/strings';
import { authService } from '../../services/authService';

const Verification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const flow = location.state?.from || 'login';
  const isLoginFlow = flow === 'login' || flow === 'register';
  const challengeId = location.state?.challengeId;
  const email = location.state?.email;
  const mockOtp = location.state?.mockOtp;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [helperText, setHelperText] = useState(mockOtp ? `Mock OTP: ${mockOtp}` : '');

  useEffect(() => {
    if (!challengeId) {
      navigate(flow === 'forgot' ? '/forgot' : '/login', { replace: true });
    }
  }, [challengeId, flow, navigate]);

  useEffect(() => {
    let interval = null;

    if (timer > 0) {
      interval = window.setInterval(() => {
        setTimer((currentTimer) => currentTimer - 1);
      }, 1000);
    }

    return () => window.clearInterval(interval);
  }, [timer]);

  const joinedOtp = useMemo(() => otp.join(''), [otp]);

  const handleResend = async (e) => {
    e.preventDefault();

    if (timer !== 0 || !challengeId) {
      return;
    }

    setIsResending(true);
    setError('');

    try {
      const response = await authService.resendOtp({ challengeId });
      setTimer(30);
      setOtp(['', '', '', '', '', '']);
      setHelperText(`Mock OTP: ${response.otp}`);
    } catch (apiError) {
      setError(apiError.message || 'Unable to resend OTP right now.');
    } finally {
      setIsResending(false);
    }
  };

  const handleChange = (element, index) => {
    if (Number.isNaN(Number(element.value)) && element.value !== '') {
      return;
    }

    const nextOtp = otp.map((digit, currentIndex) => (currentIndex === index ? element.value : digit));
    setOtp(nextOtp);
    setError('');

    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleVerify = async () => {
    if (joinedOtp.length !== 6) {
      setError('Please enter the full 6-digit OTP.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await authService.verifyOtp({ challengeId, otp: joinedOtp });
      navigate(response.flow === 'forgot' ? '/reset-password' : '/complete-profile', {
        state: {
          from: response.flow,
          challengeId: response.challengeId,
          email: response.email
        }
      });
    } catch (apiError) {
      setError(apiError.message || 'Unable to verify OTP right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 bg-login-gradient d-flex align-items-center justify-content-center position-relative">
      <div className="position-absolute top-0 start-0 m-4 m-lg-5">
        <img src={appLogo} alt="Swann Ave" height="32" />
      </div>

      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8} xl={6}>
            <Card className="shadow-sm border-0 bg-white" style={{ borderRadius: '12px', padding: '40px 50px' }}>
              <div className="text-start mb-4">
                <Link to={flow === 'forgot' ? '/forgot' : flow === 'register' ? '/register' : '/login'} className="text-muted text-decoration-none d-inline-flex align-items-center gap-2" style={{ fontWeight: '500', fontSize: '0.95rem' }}>
                  <i className="bi bi-arrow-left"></i> Back
                </Link>
              </div>

              <div className="mb-4 text-center">
                {isLoginFlow && (
                  <Badge
                    bg="transparent"
                    text="navy"
                    className="px-3 py-2 fw-semibold mb-4 text-uppercase border"
                    style={{ fontSize: '0.75rem', borderColor: '#0f1d3a', borderRadius: '4px', letterSpacing: '0.5px', color: '#0f1d3a' }}
                  >
                    {STRINGS.VERIFICATION.STEP}
                  </Badge>
                )}
                <h2 className="fw-bold fs-3 mb-2" style={{ color: '#0f1d3a' }}>
                  {isLoginFlow ? STRINGS.VERIFICATION.TITLE_LOGIN : STRINGS.VERIFICATION.TITLE_FORGOT}
                </h2>
                <p className="small px-4 mb-2" style={{ color: '#6b7280' }}>
                  {STRINGS.VERIFICATION.SUBTITLE}
                </p>
                {email ? <p className="small mb-0" style={{ color: '#0f1d3a', fontWeight: '600' }}>{email}</p> : null}
                {helperText ? <p className="small mt-2 mb-0 text-muted">{helperText}</p> : null}
              </div>

              <div className="px-lg-4">
                <div className="d-flex justify-content-center gap-2 gap-sm-3 mb-4">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      name="otp"
                      maxLength="1"
                      className="form-control text-center fw-bold fs-5"
                      style={{ width: '56px', height: '56px', borderRadius: '8px', borderColor: '#e2e8f0', boxShadow: 'none' }}
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onFocus={(e) => e.target.select()}
                    />
                  ))}
                </div>

                {error ? <div className="text-danger small text-center mb-3">{error}</div> : null}

                <div className="text-center mt-4">
                  <Button className="w-100 py-3 shadow-sm mb-3" style={{ maxWidth: '320px', borderRadius: '6px', fontSize: '1rem', fontWeight: '500' }} onClick={handleVerify} disabled={isSubmitting || isResending}>
                    {isSubmitting ? 'Verifying...' : STRINGS.VERIFICATION.BUTTON}
                  </Button>
                  <p className="small text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                    {STRINGS.VERIFICATION.RESEND_PROMPT}{' '}
                    {timer > 0 ? (
                      <span className="fw-medium" style={{ color: '#6b7280' }}>
                        {STRINGS.VERIFICATION.RESEND_TIMER} {timer}s
                      </span>
                    ) : (
                      <Link to="#" onClick={handleResend} className="text-decoration-none fw-medium" style={{ color: '#2c3e50' }}>
                        {isResending ? 'Sending...' : STRINGS.VERIFICATION.RESEND_LINK}
                      </Link>
                    )}
                  </p>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Verification;
