export interface AppEvent {
  name: string;
  category: string;
  type: 'online' | 'physical';
  location: string;
  link: string;
  date: string;
  time: string;
  capacity: string;
}