import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { EventDetails } from './event-details/event-details';
import { EventService } from '../../service/events/event-service';
import { ToastService } from '../../service/toast/toast-service';
import { CustomButton } from '../../components/custom-button/custom-button';
import { ButtonStyle } from '../../enums/button.enum';

@Component({
  selector: 'app-events-management',
  imports: [AsyncPipe, EventDetails, CustomButton, TranslatePipe, ReactiveFormsModule],
  templateUrl: './events-management.html',
})
export class EventsManagement {
  private readonly eventService = inject(EventService);
  private readonly toastService = inject(ToastService);
  private readonly translate = inject(TranslateService);

  readonly ButtonStyle = ButtonStyle;

  event$ = this.eventService.getEvent();
  isTableView = signal(true);

  toggleView() {
    this.isTableView.update((view) => !view);
  }

  testToast() {
    this.toastService.setToast('success', this.translate.instant('EVENTS.ADDED_SUCCESSFULLY'));
  }
}
