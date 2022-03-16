import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import AvailableEvents from '../components/AvailableEvents';

export default function HomePage(pros) {
  return (
    <Container className="mt-3">
      <Row>
        <Col md="12">
          <h2>Upcoming programme events</h2>
          <p>
            This is all the upcoming events.
          </p>
        </Col>
        <Col md="12">
          <AvailableEvents />
        </Col>
      </Row>
    </Container>
  );
}
