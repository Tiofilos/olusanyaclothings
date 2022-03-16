import axios from 'axios';
import { useState } from 'react';

import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

import useModal from '../../hooks/useModal';
import DeleteModal from './components/DeleteModal';
import AvailableEvents from '../../components/AvailableEvents';
import UpdateEventModal from './components/UpdateEventModal';
import endpoints from '../../endpoints';

export default function SettingsPage() {
  const [currentEvent, setCurrentEvent] = useState(null);

  const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();
  const [isOpenUpdateModal, openUpdateModal, closeUpdateModal] = useModal();

  const cbDelete = (event) => {
    console.log('delete', event);
    setCurrentEvent(event);
    openDeleteModal();
  }

  const cbEdit = (event) => {
    console.log('editing', event);
    setCurrentEvent(event);
    openUpdateModal();
  }

  const onDelete = (event) => {
    console.warn('delete', event);
    const url = `${endpoints.event.post}/${currentEvent.id}`
    console.info(url);
    axios.delete(url).then((response) => {
      console.log(response.data);
      alert(`${response.data.affected} item(s) deleted`);
    }).catch((error) => {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        console.error(error);
      }
    });
  }

  const onUpdate = (isNew, data) => {
    // Check if data is null to create
    console.log('start updating', isNew, data);
    if (isNew) {
      axios.post(endpoints.event.post, data).then((response) => {
        console.log('created:', response.data);
        alert('Event created');
      }).catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          console.error(error);
        }
      });
    } else {
      const url = `${endpoints.event.post}/${currentEvent.id}`
      console.info(url);
      axios.put(url, data).then((response) => {
        console.log('updated:', response.data);
        alert('Event edited');
      }).catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          console.error(error);
        }
      });
    }
  }

  const handleNewEvent = () => {
    setCurrentEvent(null);
    openUpdateModal();
  }

  return (
    <>
    <Container className="mt-3">
      <Row>
        <Col md="12">
          <h2>Upcoming programme events</h2>
          <p>
            This is all the upcoming events.
          </p>
        </Col>

        <Col className="my-2">
          <Button variant="primary" onClick={handleNewEvent}>New event</Button>
        </Col>

        <Col md="12">
          <AvailableEvents cbDelete={cbDelete} cbEdit={cbEdit} />
        </Col>
      </Row>
    </Container>

    <DeleteModal
      title="Delete this event"
      message="Do You want to delete this event?"
      isOpen={isOpenDeleteModal}
      close={closeDeleteModal}
      cb={onDelete}
      data={currentEvent}
    />

    <UpdateEventModal
      isOpen={isOpenUpdateModal}
      close={closeUpdateModal}
      cb={onUpdate}
      data={currentEvent}
    />
    </>
  );
}
