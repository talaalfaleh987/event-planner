import { Component, computed, inject, input, signal } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { TranslateService } from '@ngx-translate/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { MonthlyEventsChartItem } from '../../../models/monthly-events-chartItem';

echarts.use([BarChart, GridComponent, LegendComponent, TooltipComponent, CanvasRenderer]);

@Component({
  selector: 'app-events-stacked-bar-chart',
  imports: [NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './stacked-bar-chart.html',
})
export class StackedBarChart {
  data = input<MonthlyEventsChartItem[]>([]);

  private readonly translate = inject(TranslateService);
  private readonly currentLang = signal(this.translate.getCurrentLang());

  constructor() {
    this.translate.onLangChange.subscribe(({ lang }) => {
      this.currentLang.set(lang);
    });
  }

  chartOptions = computed(() => {
    this.currentLang();

    const chartData = this.data();
    const physicalLabel = this.translate.instant('EVENTS.PHYSICAL');
    const remoteLabel = this.translate.instant('EVENTS.REMOTE');

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
        data: [physicalLabel, remoteLabel],
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
        data: chartData.map((item) => item.month),
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
          name: remoteLabel,
          type: 'bar',
          stack: 'total',
          barWidth: 20,
          data: chartData.map((item) => item.remote),
          itemStyle: {
            color: '#62B7AE',
            borderRadius: [0, 0, 6, 6],
          },
        },
        {
          name: physicalLabel,
          type: 'bar',
          stack: 'total',
          barWidth: 20,
          data: chartData.map((item) => item.physical),
          itemStyle: {
            color: '#B14696',
            borderRadius: [6, 6, 0, 0],
          },
        },
      ],
    };
  });
}
