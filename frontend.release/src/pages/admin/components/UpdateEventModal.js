import { useRef, useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Form,
  InputGroup,
  Overlay,
  Alert,
  Popover,
} from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import eventResolver from '../../../validations/eventResolver';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function UpdateEventModal(props) {
  const {
    isOpen,
    close,
    cb,
    data,
  } = props;

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: eventResolver,
  });

  // console.log('data:', data);

  const ref = useRef(null);
  const [showCalender, setShowCalender] = useState(false);
  const [targetShowing, setTargetShowing] = useState(null);

  const [calendarDate, setCalendarDate] = useState(null);

  useEffect(() => {
    if (!data) return;
    setValue('title', data.title);
    setValue('description', data.description);
    setValue('description', data.description);
    setValue('pictureUrl', data.pictureUrl || '');
    setValue('datetime', new Date(data.datetime));
  }, [data, setValue]);

  useEffect(() => {
    if (!!calendarDate) setValue('datetime', calendarDate);
  }, [calendarDate, setValue]);

  useEffect(() => {
    if (!isOpen) {
      console.log('reseting...');
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = (formData) => {
    console.log('submit:', formData);
    cb(!data, formData);
    close();
  }

  const handleShowCalender = (e) => {
    setShowCalender(!showCalender);
    setTargetShowing(e.target);
  }

  const onChangeCalender = (value) => {
    setCalendarDate(value);
    setShowCalender(false);
  }

  return (
    <Modal show={isOpen} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{data ? 'Update event' : 'Create new event'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="form-title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" {...register("title")} />
            {errors?.title && (
              <Form.Text>
                <Alert variant="warning">Invalid title</Alert>
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="form-description">
            <Form.Label>Description (optional)</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={3}
              {...register("description")}
            />
            {errors?.description && (
              <Form.Text>
                <Alert variant="warning">Invalid description</Alert>
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="form-picture-url">
            <Form.Label>Picture Url (optional)</Form.Label>
            <Form.Control type="text" {...register("pictureUrl")} />
            {errors?.pictureUrl && (
              <Form.Text>
                <Alert variant="warning">Invalid picture url</Alert>
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group ref={ref} className="mb-3" controlId="form-datetime">
            <Form.Label>Datetime</Form.Label>
            <InputGroup>
              <Form.Control type="text" readOnly {...register("datetime")} />
              <Button
                onClick={handleShowCalender}
                variant="outline-secondary"
                id="button-calender"
              >
                Calender
              </Button>
              <Overlay
                show={showCalender}
                target={targetShowing}
                placement="top"
                container={ref}
                containerPadding={20}
              >
                <Popover id="popover-contained">
                  <Popover.Body>
                    <Calendar onChange={onChangeCalender} value={calendarDate} />
                  </Popover.Body>
                </Popover>
              </Overlay>
            </InputGroup>
            {errors?.datetime && (
              <Form.Text>
                <Alert variant="warning">Invalid datetime</Alert>
              </Form.Text>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>Cancel</Button>
        <Button variant="danger" onClick={handleSubmit(onSubmit)}>
          {data ? 'Update' : 'Create'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}