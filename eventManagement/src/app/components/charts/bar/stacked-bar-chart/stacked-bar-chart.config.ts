import { ChartData } from '../../../../models/charts/chart-data';

export const stackedBarChartConfig = (data: ChartData) => {
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
      data: data.series.map((item) => item.name),
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

    series: data.series.map((item) => ({
      name: item.name,
      type: 'bar',
      stack: 'total',
      barWidth: 20,
      data: item.data,
      itemStyle: {
        color: item.color,
        borderRadius: item.borderRadius ?? [0, 0, 0, 0],
      },
    })),
  };
};
