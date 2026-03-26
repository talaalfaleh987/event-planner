import { Component, inject } from '@angular/core';
import { EventDetails } from './event-details/event-details';
import { EventService } from '../../service/events/event-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-events-management',
  imports: [AsyncPipe, EventDetails],
  templateUrl: './events-management.html',
})
export class EventsManagement {
  private readonly eventService = inject(EventService);
  event$ = this.eventService.getEvent();
}
