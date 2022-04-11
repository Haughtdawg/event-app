import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_EVENTS } from '../Utilities/GraphQLQueries/eventQueries';
import { Event } from '../Utilities/Schemas/eventSchema';
import { EventDisplay } from './EventDisplay';
import { Sidebar } from './Sidebar/Sidebar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App() {
  const { loading, error, data, refetch } = useQuery(GET_EVENTS);
  const [events, setEvents] = useState<Array<Event>>([]);
  const [selectedEventIdx, setSelectedEventIdx] = useState(0);

  const handleClickedEvent = idx => {
    setSelectedEventIdx(idx);
  };

  useEffect(() => {
    if (data) {
      const _events = [...data.events];
      for (let i in _events) {
        _events[i] = { ..._events[i] };
        _events[i].attendeeCount =
          _events[i].attendees_aggregate.aggregate.count;
      }
      setEvents(_events);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error!</p>;
  }
  if (events.length > 0) {
    return (
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
        <Sidebar
          events={events}
          handleClickedEvent={handleClickedEvent}
          selectedEventIdx={selectedEventIdx}
          refetch={refetch}
        />
        <EventDisplay eventId={events[selectedEventIdx].id} refetch={refetch} />
      </div>
    );
  }
}
