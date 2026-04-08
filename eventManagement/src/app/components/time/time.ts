import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomInput } from '../input/input';
import { InputErrorMessage } from '../../models/input-error-message';
import { LanguageService } from '../../service/language/language-service';
import { HOURS_LIST, MINUTES_LIST, PERIODS_LIST } from './time-lists';
import { TimeValue } from '../../models/time';
import { CustomButton } from '../custom-button/custom-button';
import { ButtonStyle, ButtonType } from '../../enums/button.enum';

@Component({
  selector: 'app-time',
  imports: [ReactiveFormsModule, CustomInput, TranslatePipe, CustomButton],
  templateUrl: './time.html',
  styleUrl: './time.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class time implements OnInit {
  private readonly formGroupDirective = inject(FormGroupDirective);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  protected readonly languageService = inject(LanguageService);

  controlName = input.required<string>();
  label = input<string>('');
  errors = input<InputErrorMessage[]>([]);
  maxLength = input<number>();
  showRequiredStar = input<boolean>(false);
  customClasses = input<string>('');
  showClearIcon = input<boolean>(true);
  trailingIcon = input<string>('assets/imgs/time.svg');
  readonlyInput = input<boolean>(false);

  hourInitialValue = input<string>('');
  minuteInitialValue = input<string>('');
  periodInitialValue = input<string>('');

  timeChanged = output<TimeValue>();
  triggerClear = output<void>();

  protected readonly isOpen = signal(false);

  protected readonly hourList = HOURS_LIST;
  protected readonly minutesList = MINUTES_LIST;
  protected readonly periodList = PERIODS_LIST;
  readonly ButtonStyle = ButtonStyle;
  readonly ButtonType = ButtonType;

  protected selectedHour = signal('');
  protected selectedMinute = signal('');
  protected selectedPeriod = signal('');

  ngOnInit(): void {
    if (this.hourInitialValue()) {
      this.selectedHour.set(this.hourInitialValue());
    }

    if (this.minuteInitialValue()) {
      this.selectedMinute.set(this.minuteInitialValue());
    }

    if (this.periodInitialValue()) {
      this.selectedPeriod.set(this.periodInitialValue());
    }

    this.updateControlValue();
  }

  protected control(): FormControl {
    return this.formGroupDirective.form.get(this.controlName()) as FormControl;
  }

  protected displayValue(): string {
    const hour = this.selectedHour();
    const minute = this.selectedMinute();
    const period = this.selectedPeriod();

    if (!hour || !minute || !period) {
      return '';
    }

    const formattedHour = hour.padStart(2, '0');
    const selectedPeriodItem = this.periodList.find((item) => item.value === period);
    const periodText = this.languageService.isArabic()
      ? selectedPeriodItem?.textAr
      : selectedPeriodItem?.textEn;

    return `${formattedHour}:${minute} ${periodText ?? period}`;
  }

  protected togglePanel(): void {
    if (this.readonlyInput()) return;

    this.control().markAsTouched();
    this.isOpen.update((value) => !value);
  }

  protected closePanel(): void {
    this.isOpen.set(false);
  }

  protected onClockIconClick(event: Event): void {
    event.stopPropagation();
    this.togglePanel();
  }

  protected onClearIconClick(event: Event): void {
    event.stopPropagation();
    this.selectedHour.set('');
    this.selectedMinute.set('');
    this.selectedPeriod.set('');
    this.control().setValue('');
    this.triggerClear.emit();
    this.closePanel();
  }

  protected onHourChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedHour.set(value);
    this.emitIfComplete();
  }

  protected onMinuteChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedMinute.set(value);
    this.emitIfComplete();
  }

  protected onPeriodChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedPeriod.set(value);
    this.emitIfComplete();
  }

  private emitIfComplete(): void {
    this.updateControlValue();

    const hour = this.selectedHour();
    const minute = this.selectedMinute();
    const period = this.selectedPeriod();

    if (hour && minute && period) {
      this.timeChanged.emit({ hour, minute, period });
    }
  }

  private updateControlValue(): void {
    this.control().setValue(this.displayValue());
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closePanel();
    }
  }
}
