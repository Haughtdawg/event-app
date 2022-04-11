import { InMemoryCache, gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      name
      time
      description
      attendees_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const GET_THIS_EVENT = gql`
  query GetThisEvent($eventId: Int) {
    events(where: { id: { _eq: $eventId } }) {
      id
      name
      description
      time
      attendees {
        id
        firstName
        lastName
        phoneNumber
        email
        canAttend
      }
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation MyMutation(
    $name: String
    $description: String
    $date: String
    $time: timestamptz
  ) {
    insert_events_one(
      object: { name: $name, description: $description, time: $time }
    ) {
      id
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: Int) {
    delete_attendees(where: { eventId: { _eq: $id } }) {
      affected_rows
    }
    delete_events(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
