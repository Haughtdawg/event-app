export interface Attendee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  canAttend: boolean;
  eventId: number;
}
