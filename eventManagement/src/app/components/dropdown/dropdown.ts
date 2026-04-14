import { Component, ElementRef, HostListener, inject, input } from '@angular/core';
import { CustomInput } from '../input/input';
import { Option } from '../../models/dropdown/option';
import { LanguageService } from '../../service/language/language-service';

@Component({
  selector: 'app-dropdown',
  imports: [CustomInput],
  templateUrl: './dropdown.html',
  styleUrls: ['./dropdown.css'],
})
export class Dropdown extends CustomInput {
  private readonly languageService = inject(LanguageService);
  private readonly elementRef = inject(ElementRef);

  options = input.required<Option[]>();

  protected isOpen = false;

  protected get selectedOption(): Option | undefined {
    return this.options().find((option) => option.value === this.control().value);
  }

  protected get displayText(): string {
    return this.selectedOption ? this.getOptionLabel(this.selectedOption) : '';
  }

  protected isArabic(): boolean {
    return this.languageService.isArabic();
  }

  protected getOptionLabel(option: Option): string {
    return this.isArabic() ? option.nameAr : option.nameEn;
  }

  protected toggleDropdown(event: MouseEvent): void {
    event.stopPropagation();

    if (this.isOpen) {
      this.control().markAsTouched();
    }

    this.isOpen = !this.isOpen;
  }

  protected selectOption(option: Option): void {
    this.control().setValue(option.value);
    this.control().markAsTouched();
    this.control().markAsDirty();
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  protected onOutsideClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    if (!clickedInside && this.isOpen) {
      this.control().markAsTouched();
      this.isOpen = false;
    }
  }
}
