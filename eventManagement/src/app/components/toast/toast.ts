import { Component, computed, inject } from '@angular/core';
import { ToastService } from '../../service/toast/toast-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [NgClass],
  templateUrl: './toast.html',
})
export class Toast {
    protected readonly toastService = inject(ToastService);

  protected readonly toast = this.toastService.toast;

  protected readonly toastClasses = computed(() => {
    const currentToast = this.toast();

    if (!currentToast) {
      return '';
    }

    switch (currentToast.type) {
      case 'success':
        return 'border-green-100 bg-green-200 text-green-100';
      case 'error':
        return 'border-red-error bg-red-50 text-red-error';
      case 'info':
        return 'border-primary-normal bg-primary-light text-primary';
      default:
        return '';
    }
  });

  protected hideToast(): void {
    this.toastService.hide();
  }

}
