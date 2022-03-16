import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import useAuth from '../auth/useAuth';

import './CenterForm.css';

export default function LoginPage() {
  const { login } = useAuth();
  const location = useLocation();

  const loginAsClient = () => {
    login(false, location.state?.from);
  }

  const loginAsAdmin = () => {
    login(true, location.state?.from);
  }

  return (
    <div className="h-75 d-flex align-items-center justify-content-center">
      <div>
        <h2 className="text-center">Login</h2>
        <div className="mx-auto" style={{ maxWidth: '16rem' }}>
          <div className="d-grid gap-2">
            <Button variant="success" size="lg" onClick={loginAsClient}>Login (as client)</Button>
            <Button variant="warning" size="lg" onClick={loginAsAdmin}>Login (as admin)</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
