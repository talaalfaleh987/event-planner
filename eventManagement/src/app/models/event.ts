export interface Event {
  name: string;
  category: 'Entertainment' | 'Work' | 'Education' | 'Other';
  type: 'online' | 'physical';
  location: string;
  link: string;
  date: string;
  time: string;
  capacity: string;
}
