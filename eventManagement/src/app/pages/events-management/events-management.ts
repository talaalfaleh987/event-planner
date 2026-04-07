import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { EventService } from '../../service/events/event-service';
import { CustomButton } from '../../components/custom-button/custom-button';
import { ButtonStyle, ButtonType } from '../../enums/button.enum';
import { CardStyle } from '../../enums/card.enum';
import { Card } from '../../components/card/card';
import { CardView } from './card-view/card-view';
import { Router } from '@angular/router';
import { RouterPath } from '../../core/router-paths';
import { TagType } from '../../enums/tag.enum';
import { EventData } from '../../models/event-details';
import { Tag } from '../../components/tag/tag';
import { AsyncPipe } from '@angular/common';
import { EventDetails } from './event-details/event-details';


@Component({
  selector: 'app-events-management',
  imports: [AsyncPipe, EventDetails, CustomButton, TranslatePipe, Tag, CardView],
  templateUrl: './events-management.html',
})
export class EventsManagement {
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);

  events$ = this.eventService.getAllEvents();

  readonly ButtonStyle = ButtonStyle;
  readonly CardStyle = CardStyle;
  readonly TagType = TagType;
  readonly ButtonType = ButtonType;

  selectedEvent?: EventData;


  isTableView = signal(true);

  onSelectEvent(event: EventData) {
    this.selectedEvent = event;
    this.router.navigate([RouterPath.Pages.DETAILS(event.id)]);
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