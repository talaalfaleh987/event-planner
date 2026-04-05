import { Injectable, signal } from '@angular/core';
import { BreadcrumbItem } from '../../models/breadcrumb';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private readonly _items = signal<BreadcrumbItem[]>([]);

  readonly items = this._items.asReadonly();

  set(items: BreadcrumbItem[]) {
    this._items.set(items);
  }
  clear() {
    this._items.set([]);
  }
}
