import { Attendee } from './attendeeSchema';

export interface Event {
  id: number;
  name: string;
  description: string;
  time: string;
  isAllDay: boolean;
  attendeeCount: number;
  attendees: Array<Attendee>;
}
