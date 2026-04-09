import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Card } from '../../../components/card/card';
import { time } from '../../../components/time/time';
import { calendar } from '../../../components/calendar/calendar';
import { Dropdown } from '../../../components/dropdown/dropdown';
import { CustomButton } from '../../../components/custom-button/custom-button';
import { CustomInput } from '../../../components/input/input';
import { EventFormControls } from '../../../enums/events-form-control';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { REGEX } from '../../../core/constants';
import { RouterPath } from '../../../core/router-paths';
import { ButtonStyle, ButtonType } from '../../../enums/button.enum';
import { CardStyle } from '../../../enums/card.enum';
import { ValidatorType } from '../../../enums/input.enum';
import { InputErrorMessage } from '../../../models/input-error-message';
import { EventService } from '../../../service/events/event-service';
import { Option } from '../../../models/dropdown/option';
import { conditionalRequiredValidator } from '../../../core/validators/conditional-required.validator';
import { EventType } from '../../../enums/event-type';

@Component({
  selector: 'app-add-event',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    Card,
    time,
    calendar,
    Dropdown,
    CustomButton,
    CustomInput,
  ],
  templateUrl: './add-event.html',
})
export class AddEvent {
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);

  readonly ButtonStyle = ButtonStyle;
  readonly ButtonType = ButtonType;
  readonly CardStyle = CardStyle;
  readonly EventFormControls = EventFormControls;

  constructor() {
    this.eventForm.controls[EventFormControls.TYPE].valueChanges.subscribe(() => {
      this.eventForm.controls[EventFormControls.LOCATION].updateValueAndValidity();
      this.eventForm.controls[EventFormControls.LINK].updateValueAndValidity();
    });
  }

  categoryOptions = toSignal(this.eventService.getCategoryOptions(), {
    initialValue: [] as Option[],
  });

  eventTypeOptions = toSignal(this.eventService.getEventTypeOptions(), {
    initialValue: [] as Option[],
  });

  protected eventForm = new FormGroup({
    [EventFormControls.NAME]: new FormControl('', {
      validators: [Validators.required],
    }),
    [EventFormControls.CATEGORY]: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    [EventFormControls.TYPE]: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    [EventFormControls.CAPACITY]: new FormControl('', {
      validators: [Validators.required, Validators.pattern(REGEX.NUMBERS)],
    }),
    [EventFormControls.LOCATION]: new FormControl('', {
      validators: [conditionalRequiredValidator(EventFormControls.TYPE, EventType.PHYSICAL)],
    }),
    [EventFormControls.LINK]: new FormControl('', {
      validators: [conditionalRequiredValidator(EventFormControls.TYPE, EventType.ONLINE)],
    }),
    [EventFormControls.DATE]: new FormControl('', {
      validators: [Validators.required],
    }),
    [EventFormControls.TIME]: new FormControl('', {
      validators: [Validators.required],
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
  ];
  locationErrors: InputErrorMessage[] = [
    { message: 'ERRORS.REQUIRED', types: [ValidatorType.required] },
  ];
  linkErrors: InputErrorMessage[] = [
    { message: 'ERRORS.REQUIRED', types: [ValidatorType.required] },
  ];
  dateErrors: InputErrorMessage[] = [
    { message: 'ERRORS.REQUIRED', types: [ValidatorType.required] },
  ];
  timeErrors: InputErrorMessage[] = [
    { message: 'ERRORS.REQUIRED', types: [ValidatorType.required] },
  ];

  get isPhysical(): boolean {
    return this.eventForm.controls[EventFormControls.TYPE].value === EventType.PHYSICAL;
  }

  onSubmit(): void {
    this.eventForm.markAllAsTouched();

    if (this.eventForm.invalid) return;
    //TODO: Call the service to add the event and use toast service
    console.log(this.eventForm.value);
  }

  onCancel(): void {
    this.eventForm.reset();
    void this.router.navigateByUrl(RouterPath.Pages.EVENTS_MANAGEMENT);
  }
}
