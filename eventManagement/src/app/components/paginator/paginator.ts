import { Component, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { PaginatedEvents } from '../../models/paginated-events';
import { CustomButton } from '../custom-button/custom-button';
import { ButtonStyle } from '../../enums/button.enum';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [AsyncPipe, CustomButton, TranslatePipe],
  templateUrl: './paginator.html',
})
export class Paginator {
  pagedEvents$ = input.required<Observable<PaginatedEvents>>();

  nextPage = input.required<() => void>();
  previousPage = input.required<() => void>();
  changePageSize = input.required<(size: number) => void>();
  goToPage = input.required<(page: number) => void>();

  readonly ButtonStyle = ButtonStyle;

  getPages(total: number): number[] {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
}
