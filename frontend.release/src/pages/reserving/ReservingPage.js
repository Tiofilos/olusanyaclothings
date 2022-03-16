import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

import {
  Col,
  Container,
  Row,
  Tab,
  Nav,
  Button,
} from 'react-bootstrap';

import SeatsLocationSelectorTab from './SeatsLocationSelectorTab';
import SeatsSelectorTab from './SeatsSelectorTab';
import titleForPerson from '../../helpers/titleForPerson';
import routes from '../../helpers/routes';
import Cart from './Cart';
import endpoints from '../../endpoints';
import useAuth from '../../auth/useAuth';

export default function ReservingPage() {
  const [paid, setPaid] = useState(false);
  const [currentTab, setCurrentTab] = useState();
  const [seatsLocation, setSeatsLocation] = useState(null);
  const [seats, setSeats] = useState([]);
  const [items, setItems] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [event, setEvent] = useState(null);
  const [freeDistribution, setFreeDistribution] = useState(null);
  const [textNextButton, setTextNextButton] = useState('Next');
  const { user } = useAuth();

  const [eveningMode, setEveningMode] = useState(false);

  const navigate = useNavigate();

  const reactLocation = useLocation();
  console.log(reactLocation);

  useEffect(() => {
    setItems([]);
    setDiscounts([]);

    for (let i = 0; i < seats.length; i += 1) {
      const seat = seats[i];
      axios.get(endpoints.price(seat.location, seat.row, seat.number))
        .then((response) => {
          const currentItem = {
            price: eveningMode ? response.data.prices.evening : response.data.prices.matinee,
            title: `Seat at ${seat.humanPosition} ${seat.row}-${seat.number}`,
            description: `Comfortable seat for ${titleForPerson[seat.special].toLowerCase()}`,
          };
          setItems([...items, currentItem]);
        });
    }
    // setItems(seats.map((seat) => {
    //   return {
    //     price: 5, // We have to ask for this price
    //     title: `Seat at ${seat.humanPosition} ${seat.row}-${seat.number}`,
    //     description: `Comfortable seat for ${titleForPerson[seat.special].toLowerCase()}`,
    //   }
    // }));
    // Query if the user has layolty card
    if (user.isLoyalty) {
      setDiscounts([...discounts, {concept: 'Your loyalty!', percent: 10}]);
    }
    if (seats.length > 10) {
      // Discount here
      setDiscounts([...discounts, {concept: 'Many people yeah!', percent: 5}]);
    }
  }, [seats, eveningMode]);

  useEffect(() => {
    if (reactLocation.state === null) {
      navigate(routes.home);
    }
  });

  useEffect(() => {
    if (reactLocation.state?.event) {
      setEvent(reactLocation.state?.event);
    }
  }, [reactLocation.state]);

  const cbSeatsLocationSelection = (location) => {
    setSeatsLocation(location);
    // Find the distribution here
    const eventId = event.id;
    console.log('eventId:', eventId);
    setTextNextButton('Loading...');
    axios.get(endpoints.reservation.free(eventId))
      .then((response) => {
        setFreeDistribution(response.data);
        setCurrentTab('select-seats');
        setTextNextButton('Next');
      }).catch((error) => {
        if (error.response) {
          alert(error.response.data);
        }
      });
  }

  const cbPay = () => {
    setPaid(true);

    // Reset elements
    setSeatsLocation(null);
    setSeats([]);

    // Change of tab
    setCurrentTab('enjoy');
  }

  // const items = [
  //   { price: 12, title: 'Item #1', description: 'This is the best item that you bought' },
  // ];

  // const discounts = [
  //   {concept: 'Many people yeah!', percent: 5},
  // ];
  return (
    <Container className="mt-4">
      <h1 className="text-center my-4">Reservation</h1>
      {event && (
        <>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        </>
      )}
      <Tab.Container
        activeKey={currentTab}
        onSelect={(k) => setCurrentTab(k)}
        defaultActiveKey="seats-location"
      >
        <Row className="g-4">
          <Col sm={3} md={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item><Nav.Link disabled={paid} eventKey="seats-location">Seats location</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link disabled={seatsLocation === null} eventKey="select-seats">Select seats</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link disabled={seats.length === 0} eventKey="summary">Summary</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link disabled={!paid} eventKey="enjoy">Enjoy!</Nav.Link></Nav.Item>
            </Nav>
          </Col>
          <Col sm={9} md={10}>
            <Tab.Content>
              <Tab.Pane eventKey="seats-location">
                <SeatsLocationSelectorTab
                  textButton={textNextButton}
                  cbSelection={cbSeatsLocationSelection}
                  eveningMode={eveningMode}
                  setEveningMode={setEveningMode}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="select-seats">
                <SeatsSelectorTab
                  seatsLocation={seatsLocation}
                  freeDistribution={freeDistribution}
                  seats={seats}
                  setSeats={setSeats}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="summary">
                <Cart cbPay={cbPay} title="Your cart!" items={items} discounts={discounts} />
              </Tab.Pane>
              <Tab.Pane eventKey="enjoy">
                <div className="my-5 jumbotron jumbotron-fluid">
                  <div className="container text-center">
                    <h1 className="display-4">The ticket has been booked!</h1>
                    <p className="lead">Enjoy your event.</p>
                    <Button className="bg-success" as={Link} to={routes.home}>Go home</Button>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}