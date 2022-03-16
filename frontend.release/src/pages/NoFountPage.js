import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import routes from '../helpers/routes';

import './CenterForm.css'

export default function NoFoundPage() {
  return (
    <div className="h-50 d-flex align-items-center justify-content-center">
      <div className="d-flex flex-column justify-content-center">
        <p className="display-1 mb-4">No Found Page</p>
        <div className="d-flex align-items-center justify-content-center">
          <Button variant="primary" as={Link} size="sm" to={routes.home}>Go home</Button>
        </div>
      </div>
    </div>
  );
}
