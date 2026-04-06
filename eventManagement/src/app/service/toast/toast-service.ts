import { Injectable, signal } from '@angular/core';
import { ToastData, ToastType } from '../../models/toast.model';
import { Constants } from '../../core/constants';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toast = signal<ToastData | null>(null);

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  show(toast: ToastData): void {
    this.clearTimeout();

    this.toast.set(toast);

    const duration = toast.duration ?? Constants.DEFAULT_TOAST_DURATION;

    this.timeoutId = setTimeout(() => {
      this.hide();
    }, duration);
  }

  setToast(type: ToastType, message: string, duration = Constants.DEFAULT_TOAST_DURATION): void {
    this.show({
      message,
      type,
      duration,
    });
  }

  hide(): void {
    this.clearTimeout();
    this.toast.set(null);
  }

  private clearTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
