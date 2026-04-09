import {Component, inject} from '@angular/core';
import {EventService} from '../../service/events/event-service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-paginator',
  imports: [
    AsyncPipe
  ],
  templateUrl: './paginator.html'
})
export class Paginator {
  readonly eventService = inject(EventService);

  // TODO: should be in input
  pagedEvents$ = this.eventService.getPaginatedEvents();

  changePage(page: number): void {
    this.eventService.setPage(page);
  }

  nextPage(): void {
    this.eventService.nextPage();
  }

  previousPage(): void {
    this.eventService.previousPage();
  }

  changePageSize(size: number): void {
    this.eventService.setPageSize(size);
  }
}
