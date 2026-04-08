import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { EventDetails } from './event-details/event-details';
import { EventService } from '../../service/events/event-service';
import { CustomButton } from '../../components/custom-button/custom-button';
import { ButtonStyle, ButtonType } from '../../enums/button.enum';
import { Tag } from '../../components/tag/tag';
import { TagType } from '../../enums/tag.enum';
import { Router } from '@angular/router';
import { RouterPath } from '../../core/router-paths';

@Component({
  selector: 'app-events-management',
  imports: [AsyncPipe, EventDetails, CustomButton, TranslatePipe, Tag],
  templateUrl: './events-management.html',
})
export class EventsManagement {
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);

  readonly ButtonStyle = ButtonStyle;
  readonly TagType = TagType;
  readonly ButtonType = ButtonType;

  event$ = this.eventService.getAllEvents();
  isTableView = signal(true);

  toggleView() {
    this.isTableView.update((view) => !view);
  }
  goToAddEvent() {
    this.router.navigate(['/', RouterPath.Pages.EVENTS_MANAGEMENT, RouterPath.Pages.ADD_EVENT]);
  }
}
