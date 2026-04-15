import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { EventService } from '../../service/events/event-service';
import { CustomButton } from '../../components/custom-button/custom-button';
import { ButtonStyle, ButtonType } from '../../enums/button.enum';
import { CardView } from './card-view/card-view';
import { Router } from '@angular/router';
import { RouterPath } from '../../core/router-paths';
import { EventData } from '../../models/event-details';
import { Table } from '../../components/table/table';
import { TableColumn } from '../../models/table-columns';
import { Paginator } from '../../components/paginator/paginator';
import { ViewMode } from '../../enums/view-mode';

@Component({
  selector: 'app-events-management',
  imports: [ CustomButton, TranslatePipe, CardView, Table, Paginator],
  templateUrl: './events-management.html',
})
export class EventsManagement {
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);

  readonly ButtonStyle = ButtonStyle;
  readonly ButtonType = ButtonType;
  readonly ViewMode = ViewMode;

  isTableView = signal(true);

  events = signal<EventData[]>([]);
  loading = signal(false);

  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(0);

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

  ngOnInit(): void {
    this.eventService.getPaginatedEvents().subscribe((response) => {
      this.events.set(response.items);
      this.totalItems.set(response.totalItems);
      this.currentPage.set(response.currentPage);
      this.pageSize.set(response.pageSize);
      this.loading.set(false);
    });
  }

  loadEvents(): void {
    this.loading.set(true);

    this.eventService.getPaginatedEvents().subscribe({
      next: (response) => {
        this.events.set(response.items);
        this.totalItems.set(response.totalItems);
        this.currentPage.set(response.currentPage);
        this.pageSize.set(response.pageSize);
        this.loading.set(false);
      },
      error: () => {
        this.events.set([]);
        this.totalItems.set(0);
        this.loading.set(false);
      },
    });
  }

  onPageChange(page: number): void {
    this.eventService.setPage(page);
  }

  onPageSizeChange(size: number): void {
    this.eventService.setPageSize(size);
  }

  onRowSelect(Event: EventData): void {
    console.log(Event);
  }
}
