import { useState } from 'react';
import { Container, Card, Row, Col, Form } from 'react-bootstrap';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Link, useNavigate } from 'react-router-dom';
import { STRINGS } from '../../constants/strings';
import appLogo from '../../assets/images/applogo.png';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError(STRINGS.LOGIN.ERRORS.EMAIL_REQUIRED);
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError(STRINGS.LOGIN.ERRORS.EMAIL_INVALID);
    } else {
      setError(null);
      navigate('/verification', { state: { from: 'forgot' } });
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
                <Link to="/login" className="text-muted text-decoration-none d-inline-flex align-items-center gap-2" style={{ fontWeight: '500', fontSize: '0.95rem' }}>
                  <i className="bi bi-arrow-left"></i> {STRINGS.FORGOT_PASSWORD.BACK}
                </Link>
              </div>

              <div className="mb-4 text-center">
                <h2 className="fw-bold fs-3 mb-2" style={{ color: '#0f1d3a' }}>{STRINGS.FORGOT_PASSWORD.TITLE}</h2>
                <p className="small" style={{ color: '#6b7280' }}>{STRINGS.FORGOT_PASSWORD.SUBTITLE}</p>
              </div>

              <Form onSubmit={handleSubmit} className="px-lg-4">
                <Input
                  label={STRINGS.FORGOT_PASSWORD.EMAIL_LABEL}
                  type="email"
                  placeholder={STRINGS.FORGOT_PASSWORD.EMAIL_PLACEHOLDER}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error}
                />
                <div className="text-center mt-4 pt-2">
                  <Button type="submit" className="w-100 py-2 shadow-sm" style={{ maxWidth: '280px', borderRadius: '6px' }}>{STRINGS.FORGOT_PASSWORD.BUTTON}</Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;
