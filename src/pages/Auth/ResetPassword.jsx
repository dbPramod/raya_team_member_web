import { useState } from 'react';
import { Container, Card, Row, Col, Form } from 'react-bootstrap';
import Button from '../../components/common/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import appLogo from '../../assets/images/applogo.png';
import { STRINGS } from '../../constants/strings';
import { authService } from '../../services/authService';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resetSession = location.state || authService.getActiveResetSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!password) {
      newErrors.password = STRINGS.RESET_PASSWORD.ERRORS.PASSWORD_REQUIRED;
    } else if (password.length < 6) {
      newErrors.password = STRINGS.RESET_PASSWORD.ERRORS.PASSWORD_LENGTH;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = STRINGS.RESET_PASSWORD.ERRORS.CONFIRM_REQUIRED;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = STRINGS.RESET_PASSWORD.ERRORS.PASSWORDS_MISMATCH;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setApiError('');
    } else {
      setErrors({});
      setApiError('');
      setIsSubmitting(true);

      try {
        await authService.resetPassword({
          challengeId: resetSession?.challengeId,
          password
        });
        navigate('/reset-success');
      } catch (error) {
        setApiError(error.message || 'Unable to reset password right now.');
      } finally {
        setIsSubmitting(false);
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
          <Col md={8} lg={6} xl={5}>
            <Card className="shadow-sm border-0 bg-white" style={{ borderRadius: '12px', padding: '40px 50px' }}>
              <div className="text-start mb-4">
                 <Link to="/verification" state={{ from: 'forgot' }} className="text-muted text-decoration-none d-inline-flex align-items-center gap-2" style={{ fontWeight: '500', fontSize: '0.95rem' }}>
                    <i className="bi bi-arrow-left"></i> Back
                 </Link>
              </div>
              
              <div className="mb-4 text-center">
                 <h2 className="fw-bold fs-3 mb-2" style={{ color: '#0f1d3a' }}>{STRINGS.RESET_PASSWORD.TITLE}</h2>
                 <p className="small" style={{ color: '#6b7280' }}>{STRINGS.RESET_PASSWORD.SUBTITLE}</p>
              </div>

              <Form onSubmit={handleSubmit} className="px-lg-4 text-start">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium small text-dark mb-2">{STRINGS.RESET_PASSWORD.NEW_PASSWORD_LABEL}</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder={STRINGS.RESET_PASSWORD.NEW_PASSWORD_PLACEHOLDER}
                      className="bg-white border py-2 ps-3 pe-5 shadow-none"
                      style={{ borderRadius: '6px', borderColor: '#e2e8f0', fontSize: '0.95rem' }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      isInvalid={!!errors.password}
                    />
                    <i 
                      className={`bi bi-eye${showPassword ? '' : '-slash'} position-absolute top-50 end-0 translate-middle-y ${errors.password ? 'me-5' : 'me-3'} text-muted pointer`}
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  </div>
                  {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium small text-dark mb-2">{STRINGS.RESET_PASSWORD.CONFIRM_PASSWORD_LABEL}</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={STRINGS.RESET_PASSWORD.CONFIRM_PASSWORD_PLACEHOLDER}
                      className="bg-white border py-2 ps-3 pe-5 shadow-none"
                      style={{ borderRadius: '6px', borderColor: '#e2e8f0', fontSize: '0.95rem' }}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <i 
                      className={`bi bi-eye${showConfirmPassword ? '' : '-slash'} position-absolute top-50 end-0 translate-middle-y ${errors.confirmPassword ? 'me-5' : 'me-3'} text-muted pointer`}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    ></i>
                  </div>
                  {errors.confirmPassword && <div className="text-danger small mt-1">{errors.confirmPassword}</div>}
                </Form.Group>

                {resetSession?.email ? <div className="small text-muted mb-3">Resetting password for {resetSession.email}</div> : null}
                {apiError ? <div className="text-danger small mb-3">{apiError}</div> : null}

                <div className="text-center mt-4 pt-2">
                  <Button type="submit" className="w-100 py-2 shadow-sm" style={{ maxWidth: '280px', borderRadius: '6px' }} disabled={isSubmitting}>
                    {isSubmitting ? 'Resetting...' : STRINGS.RESET_PASSWORD.BUTTON}
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetPassword;
