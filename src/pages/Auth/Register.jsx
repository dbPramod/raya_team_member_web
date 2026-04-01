import { Container, Card } from 'react-bootstrap';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Register = () => {
  return (
    <Container className="d-flex justify-content-center py-5">
      <Card className="bg-secondary border-0 text-light p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Register</h2>
        <Input label="Full Name" placeholder="John Doe" />
        <Input label="Email" type="email" placeholder="john@example.com" />
        <Input label="Password" type="password" placeholder="Create password" />
        <Button className="w-100 mt-3">Create Account</Button>
      </Card>
    </Container>
  );
};

export default Register;
