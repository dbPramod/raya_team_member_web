import { Container, Card, Row, Col } from 'react-bootstrap';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import appLogo from '../../assets/images/applogo.png';
import { STRINGS } from '../../constants/strings';

const ResetSuccess = () => {
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
                <Link to="/reset-password" className="text-muted text-decoration-none d-inline-flex align-items-center gap-2" style={{ fontWeight: '500', fontSize: '0.95rem' }}>
                  <i className="bi bi-arrow-left"></i> {STRINGS.RESET_SUCCESS.BACK}
                </Link>
              </div>

              <div className="mb-5 text-center px-sm-4">
                <h2 className="fw-bold fs-4 mb-4" style={{ color: 'var(--color-navy-primary)', lineHeight: '1.4' }}>{STRINGS.RESET_SUCCESS.TITLE}</h2>

                <div className="d-flex flex-column align-items-center mt-5 mb-4">
                  <div
                    className="bg-success rounded-circle d-flex align-items-center justify-content-center mb-3"
                    style={{ width: '80px', height: '80px', backgroundColor: '#4bd37b' }}
                  >
                    <i className="bi bi-check text-white" style={{ fontSize: '4rem', strokeWidth: '1' }}></i>
                  </div>
                  <div
                    style={{ width: '40px', height: '6px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '50%', filter: 'blur(2px)' }}
                  ></div>
                </div>
              </div>

              <div className="text-center pb-2">
                <Button className="w-100 py-3 shadow-sm" style={{ maxWidth: '320px', borderRadius: '6px', fontSize: '1rem', fontWeight: '500' }} as={Link} to="/login">{STRINGS.RESET_SUCCESS.BUTTON}</Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetSuccess;
