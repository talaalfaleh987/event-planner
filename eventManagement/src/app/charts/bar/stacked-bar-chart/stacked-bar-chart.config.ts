import { StackedBarChartLabels } from '../../../models/charts/bar-chart';
import { MonthlyEventsChartItem } from '../../../models/charts/monthly-events-chart-Item';

export const stackedBarChartConfig = (
  data: MonthlyEventsChartItem[],
  labels: StackedBarChartLabels,
) => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
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
      data: [labels.physical, labels.remote],
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
      data: data.map((item) => item.month),
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontFamily: 'Neo Sans Regular',
        fontSize: 14,
        fontWeight: 400,
        color: '#6B86A8',
        margin: 12,
      },
    },

    yAxis: {
      type: 'value',
      min: 0,
      interval: 5000,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontFamily: 'Neo Sans Regular',
        fontSize: 14,
        fontWeight: 400,
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

    series: [
      {
        name: labels.remote,
        type: 'bar',
        stack: 'total',
        barWidth: 20,
        data: data.map((item) => item.remote),
        itemStyle: {
          color: '#62B7AE',
          borderRadius: [0, 0, 6, 6],
        },
      },
      {
        name: labels.physical,
        type: 'bar',
        stack: 'total',
        barWidth: 20,
        data: data.map((item) => item.physical),
        itemStyle: {
          color: '#B14696',
          borderRadius: [6, 6, 0, 0],
        },
      },
    ],
  };
};
