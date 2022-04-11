import { Attendee } from '../Utilities/Schemas/attendeeSchema';
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
import { CREATE_ATTENDEE } from '../Utilities/GraphQLQueries/attendeeQueries';

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

interface AttendeeModalProps {
  refetch?: Function;
  eventId: number;
  isUpdate?: boolean;
  attendee?: Attendee;
  setOpen: Function;
  open: boolean;
  updateAttendee?: Function;
}

export default function AttendeeModal(props: AttendeeModalProps) {
  const refetch = props?.refetch;
  const eventId = props.eventId;
  const isUpdate = props?.isUpdate;
  const attendee = { ...props?.attendee };
  const setOpen = props.setOpen;
  const open = props.open;
  const updateAttendee = props?.updateAttendee;

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const handleSubmit = () => {
    console.log('handling submit!');
    if (isUpdate) {
      updateAttendee({
        variables: {
          firstName: formik.values.firstName,
          lastName: formik.values.lastName,
          phoneNumber: formik.values.phoneNumber,
          email: formik.values.email,
          eventId: eventId,
          id: attendee.id,
        },
      });
    } else {
      createAttendee({
        variables: {
          firstName: formik.values.firstName,
          lastName: formik.values.lastName,
          phoneNumber: formik.values.phoneNumber,
          email: formik.values.email,
          eventId: eventId,
        },
      });
    }
    handleClose();
  };

  const initialValues = isUpdate
    ? {
        firstName: attendee.firstName,
        lastName: attendee.lastName,
        phoneNumber: attendee.phoneNumber,
        email: attendee.email,
      }
    : {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
      };

  const [createAttendee, { error: createError, data: createData }] =
    useMutation(CREATE_ATTENDEE);

  useEffect(() => {
    if (createData) {
      refetch();
    }
  }, [createData]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object({
      firstName: yup.string().required('Required field'),
      lastName: yup.string().required('Required field'),
      email: yup.string().email(),
      phoneNumber: yup.string().when('email', {
        is: '',
        then: yup.string().required('Need some form of contact info'),
      }),
    }),
    onSubmit: () => {
      handleSubmit();
    },
  });

  // console.log('attendee is', attendee);
  // console.log('isUpdate is', isUpdate);
  // console.log('formik is', formik);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        onBackdropClick={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h1">
            {isUpdate ? 'Update Attendee' : 'Create New Attendee'}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <div style={{ margin: '2%' }}>
              <Typography variant="h5">Attendee Name</Typography>
              <TextField
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                required
              />
              <TextField
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                multiline
                placeholder="Last Name"
                style={{ marginLeft: '2%' }}
              />
            </div>

            <div style={{ margin: '2%' }}>
              <Typography variant="h5">Email</Typography>
              <TextField
                id="email"
                name="email"
                type="email"
                required
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div style={{ margin: '2%' }}>
              <Typography variant="h5">Phone Number</Typography>
              <TextField
                id="phoneNumber"
                name="phoneNumber"
                type="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.submitCount > 0 && Boolean(formik.errors.phoneNumber)
                }
                helperText={formik.submitCount > 0 && formik.errors.phoneNumber}
              />
            </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                size="large"
                type="submit"
                disabled={
                  !formik.dirty ||
                  !!formik.errors.firstName ||
                  !!formik.errors.lastName
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
