import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { EventDetails } from './event-details/event-details';
import { EventService } from '../../service/events/event-service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { REGEX } from '../../core/constants';
import { InputType, ValidatorType } from '../../enums/input.enum';
import { ButtonType, ButtonStyle } from '../../enums/button.enum';
import { CardStyle } from '../../enums/card.enum';
import { InputErrorMessage } from '../../models/input-error-message';
import { Router } from '@angular/router';
import { RouterPath } from '../../core/router-paths';
import { Card } from '../../components/card/card';
import { CustomInput } from '../../components/input/input';
import { Dropdown } from '../../components/dropdown/dropdown';
import { CustomButton } from '../../components/custom-button/custom-button';
import { Option } from '../../models/dropdown/option';
import { EventFormControls } from '../../enums/events-form-control';

@Component({
  selector: 'app-events-management',
  imports: [
    AsyncPipe,
    EventDetails,
    TranslatePipe,
    CustomButton,
    CustomInput,
    ReactiveFormsModule,
    TranslatePipe,
    Card,
    Dropdown,
  ],
  templateUrl: './events-management.html',
})
export class EventsManagement {
  private readonly fb = inject(FormBuilder);
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);


  readonly ButtonStyle = ButtonStyle;
  readonly InputType = InputType;
  readonly ButtonType = ButtonType;

  event$ = this.eventService.getAllEvents();
  readonly CardStyle = CardStyle;
  readonly EventFormControls = EventFormControls;

  categoryOptions = toSignal(this.eventService.getCategoryOptions(), {
    initialValue: [] as Option[],
  });
  protected eventTypeOptions = toSignal(this.eventService.getEventTypeOptions(), {
    initialValue: [] as Option[],
  });

  isTableView = signal(true);

  toggleView() {
    this.isTableView.update((view) => !view);
  }
  goToAddEvent() {
    this.router.navigate(['/', RouterPath.Pages.EVENTS_MANAGEMENT, RouterPath.Pages.ADD_EVENT]);
  }

  eventForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    category: new FormControl('', {
      validators: [Validators.required],
    }),
    type: new FormControl('', {
      validators: [Validators.required],
    }),
    capacity: new FormControl('', {
      validators: [Validators.required, Validators.pattern(REGEX.NUMBERS), Validators.min(5)],
    }),
    location: new FormControl(''),
    link: new FormControl(''),
    date: new FormControl('', {
      validators: [Validators.required, Validators.pattern(REGEX.DATE_YYYY_MM_DD)],
    }),
    time: new FormControl('', {
      validators: [Validators.required, Validators.pattern(REGEX.TIME_HH_MM)],
    }),
  });

  nameErrors: InputErrorMessage[] = [
    { message: 'ERRORS.REQUIRED', types: [ValidatorType.required] },
  ];

  categoryErrors: InputErrorMessage[] = [
    { message: 'ERRORS.REQUIRED', types: [ValidatorType.required] },
  ];

  typeErrors: InputErrorMessage[] = [
    { message: 'ERRORS.REQUIRED', types: [ValidatorType.required] },
  ];

  capacityErrors: InputErrorMessage[] = [
    { message: 'ERRORS.REQUIRED', types: [ValidatorType.required] },
    { message: 'ERRORS.NUMBERS_ONLY', types: [ValidatorType.pattern] },
    { message: 'ERRORS.MIN_CAPACITY', types: [ValidatorType.min] },
  ];

  locationErrors: InputErrorMessage[] = [
    { message: 'ERRORS.REQUIRED', types: [ValidatorType.required] },
  ];

  linkErrors: InputErrorMessage[] = [
    { message: 'ERRORS.REQUIRED', types: [ValidatorType.required] },
  ];

  dateErrors: InputErrorMessage[] = [
    { message: 'ERRORS.REQUIRED', types: [ValidatorType.required] },
    { message: 'ERRORS.DATE_FORMAT', types: [ValidatorType.pattern] },
  ];

  timeErrors: InputErrorMessage[] = [
    { message: 'ERRORS.REQUIRED', types: [ValidatorType.required] },
    { message: 'ERRORS.TIME_FORMAT', types: [ValidatorType.pattern] },
  ];

  get isPhysical(): boolean {
    return this.eventForm.controls.type.value === 'physical';
  }

  get isOnline(): boolean {
    return this.eventForm.controls.type.value === 'online';
  }

  onTypeChange(type: 'online' | 'physical'): void {
    this.eventForm.controls.type.setValue(type);
    this.eventForm.controls.type.markAsTouched();
    this.updateConditionalValidators();
  }

  onSubmit(): void {
    this.updateConditionalValidators();
    this.eventForm.markAllAsTouched();

    if (this.eventForm.invalid) return;

    console.log(this.eventForm.value);
  }

  onCancel(): void {
    this.eventForm.reset();
    this.clearConditionalValidators();
  }

  private updateConditionalValidators(): void {
    const selectedType = this.eventForm.controls.type.value;
    const locationControl = this.eventForm.controls.location;
    const linkControl = this.eventForm.controls.link;

    if (selectedType === 'physical') {
      locationControl.setValidators([Validators.required]);
      linkControl.clearValidators();
      linkControl.setValue('');
    } else if (selectedType === 'online') {
      linkControl.setValidators([Validators.required]);
      locationControl.clearValidators();
      locationControl.setValue('');
    } else {
      locationControl.clearValidators();
      linkControl.clearValidators();
    }

    locationControl.updateValueAndValidity();
    linkControl.updateValueAndValidity();
  }

  private clearConditionalValidators(): void {
    this.eventForm.controls.location.clearValidators();
    this.eventForm.controls.link.clearValidators();

    this.eventForm.controls.location.updateValueAndValidity();
    this.eventForm.controls.link.updateValueAndValidity();
  }
}
