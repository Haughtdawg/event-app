import { InMemoryCache, gql } from '@apollo/client';

export const DELETE_ATTENDEE = gql`
  mutation DeleteAttendee($id: Int) {
    delete_attendees(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const UPDATE_ATTENDEE = gql`
  mutation UpdateAttendee(
    $id: Int
    $firstName: String
    $lastName: String
    $phoneNumber: String
    $email: String
  ) {
    update_attendees(
      where: { id: { _eq: $id } }
      _set: {
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
        email: $email
      }
    ) {
      affected_rows
    }
  }
`;

export const CREATE_ATTENDEE = gql`
  mutation CreateAttendee(
    $firstName: String
    $lastName: String
    $phoneNumber: String
    $email: String
    $eventId: Int
  ) {
    insert_attendees_one(
      object: {
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
        email: $email
        eventId: $eventId
      }
    ) {
      id
    }
  }
`;
