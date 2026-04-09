import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { EventDetails } from './event-details/event-details';
import { EventService } from '../../service/events/event-service';
import { ButtonType, ButtonStyle } from '../../enums/button.enum';
import { Router } from '@angular/router';
import { RouterPath } from '../../core/router-paths';
import { CustomButton } from '../../components/custom-button/custom-button';

@Component({
  selector: 'app-events-management',
  imports: [AsyncPipe, EventDetails, TranslatePipe, CustomButton],
  templateUrl: './events-management.html',
})
export class EventsManagement {
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);

  readonly ButtonStyle = ButtonStyle;
  readonly ButtonType = ButtonType;

  event$ = this.eventService.getAllEvents();

  isTableView = signal(true);

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
