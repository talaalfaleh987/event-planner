import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Card } from '../../../components/card/card';
import { time } from '../../../components/time/time';
import { calendar } from '../../../components/calendar/calendar';
import { Dropdown } from '../../../components/dropdown/dropdown';
import { CustomButton } from '../../../components/custom-button/custom-button';
import { CustomInput } from '../../../components/input/input';
import { EventFormControls } from '../../../enums/events-form-control';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
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
import { ToastService } from '../../../service/toast/toast-service';
import { EventCategory } from '../../../models/event-type';

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
  private readonly toastService = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);

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
      nonNullable: true,
      validators: [Validators.required],
    }),
    [EventFormControls.CATEGORY]: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    [EventFormControls.TYPE]: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    [EventFormControls.CAPACITY]: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(REGEX.NUMBERS)],
    }),
    [EventFormControls.LOCATION]: new FormControl('', {
      nonNullable: true,
      validators: [conditionalRequiredValidator(EventFormControls.TYPE, EventType.PHYSICAL)],
    }),
    [EventFormControls.LINK]: new FormControl('', {
      nonNullable: true,
      validators: [
        conditionalRequiredValidator(EventFormControls.TYPE, EventType.ONLINE),
        Validators.pattern(REGEX.URL),
      ],
    }),
    [EventFormControls.DATE]: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    [EventFormControls.TIME]: new FormControl('', {
      nonNullable: true,
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
    { message: 'ERRORS.INVALID_LINK', types: [ValidatorType.pattern] },
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

    const formValue = this.eventForm.getRawValue();
    const isPhysical = this.isPhysical;

    this.eventService
      .addEvent({
        name: formValue.name,
        category: this.getCategoryLabel(formValue.category),
        type: isPhysical ? 'physical' : 'online',
        location: isPhysical ? formValue.location : '',
        link: isPhysical ? '' : formValue.link,
        date: formValue.date,
        time: formValue.time,
        capacity: formValue.capacity,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.toastService.setToast('success', 'EVENTS.ADDED_SUCCESSFULLY');
        void this.router.navigateByUrl(RouterPath.Pages.EVENTS_MANAGEMENT);
      });
  }
  private getCategoryLabel(categoryValue: number | null): EventCategory {
    switch (categoryValue) {
      case 1:
        return 'Work';
      case 2:
        return 'Education';
      case 3:
        return 'Entertainment';
      case 4:
        return 'Other';
      default:
        return 'Other';
    }
  }

  onCancel(): void {
    this.eventForm.reset();
    void this.router.navigateByUrl(RouterPath.Pages.EVENTS_MANAGEMENT);
  }
}
