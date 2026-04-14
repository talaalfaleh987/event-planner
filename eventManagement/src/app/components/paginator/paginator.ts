import { Component, computed, input, output } from '@angular/core';
import { CustomButton } from '../custom-button/custom-button';
import { ButtonStyle } from '../../enums/button.enum';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [ CustomButton, TranslatePipe],
  templateUrl: './paginator.html',
})
export class Paginator{
  currentPage = input.required<number>();
  pageSize = input.required<number>();
  totalItems = input.required<number>();
  pageSizeOptions = input<number[]>([5, 10, 20]);

  pageChange = output<number>();
  pageSizeChange = output<number>();

  readonly ButtonStyle = ButtonStyle;

  totalPages = computed(() => {
    const total = Math.ceil(this.totalItems() / this.pageSize());
    return total > 0 ? total : 1;
  });

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  goToPage(page: number | string): void {
    const pageNumber = Number(page);

    if (pageNumber >= 1 && pageNumber <= this.totalPages()) {
      this.pageChange.emit(pageNumber);
    }
  }

  onPageSizeChange(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(value);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, index) => index + 1);
  }
}
