import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  inject,
  input,
  OnInit,
  output,
  viewChild,
} from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDateRangePicker,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { CustomInput } from '../input/input';
import { InputErrorMessage } from '../../models/input-error-message';
import { LanguageService } from '../../service/language/language-service';
import { DateRangeValue } from '../../models/date-range';
import { CustomButton } from '../custom-button/custom-button';
import { ButtonStyle, ButtonType } from '../../enums/button.enum';

@Component({
  selector: 'app-calendar',
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    CustomInput,
    CustomButton,
  ],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class calendar implements OnInit, DoCheck {
  private readonly formGroupDirective = inject(FormGroupDirective);
  protected readonly languageService = inject(LanguageService);

  readonly singlePicker = viewChild<MatDatepicker<Date>>('singlePicker');
  readonly rangePicker = viewChild<MatDateRangePicker<Date>>('rangePicker');
  readonly ButtonStyle = ButtonStyle;
  readonly ButtonType = ButtonType;

  controlName = input.required<string>();
  label = input<string>('');
  errors = input<InputErrorMessage[]>([]);
  maxLength = input<number>();
  showRequiredStar = input<boolean>(false);

  minDate = input<Date | null>(null);
  maxDate = input<Date | null>(null);
  isRange = input<boolean>(false);
  showClearIcon = input<boolean>(true);
  trailingIcon = input<string>('assets/imgs/calendar.svg');
  customClasses = input<string>('');
  customCalendarStyle = input<string>('custom-calendar-panel');
  readonlyInput = input<boolean>(false);

  triggerClear = output<void>();
  triggerUpdated = output<DateRangeValue>();
  triggerSingleDateUpdated = output<string>();

  protected readonly singleDateFormControl = new FormControl<Date | null>(null);

  protected readonly dateRangeFormGroup = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  ngOnInit(): void {
    this.singleDateFormControl.valueChanges.subscribe((date) => {
      this.control().setValue(date ? this.formatDisplayDate(date) : '');
    });

    this.dateRangeFormGroup.valueChanges.subscribe((range) => {
      const start = range.start ? this.formatDisplayDate(range.start) : '';
      const end = range.end ? this.formatDisplayDate(range.end) : '';

      if (start && end) {
        this.control().setValue(`${start} - ${end}`);
      } else if (start) {
        this.control().setValue(start);
      } else {
        this.control().setValue('');
      }
    });
  }

  ngDoCheck(): void {
    const parentControl = this.control();

    if (parentControl.touched) {
      this.singleDateFormControl.markAsTouched({ onlySelf: true });
      this.dateRangeFormGroup.markAllAsTouched();
    }
  }

  protected control(): FormControl {
    return this.formGroupDirective.form.get(this.controlName()) as FormControl;
  }

  protected displayValue(): string {
    return this.control().value ?? '';
  }

  protected toggleDatepicker(): void {
    if (this.readonlyInput()) return;

    this.control().markAsTouched();

    if (this.isRange()) {
      this.rangePicker()?.open();
    } else {
      this.singlePicker()?.open();
    }
  }

  protected onCalendarIconClick(event: Event): void {
    event.stopPropagation();
    this.toggleDatepicker();
  }

  protected onClearIconClick(event: Event): void {
    event.stopPropagation();
    this.resetForms();
    this.triggerClear.emit();
  }

  protected emitSingleDate(): void {
    const date = this.singleDateFormControl.value;

    if (date) {
      this.triggerSingleDateUpdated.emit(this.formatBackendDate(date));
    } else {
      this.triggerClear.emit();
    }
  }

  protected emitRangeDate(): void {
    const start = this.dateRangeFormGroup.controls.start.value;
    const end = this.dateRangeFormGroup.controls.end.value;

    if (start && end) {
      this.triggerUpdated.emit({
        startDate: this.formatBackendDate(start),
        endDate: this.formatBackendDate(end),
      });
    } else if (!start && !end) {
      this.triggerClear.emit();
    }
  }

  public setCalendarValues(startDate: string, endDate?: string): void {
    if (this.isRange()) {
      this.dateRangeFormGroup.patchValue({
        start: startDate ? new Date(startDate) : null,
        end: endDate ? new Date(endDate) : null,
      });
    } else {
      this.singleDateFormControl.setValue(startDate ? new Date(startDate) : null);
    }
  }

  public resetForms(): void {
    this.singleDateFormControl.reset();
    this.dateRangeFormGroup.reset();
    this.control().reset();
  }

  protected setDirection(): 'rtl' | 'ltr' {
    return this.languageService.isArabic() ? 'rtl' : 'ltr';
  }

  private formatDisplayDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return this.languageService.isArabic() ? `${year}/${month}/${day}` : `${day}/${month}/${year}`;
  }

  private formatBackendDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }
}
