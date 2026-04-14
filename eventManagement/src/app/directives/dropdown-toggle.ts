import { Directive, ElementRef, HostListener, inject, signal } from '@angular/core';

@Directive({
  selector: '[appDropdownToggle]',
  exportAs: 'appDropdownToggle',
})
export class DropdownToggle {
  readonly isOpen = signal(false);

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node | null;

    if (!target) return;

    const clickedInside = this.elementRef.nativeElement.contains(target);

    if (!clickedInside) {
      this.close();
    }
  }
  toggle(): void {
    this.isOpen.update((value) => !value);
  }

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
