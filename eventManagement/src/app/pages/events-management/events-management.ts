import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { EventDetails } from './event-details/event-details';
import { EventService } from '../../service/events/event-service';
import { CustomButton } from '../../components/custom-button/custom-button';
import { ButtonStyle } from '../../enums/button.enum';
import { calendar } from '../../components/calendar/calendar';
import { time } from '../../components/time/time';

@Component({
  selector: 'app-events-management',
  imports: [
    AsyncPipe,
    EventDetails,
    CustomButton,
    TranslatePipe,
    ReactiveFormsModule, Tag,
    calendar,
    time,
  ],
  templateUrl: './events-management.html',
})
export class EventsManagement {
  private readonly eventService = inject(EventService);

  readonly ButtonStyle = ButtonStyle;

  event$ = this.eventService.getEvent();
  isTableView = signal(true);

  eventForm = new FormGroup({
    eventDate: new FormControl(''),
    eventTime: new FormControl(''),
  });

  toggleView() {
    this.isTableView.update((view) => !view);
  }

  readonly TagType = TagType;
}
