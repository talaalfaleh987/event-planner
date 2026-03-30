export type ChartSeries = {
  name: string;
  data: number[];
  color: string;
  borderRadius?: number[];
};

export type ChartData = {
  labels: string[];
  series: ChartSeries[];
};
