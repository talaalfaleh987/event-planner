export type ChartSeries = {
  label: string;
  data: number[];
  color: string;
   itemStyle?: {
    color: string;
  };
  borderRadius?: number[];
};

export type ChartData = {
  labels: string[];
  series: ChartSeries[];
};


