import axios from 'axios';

import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import EventCard from './EventCard';
import endpoints from '../endpoints';
import useAuth from '../auth/useAuth';

export default function AvailableEvents({ cbDelete, cbEdit }) {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const data = {
      isLoyalty: user?.isLoyalty || true,
      datetime: new Date(),
    };
    axios.post(endpoints.event.upcoming, data).then((response) => {
      setEvents(response.data);
    }).catch((error) => {
      console.error(error);
    });
    if (!user) console.log('no user found');
  }, [setEvents, user]);

  // Array(10).fill().forEach((_,index) => {
  //   events.push({
  //     id: `id-${index}`,
  //     title: `Event #${index}`,
  //     pictureUrl: 'https://via.placeholder.com/480x320',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et elit odio',
  //     datetime: new Date(),
  //   });
  // });

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {events.length === 0 && (
        <div className="d-flex justify-content-center w-100">
          <p className="display-4 text-muted my-2">No events</p>
        </div>
      )}
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          cbDelete={cbDelete ? () => cbDelete(event) : undefined}
          cbEdit={cbEdit ? () => cbEdit(event) : undefined}
        />
      ))}
    </Row>
  );
}
