import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Badge } from 'react-bootstrap';
import Button from '../../components/common/Button';
import { Link, useLocation } from 'react-router-dom';
import appLogo from '../../assets/images/applogo.png';
import { STRINGS } from '../../constants/strings';

const Verification = () => {
  const location = useLocation();
  const isLogin = location.state?.from === 'login';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = (e) => {
    e.preventDefault();
    if (timer === 0) {
      setTimer(30);
      // TODO: API call to resend OTP
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
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
                <Link to={isLogin ? "/login" : "/forgot"} className="text-muted text-decoration-none d-inline-flex align-items-center gap-2" style={{ fontWeight: '500', fontSize: '0.95rem' }}>
                  <i className="bi bi-arrow-left"></i> Back
                </Link>
              </div>

              <div className="mb-4 text-center">
                {isLogin && (
                  <Badge
                    bg="transparent"
                    text="navy"
                    className="px-3 py-2 fw-semibold mb-4 text-uppercase border"
                    style={{ fontSize: '0.75rem', borderColor: '#0f1d3a', borderRadius: '4px', letterSpacing: '0.5px', color: '#0f1d3a' }}
                  >
                    {STRINGS.VERIFICATION.STEP}
                  </Badge>
                )}
                <h2 className="fw-bold fs-3 mb-2" style={{ color: '#0f1d3a' }}>{isLogin ? STRINGS.VERIFICATION.TITLE_LOGIN : STRINGS.VERIFICATION.TITLE_FORGOT}</h2>
                <p className="small px-4" style={{ color: '#6b7280' }}>
                  {STRINGS.VERIFICATION.SUBTITLE}
                </p>
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
                      onChange={e => handleChange(e.target, index)}
                      onKeyDown={e => handleKeyDown(e, index)}
                      onFocus={e => e.target.select()}
                    />
                  ))}
                </div>

                <div className="text-center mt-4">
                  <Button className="w-100 py-3 shadow-sm mb-3" style={{ maxWidth: '320px', borderRadius: '6px', fontSize: '1rem', fontWeight: '500' }} as={Link} to={isLogin ? "/complete-profile" : "/reset-password"}>{STRINGS.VERIFICATION.BUTTON}</Button>
                  <p className="small text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                    {STRINGS.VERIFICATION.RESEND_PROMPT}{' '}
                    {timer > 0 ? (
                      <span className="fw-medium" style={{ color: '#6b7280' }}>
                        {STRINGS.VERIFICATION.RESEND_TIMER} {timer}s
                      </span>
                    ) : (
                      <Link to="#" onClick={handleResend} className="text-decoration-none fw-medium" style={{ color: '#2c3e50' }}>
                        {STRINGS.VERIFICATION.RESEND_LINK}
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
