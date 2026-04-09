import { EventData } from './data';

export interface PaginatedEvents {
  items: EventData[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
