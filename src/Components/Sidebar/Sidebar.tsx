import NewEventModal from './NewEventModal';
import { Event } from '../../Utilities/Schemas/eventSchema';
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import timestamptzToDate from '../../Utilities/timestamptzToDate';
import { Container, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

interface SidebarProps {
  events: Array<Event>;
  handleClickedEvent: Function;
  selectedEventIdx: number;
  refetch: Function;
}

export function Sidebar(props: SidebarProps) {
  const { height } = useWindowDimensions();
  const { events, handleClickedEvent, selectedEventIdx, refetch } = props;

  return (
    <div
      style={{
        display: 'flex',
        borderRight: '1px',
        borderRightColor: '#e6e6e4',
        borderRightStyle: 'solid',
        flex: 4,
        height: height,
        marginLeft: '4%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        scrollBehavior: 'smooth',
      }}
    >
      <NewEventModal refetch={refetch} />
      <Stack spacing={0}>
        {events.map((event, index) => {
          return (
            <div
              key={event.id}
              style={
                index === selectedEventIdx
                  ? {
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      borderBottom: '1px',
                      borderBottomStyle: 'solid',
                      borderBottomColor: '#e6e6e4',
                      backgroundColor: '#fbdf8b',
                    }
                  : {
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      borderBottom: '1px',
                      borderBottomStyle: 'solid',
                      borderBottomColor: '#e6e6e4',
                    }
              }
              onClick={() => handleClickedEvent(index)}
            >
              <Typography variant="h3" style={{ marginBottom: 0 }}>
                {event.name}
              </Typography>
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Typography variant="subtitle1" style={{ color: '#afafae' }}>
                  {timestamptzToDate(event.time).toLocaleDateString()}
                </Typography>
                <span
                  style={{
                    backgroundColor: '#afafae',
                    height: 3,
                    width: 3,
                    borderRadius: 1.5,
                    alignSelf: 'center',
                    margin: '2%',
                  }}
                ></span>
                <Typography variant="subtitle1" style={{ color: '#afafae' }}>
                  {event.isAllDay
                    ? 'All Day'
                    : timestamptzToDate(event.time).toLocaleTimeString([], {
                        timeStyle: 'short',
                      })}
                </Typography>
                <span
                  style={{
                    backgroundColor: '#afafae',
                    height: 3,
                    width: 3,
                    borderRadius: 1.5,
                    alignSelf: 'center',
                    margin: '2%',
                  }}
                ></span>
                <Typography variant="subtitle1" style={{ color: '#afafae' }}>
                  {event.attendeeCount + ' Attendees'}
                </Typography>
              </span>
            </div>
          );
        })}
      </Stack>
    </div>
  );
}
