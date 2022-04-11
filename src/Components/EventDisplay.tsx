import { Event } from '../Utilities/Schemas/eventSchema';
import { Attendee } from '../Utilities/Schemas/attendeeSchema';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_THIS_EVENT,
  DELETE_EVENT,
} from '../Utilities/GraphQLQueries/eventQueries';
import {
  DELETE_ATTENDEE,
  UPDATE_ATTENDEE,
} from '../Utilities/GraphQLQueries/attendeeQueries';
import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Divider,
  Skeleton,
  Stack,
  Button,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import timestamptzToDate from '../Utilities/timestamptzToDate';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AttendeeModal from './AttendeeModal';

interface EventDisplayProps {
  eventId: number;
  refetch: Function;
}

export function EventDisplay(props: EventDisplayProps) {
  const eventId = props.eventId;
  const {
    loading,
    error: loadError,
    data,
    refetch,
  } = useQuery(GET_THIS_EVENT, {
    variables: { eventId },
  });
  const [deleteEvent, { error: deleteEvtError, data: deleteEvtData }] =
    useMutation(DELETE_EVENT);
  const [deleteAttendee, { error: deleteError, data: deleteData }] =
    useMutation(DELETE_ATTENDEE);
  const [updateAttendee, { error: updateError, data: updateData }] =
    useMutation(UPDATE_ATTENDEE);
  const [open, setOpen] = useState(false);
  const [openDelEvt, setOpenDelEvt] = useState(false);
  const [openNewAttendee, setOpenNewAttendee] = useState(false);
  const [openUpdateAttendee, setOpenUpdateAttendee] = useState(false);
  const [delAttendeeIdx, setDelAttendeeIdx] = useState(0);
  const [updateAttendeeIdx, setUpdateAttendeeIdx] = useState(0);

  useEffect(() => {
    if (deleteData) {
      refetch();
    }
    if (deleteError) {
      console.error(deleteError);
    }
    if (updateData) {
      console.log('updateData is', updateData);
      refetch();
    }
    if (deleteEvtData) {
      props.refetch();
    }
  }, [deleteData, updateData, deleteError]);

  const attendeeDeleter = attendee => {
    let id = attendee.id;
    deleteAttendee({ variables: { id: id } });
    setDelAttendeeIdx(0);
  };

  const openDelModal = idx => {
    setDelAttendeeIdx(idx);
    setOpen(true);
  };

  const openUpdateModal = idx => {
    setUpdateAttendeeIdx(idx);
    setOpenUpdateAttendee(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inviteStatus = (attendee: Attendee) => {
    if (attendee.canAttend === null) {
      return 'No Reply';
    } else if (attendee.canAttend) {
      return 'Accepted';
    } else {
      return 'Declined';
    }
  };

  if (loading) {
    return (
      <Container
        style={{
          display: 'flex',
          flex: 8,
          flexDirection: 'column',
          marginTop: '2%',
          marginBottom: '2%',
        }}
      >
        <Paper style={{ height: '90vh' }}>
          <Skeleton variant="text" width={'100%'} height={'10%'} />
          <Divider></Divider>
          <Skeleton variant="text" width={'100%'} height={'90%'} />
        </Paper>
      </Container>
    );
  }
  if (loadError) {
    console.error(loadError);
    return <div>Whoops!</div>;
  }

  if (data) {
    const date = timestamptzToDate(data.events[0].time);
    const timeString = date.toLocaleDateString([], { dateStyle: 'full' });
    const completeTimeString = data.events[0].isAllDay
      ? `All day ${timeString}`
      : `${timeString} starting at ${date.toLocaleTimeString([], {
          timeStyle: 'short',
        })}`;

    const noAttendees = data.events[0].attendees.length === 0;
    return (
      <Container
        style={{
          display: 'flex',
          flex: 8,
          flexDirection: 'column',
          marginTop: '2%',
          marginBottom: '2%',
        }}
      >
        {/* UPDATER */}
        {/*Intentionally mounting and unmounting*/}
        {openUpdateAttendee && (
          <AttendeeModal
            eventId={eventId}
            isUpdate={true}
            attendee={
              noAttendees ? {} : data.events[0].attendees[updateAttendeeIdx]
            }
            open={openUpdateAttendee}
            setOpen={setOpenUpdateAttendee}
            updateAttendee={updateAttendee}
          />
        )}
        {/* CREATER */}
        <AttendeeModal
          refetch={refetch}
          eventId={eventId}
          isUpdate={false}
          open={openNewAttendee}
          setOpen={setOpenNewAttendee}
        />
        <Dialog onClose={handleClose} open={open}>
          <Container
            style={{
              margin: '2%',
              display: 'flex',
              flex: 1,
              alignContent: 'center',
              flexDirection: 'column',
            }}
          >
            <DialogTitle style={{ fontSize: 32, textAlign: 'center' }}>
              Delete Attendee
            </DialogTitle>
            <Typography variant="h5">
              Are you sure you want to delete attendee{' '}
              {`${
                noAttendees
                  ? ''
                  : data.events[0].attendees[delAttendeeIdx].firstName
              } ${
                noAttendees
                  ? ''
                  : data.events[0].attendees[delAttendeeIdx].lastName
              } `}
              from your list?
            </Typography>
            <span
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: '5%',
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  attendeeDeleter(data.events[0].attendees[delAttendeeIdx]);
                  refetch();
                  handleClose();
                }}
              >
                Delete
              </Button>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Cancel
              </Button>
            </span>
          </Container>
        </Dialog>
        <Dialog onClose={() => setOpenDelEvt(false)} open={openDelEvt}>
          <Container
            style={{
              margin: '2%',
              display: 'flex',
              flex: 1,
              alignContent: 'center',
              flexDirection: 'column',
            }}
          >
            <DialogTitle style={{ fontSize: 32, textAlign: 'center' }}>
              Delete Event
            </DialogTitle>
            <Typography variant="h5">
              Are you sure you want to delete event "{data.events[0].name}"?
            </Typography>
            <span
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: '5%',
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  deleteEvent({ variables: { id: data.events[0].id } });
                  setOpenDelEvt(false);
                }}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenDelEvt(false)}
              >
                Cancel
              </Button>
            </span>
          </Container>
        </Dialog>
        <Paper style={{ height: '90vh' }}>
          <Container style={{ marginTop: '2%', marginBottom: '2%' }}>
            <span
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography style={{ marginBottom: '1%' }} variant="h3">
                {data.events[0].name}
              </Typography>
              <Button
                color="error"
                variant="contained"
                size="large"
                onClick={() => setOpenDelEvt(true)}
              >
                Delete Event
              </Button>
            </span>
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: '.5%',
                alignItems: 'end',
              }}
            >
              <Typography style={{ color: '#444545' }} variant="h4">
                {data.events[0].description}
              </Typography>
              <Typography style={{ color: '#afafae' }} variant="h5">
                {completeTimeString}
              </Typography>
            </span>

            <Divider />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Container style={{ marginTop: '5%', marginBottom: '2%' }}>
                <Typography align="center" variant="h4">
                  Attendees
                </Typography>
              </Container>
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: '5px',
                }}
              >
                <span
                  style={{ display: 'flex', flex: 1, justifyContent: 'center' }}
                >
                  <Typography align="justify" variant="subtitle1">
                    Name
                  </Typography>
                </span>

                <span
                  style={{ display: 'flex', flex: 1, justifyContent: 'center' }}
                >
                  <Typography align="justify" variant="subtitle1">
                    Invitation Status
                  </Typography>
                </span>

                <EmailIcon
                  style={{ display: 'flex', flex: 1 }}
                  color="primary"
                />
                <PhoneIcon
                  style={{ display: 'flex', flex: 1 }}
                  color="primary"
                />
              </span>
              <Divider variant="middle" />

              <Stack spacing={2}>
                {data.events[0].attendees.map((attendee, index) => {
                  return (
                    <span
                      key={attendee.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}
                    >
                      <span
                        style={{
                          display: 'flex',
                          flex: 1,
                          justifyContent: 'space-between',
                          alignContent: 'center',
                        }}
                      >
                        <span style={{ alignSelf: 'flex-start' }}>
                          <Tooltip title="Delete">
                            <IconButton onClick={() => openDelModal(index)}>
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        </span>
                        <span style={{ alignSelf: 'flex-start' }}>
                          <Tooltip title="Edit">
                            <IconButton onClick={() => openUpdateModal(index)}>
                              <EditIcon color="success" />
                            </IconButton>
                          </Tooltip>
                        </span>
                        <Typography align="justify" variant="subtitle1">
                          {`${attendee.firstName} ${attendee.lastName}`}
                        </Typography>
                        <span style={{ width: '40px' }}></span>
                        <span style={{ width: '40px' }}></span>
                      </span>
                      <span
                        style={{
                          display: 'flex',
                          flex: 1,
                          justifyContent: 'center',
                        }}
                      >
                        <Typography align="justify" variant="subtitle1">
                          {`${inviteStatus(attendee)}`}
                        </Typography>
                      </span>
                      <span
                        style={{
                          display: 'flex',
                          flex: 1,
                          justifyContent: 'center',
                        }}
                      >
                        <Typography align="justify" variant="subtitle1">
                          {`${attendee.email}`}
                        </Typography>
                      </span>
                      <span
                        style={{
                          display: 'flex',
                          flex: 1,
                          justifyContent: 'center',
                        }}
                      >
                        <Typography align="justify" variant="subtitle1">
                          {`${attendee.phoneNumber}`}
                        </Typography>
                      </span>
                    </span>
                  );
                })}
              </Stack>
              <span
                style={{ display: 'flex', flex: 1, justifyContent: 'center' }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  style={{ marginTop: '2%', width: '30%' }}
                  onClick={() => setOpenNewAttendee(true)}
                >
                  Add new attendee
                </Button>
              </span>
            </div>
          </Container>
        </Paper>
      </Container>
    );
  }
}
