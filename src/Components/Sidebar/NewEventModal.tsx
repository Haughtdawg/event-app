import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../../Utilities/GraphQLQueries/eventQueries';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function NewEventModal(props) {
  const refetch = props.refetch;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const [createEvent, { error, data }] = useMutation(CREATE_EVENT);

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      date: '',
      time: '',
      isAllDay: false,
    },
    validationSchema: yup.object({
      name: yup.string().required('Required field'),
      date: yup.string().required(),
      time: yup.string().when('isAllDay', {
        is: false,
        then: yup.string().required('Time or "all day" required'),
      }),
      isAllDay: yup.boolean(),
    }),
    onSubmit: values => {
      const isValidTime = /^\d{2}:\d{2}$/.test(formik.values.time);
      createEvent({
        variables: {
          name: formik.values.name,
          description: formik.values.description,
          time: `${formik.values.date}T${
            isValidTime ? formik.values.time : '00:00'
          }:00`,
          isAllDay: formik.values.isAllDay,
        },
      });
      handleClose();
    },
  });

  return (
    <div>
      <span style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleOpen}>Create New Event</Button>
      </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h1">Create New Event</Typography>
          <form onSubmit={formik.handleSubmit}>
            <div style={{ margin: '2%' }}>
              <Typography variant="h5">Event Name</Typography>
              <TextField
                id="name"
                name="name"
                placeholder="Event Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                required
              />
            </div>

            <div style={{ margin: '2%' }}>
              <Typography variant="h5">Event Description</Typography>
              <TextField
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                multiline
                placeholder="What's this event?"
              />
            </div>

            <div style={{ margin: '2%' }}>
              <Typography variant="h5">Date & Time</Typography>
              <TextField
                id="date"
                name="date"
                type="date"
                required
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextField
                id="time"
                name="time"
                type="time"
                value={formik.values.time}
                onChange={formik.handleChange}
                error={formik.submitCount > 0 && Boolean(formik.errors.time)}
                helperText={formik.submitCount > 0 && formik.errors.time}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                margin: '2%',
              }}
            >
              <Checkbox
                id="isAllDay"
                name="isAllDay"
                checked={formik.values.isAllDay}
                onChange={formik.handleChange}
                style={{ paddingLeft: 0 }}
              ></Checkbox>
              <Typography align="center" variant="h6">
                All day event?
              </Typography>
            </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                size="large"
                type="submit"
                disabled={
                  !formik.dirty || !!formik.errors.name || !!formik.errors.date
                }
              >
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
