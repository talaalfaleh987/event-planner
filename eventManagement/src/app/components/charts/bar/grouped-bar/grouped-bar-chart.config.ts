import { EChartsCoreOption } from 'echarts/core';
import { ChartData } from '../../../../models/charts/chart-data';

export const groupedBarChartConfig = (
  data: ChartData
): EChartsCoreOption => {
  const seriesData = data.series.map(s => ({
    name: s.label,
    type: 'bar',
    data: s.data,
    color: s.color,
    borderRadius: s.borderRadius,
  }));
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      bottom: '6%',
      left: 'center',
      icon: 'roundRect',
      itemWidth: 12,
      itemHeight: 18,
      itemGap: 40,
      textStyle: {
        fontFamily: 'Neo Sans Regular',
        fontSize: 14,
        fontWeight: 500,
        color: '#1F2A44',
        padding: [0, 0, 0, 6],
      },
      data: data.series.map(s => s.label),
    },
    grid: {
      left: '6%',
      right: '6%',
      top: '18%',
      bottom: '18%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.labels,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontFamily: 'Neo Sans Regular',
        fontSize: 14,
        color: '#6B86A8',
        margin: 12,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontFamily: 'Neo Sans Regular',
        fontSize: 14,
        color: '#6B86A8',
        margin: 16,
        formatter: (value: number) => {
          if (value === 0) return '0';
          return `${value / 1000}k`;
        },
      },
      splitLine: {
        lineStyle: {
          color: '#D9DEE7',
        },
      },
    },
    series: seriesData.map(s => ({
      name: s.name,
      type: 'bar',
      data: s.data,
      barWidth: 8,
      barGap: '30%',
      itemStyle: {
        color: s.color,
        borderRadius: s.borderRadius ?? [3, 3, 3, 3],
      },
    })),
  };
};
