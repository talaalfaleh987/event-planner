export interface TableColumn<T> {
  key: keyof T;
  label: string;
  formatter?: (value: T[keyof T], row: T) => string;
}
