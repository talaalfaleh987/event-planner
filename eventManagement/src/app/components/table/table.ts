import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TableColumn } from '../../models/table-columns';

@Component({
  selector: 'app-table',
  imports: [TranslatePipe],
  templateUrl: './table.html',
})
export class Table<T extends object> {
  data = input.required<T[]>();
  columns = input.required<TableColumn<T>[]>();
  loading = input<boolean>(false);

  rowSelect = output<T>();

  onRowClick(row: T): void {
    this.rowSelect.emit(row);
  }

  getValue(row: T, key: keyof T): T[keyof T] {
    return row[key];
  }

  getDisplayValue(row: T, column: TableColumn<T>): string {
    const value = this.getValue(row, column.key);
    return column.formatter ? column.formatter(value, row) : String(value ?? '');
  }

  trackByRow(index: number, row: T): unknown {
    return (row as { id?: unknown }).id ?? index;
  }
}
