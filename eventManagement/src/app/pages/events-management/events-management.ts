import { Component, inject, signal } from '@angular/core';
import { EventDetails } from './event-details/event-details';
import { EventService } from '../../service/events/event-service';
import { AsyncPipe } from '@angular/common';
import { CustomButton } from '../../components/custom-button/custom-button';
import { ButtonStyle } from '../../enums/button.enum';
import { TranslatePipe } from '@ngx-translate/core';
import { Dropdown } from '../../components/dropdown/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../service/toast/toast-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-events-management',
  imports: [AsyncPipe, EventDetails, CustomButton, TranslatePipe, ReactiveFormsModule],
  templateUrl: './events-management.html',
})
export class EventsManagement {
  private readonly eventService = inject(EventService);

  event$ = this.eventService.getEvent();

  readonly ButtonStyle = ButtonStyle;

  isTableView = signal(true);

  toggleView() {
    this.isTableView.update(view  => !view );
  }
  private readonly toastService = inject(ToastService);
  private readonly translate = inject(TranslateService);
  testToast() {
    this.toastService.success(this.translate.instant('EVENTS.ADDED_SUCCESSFULLY'));
  }
}
