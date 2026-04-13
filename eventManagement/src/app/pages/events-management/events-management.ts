import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { EventService } from '../../service/events/event-service';
import { CustomButton } from '../../components/custom-button/custom-button';
import { ButtonStyle, ButtonType } from '../../enums/button.enum';
import { CardView } from './card-view/card-view';
import { Router } from '@angular/router';
import { RouterPath } from '../../core/router-paths';
import { EventData } from '../../models/event-details';
import { AsyncPipe } from '@angular/common';
import { Table } from '../../components/table/table';
import { TableColumn } from '../../models/table-columns';

@Component({
  selector: 'app-events-management',
  imports: [AsyncPipe, CustomButton, TranslatePipe, CardView, Table],
  templateUrl: './events-management.html',
})
export class EventsManagement {
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);

  readonly ButtonStyle = ButtonStyle;
  readonly ButtonType = ButtonType;

  events$ = this.eventService.getAllEvents();

  columns: TableColumn<EventData>[] = [
    { key: 'name', label: 'EVENTS.EVENT_NAME' },
    {
      key: 'category',
      label: 'EVENTS.EVENT_CATEGORY',
      formatter: (value) => `EVENTS.EVENT_CATEGORY_${value?.toString().toUpperCase()}`,
    },
    {
      key: 'type',
      label: 'EVENTS.EVENT_TYPE',
      formatter: (value) => `EVENTS.EVENT_TYPE_${value?.toString().toUpperCase()}`,
    },
    { key: 'capacity', label: 'EVENTS.EVENT_CAPACITY' },
    { key: 'date', label: 'EVENTS.EVENT_DATE' },
    { key: 'time', label: 'EVENTS.EVENT_TIME' },
  ];

  isTableView = signal(true);

 onSelectEvent(event: EventData) {
  this.router.navigate([
    RouterPath.Pages.EVENTS_MANAGEMENT,
    event.id
  ]);
}

  toggleView(): void {
    this.isTableView.update((view) => !view);
  }

  goToAddEvent(): void {
    void this.router.navigate([
      '/',
      RouterPath.Pages.EVENTS_MANAGEMENT,
      RouterPath.Pages.ADD_EVENT,
    ]);
  } 
}
