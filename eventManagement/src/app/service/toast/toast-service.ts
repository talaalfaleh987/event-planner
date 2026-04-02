import { Injectable, signal } from '@angular/core';
import { ToastData } from '../../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toast = signal<ToastData | null>(null);

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  show(toast: ToastData): void {
    this.clearTimeout();

    this.toast.set(toast);

    const duration = toast.duration ?? 3000;

    this.timeoutId = setTimeout(() => {
      this.hide();
    }, duration);
  }

  success(message: string, duration = 3000): void {
    this.show({
      message,
      type: 'success',
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
