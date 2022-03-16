import { Card, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import routes from '../helpers/routes';

export default function EventCard({ event, cbDelete, cbEdit }) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(routes.reserving, { state: { event } })
  }

  return (
    <Col>
      <Card className="d-inline-block m-1">
        <Card.Img vaiant="top" src={event.pictureUrl} alt="[Event picture]" />
        <Card.Body>
          <Card.Title>{event.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {event.datetime.toString()}
          </Card.Subtitle>
          <Card.Text>
            {event.description}
          </Card.Text>
          {(cbDelete === undefined && cbEdit === undefined) && (
            <Button variant="primary" onClick={onClick}>Reserve</Button>
          )}
          <div className="justify-content-around d-flex">
            {cbDelete !== undefined && (
              <Button variant="danger" onClick={cbDelete}>Delete</Button>
            )}
            {cbEdit !== undefined && (
              <Button variant="success" onClick={cbEdit}>Edit</Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
