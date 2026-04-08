import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { EventDetails } from './event-details/event-details';
import { EventService } from '../../service/events/event-service';
import { CustomButton } from '../../components/custom-button/custom-button';
import { ButtonStyle } from '../../enums/button.enum';
import { Tag } from '../../components/tag/tag';
import { TagType } from '../../enums/tag.enum';

@Component({
  selector: 'app-events-management',
  imports: [AsyncPipe, EventDetails, CustomButton, TranslatePipe, ReactiveFormsModule, Tag],
  templateUrl: './events-management.html',
})
export class EventsManagement {
  private readonly eventService = inject(EventService);

  readonly ButtonStyle = ButtonStyle;
  readonly TagType = TagType;

  event$ = this.eventService.getEvent();
  isTableView = signal(true);

  eventForm = new FormGroup({
    eventDate: new FormControl(''),
    eventTime: new FormControl(''),
  });

  toggleView() {
    this.isTableView.update((view) => !view);
  }
}
