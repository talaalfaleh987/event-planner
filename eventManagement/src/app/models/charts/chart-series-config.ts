export interface SeriesConfig<T> {
  name: string;
  getValue: (item: T) => number;
  color: string;
  borderRadius: [number, number, number, number];
}

export interface ChartSeriesConfig<T> {
  getLabel: (item: T) => string;
  series: SeriesConfig<T>[];
}
