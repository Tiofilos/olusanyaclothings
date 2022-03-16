import { useState, useEffect } from 'react';

import {
  Form,
  Button,
  Alert,
  Card,
} from 'react-bootstrap';

import { useForm } from 'react-hook-form';

// import seatDistribution from '../../helpers/seatDistribution'; use freeDistribution
import titleForPerson from '../../helpers/titleForPerson';
import seatConfigResolver from '../../validations/seatConfigResolver';

import humanPositions from '../../helpers/humanPositions';

export default function SeatsSelectorTab({ freeDistribution, seatsLocation, seats, setSeats }) {
  // const [seats, setSeats] = useState([]);
  const [distribution, setDistribution] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: seatConfigResolver,
  });
  const [selectedRow, setSelectedRow] = useState(null);
  useEffect(() => {
    if (seatsLocation && freeDistribution) {
      setDistribution(freeDistribution[seatsLocation]);
      setSelectedRow(null);
    }
  }, [seatsLocation, setDistribution, setSelectedRow, freeDistribution]);
  const humanPosition = humanPositions[seatsLocation];

  if (seatsLocation === null) return <Alert variant="warning">First select a seating location</Alert>

  console.log('seatsLocation:', seatsLocation);

  const onSubmit = (formData) => {
    console.log(formData);
    const already = seats
      .some((seat) => seat.row === formData.row && seat.number === formData.number && seat.special === formData.special);
    if (!already) {
      const newSeat = {...formData, humanPosition, location: seatsLocation };
      setSeats([...seats, newSeat]);
    } else {
      alert('That was already added');
      window.scrollTo(0, window.scrollMaxY);
    }
  }

  const onRowChange = (e) => {
    setSelectedRow(e.target.value);
    console.log(distribution[selectedRow]);
  }

  const onRemoveSeat = (key) => {
    setSeats(seats.filter((seat, index) => index !== key));
  }

  const CardList = () => {
    if (seats.length === 0) {
      return <h5 className="text-muted">Empty list.</h5>
    }
    return (
      <>
      {seats.map((data, key) => {
        return (
          <Card key={key}>
            <Card.Body>
              <Card.Title>Seat {data.humanPosition} {data.row}-{data.number}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{titleForPerson[data.special]}</Card.Subtitle>
              <div className="d-flex justify-content-end">
                <Button variant="warning" onClick={() => onRemoveSeat(key)}>Remove</Button>
              </div>
            </Card.Body>
          </Card>
        );
      })}
      </>
    );
  }

  return (
    <div>
      <p>Seating position set to <strong>"{humanPosition}"</strong>.</p>
      <p>Select the seats you want.</p>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="select-row">
          <Form.Label>Select the row</Form.Label>
          <Form.Select aria-label="Select the row" {...register("row", { required: true, onChange: onRowChange })}>
            <option value="">Select the row</option>
            {Object.keys(distribution)
              .map((value, key) => <option key={key} value={value}>{value}</option>)}
          </Form.Select>
          {errors?.row && (
            <Form.Text>
              <Alert variant="danger" className="my-1">
                You must select a seat row
              </Alert>
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="select-number">
          <Form.Label>Select the number</Form.Label>
          <Form.Select aria-label="Select the number" {...register("number", { required: true })}>
            <option value="">Select the number</option>
            {selectedRow && (
              distribution[selectedRow].map((value, key) => <option key={key} value={value}>{value}</option>)
            )}
          </Form.Select>
          {errors?.number && (
            <Form.Text>
              <Alert variant="danger" className="my-1">
                You must select a seat number
              </Alert>
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="special-people">
          <Form.Label>Special people?</Form.Label>
          <Form.Select aria-label="Select if it is for special people" {...register("special", { required: true })}>
            {Object.entries(titleForPerson)
              .map(([key, value]) => <option key={key} value={key}>{value}</option>)}
          </Form.Select>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button type="submit" variant="primary" size="lg">
            Add seat
          </Button>
        </div>
      </Form>

      <hr className="my-5"/>

      <h3>Selected seat list:</h3>
      <CardList />
    </div>
  );
}