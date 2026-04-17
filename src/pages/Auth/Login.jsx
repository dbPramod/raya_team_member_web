import { useState } from 'react';
import { Container, Row, Col, Card, Form, Badge } from 'react-bootstrap';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Link, useNavigate } from 'react-router-dom';
import loginScreenImg from '../../assets/images/login_screen.png';
import appLogo from '../../assets/images/applogo.png';
import { STRINGS } from '../../constants/strings';
import { authService } from '../../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) {
      newErrors.email = STRINGS.LOGIN.ERRORS.EMAIL_REQUIRED;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = STRINGS.LOGIN.ERRORS.EMAIL_INVALID;
    }

    if (!password) {
      newErrors.password = STRINGS.LOGIN.ERRORS.PASSWORD_REQUIRED;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setApiError('');
    } else {
      setErrors({});
      setApiError('');
      setIsSubmitting(true);

      try {
        const response = await authService.login({ email, password });
        navigate('/verification', {
          state: {
            from: 'login',
            challengeId: response.challengeId,
            email: response.email,
            mockOtp: response.otp
          }
        });
      } catch (error) {
        setApiError(error.message || 'Unable to log in right now.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-vh-100 py-4 ps-4 pe-0 bg-login-gradient d-flex align-items-center justify-content-center overflow-hidden">
      <Container fluid className="h-100 w-100 pe-0">
        <div className="mb-5 d-flex align-items-center gap-2 position-absolute top-0 start-0 m-4 m-lg-5">
          <img src={appLogo} alt="Swann Ave" height="32" />
        </div>

        <Row className="align-items-center justify-content-between min-vh-75 w-100 g-5 m-0 position-relative">
          <Col lg={4} className="mx-auto" style={{ maxWidth: '420px', padding: '20px' }}>
            <div className="text-start">
              <div className="mb-4 text-center">
                <Badge
                  bg='var(--color-gray-light)'
                  text="navy"
                  className="px-3 py-2 fw-semibold mb-4 text-uppercase border "
                  style={{ fontSize: '0.75rem', borderColor: 'var(--color-gray-light)', borderRadius: '4px', letterSpacing: '0.5px', color: 'var(--color-navy-primary)' }}
                >
                  {STRINGS.LOGIN.STEP}
                </Badge>

                <h1 className="fw-bolder mb-2 fs-2" style={{ color: 'var(--color-navy-primary)' }}>{STRINGS.LOGIN.TITLE}</h1>
                <p className="small mb-4 text-nowrap" style={{ color: "var(--color-text-slate)" }}>{STRINGS.LOGIN.SUBTITLE}</p>
              </div>

              <Form onSubmit={handleSubmit}>
                <Input
                  label={STRINGS.LOGIN.EMAIL_LABEL}
                  type="email"
                  placeholder={STRINGS.LOGIN.EMAIL_PLACEHOLDER}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                />

                <div className="mb-2 text-start">
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium small text-dark mb-2">{STRINGS.LOGIN.PASSWORD_LABEL}</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder={STRINGS.LOGIN.PASSWORD_PLACEHOLDER}
                        className="bg-white border py-2 ps-3 pe-5 shadow-none"
                        style={{ borderRadius: '6px', borderColor: 'var(--color-gray-light)', fontSize: '0.95rem' }}
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
                </div>

                <div className="text-end mb-4">
                  <Link to="/forgot" className="small text-decoration-none fw-medium" style={{ color: '#0056b3' }}>{STRINGS.LOGIN.FORGOT_PASSWORD}</Link>
                </div>

                <Form.Group className="mb-4 d-flex align-items-center gap-2">
                  <Form.Check type="checkbox" id="trust-device" className="custom-checkbox" />
                  <Form.Label htmlFor="trust-device" className="small text-muted mb-0 pointer fw-medium">{STRINGS.LOGIN.TRUST_DEVICE}</Form.Label>
                </Form.Group>

                {apiError ? <div className="text-danger small mb-3">{apiError}</div> : null}
                <Button type="submit" className="w-100 py-2 mb-4 shadow-sm" style={{ fontSize: '1rem', borderRadius: '4px' }} disabled={isSubmitting}>
                  {isSubmitting ? 'Signing in...' : STRINGS.LOGIN.BUTTON}
                </Button>
              </Form>
            </div>
          </Col>
          <Col lg={7} className="d-none d-lg-flex justify-content-end pe-0">
            <img
              src={loginScreenImg}
              alt={STRINGS.LOGIN.IMG_ALT}
              style={{ maxHeight: '85vh', objectFit: 'contain' }}
            />
          </Col>

        </Row>

      </Container>
    </div>
  );
};

export default Login;
