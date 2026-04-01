import { Component, computed, inject, input } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { stackedBarChartConfig } from './stacked-bar-chart.config';
import { ChartData } from '../../../../models/charts/chart-data';
import { MonthlyEventsChartItem } from '../../../../models/charts/monthly-events-chart-Item';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';

echarts.use([BarChart, GridComponent, LegendComponent, TooltipComponent, CanvasRenderer]);

@Component({
  selector: 'app-events-stacked-bar-chart',
  imports: [NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './stacked-bar-chart.html',
})
export class StackedBarChart {
  // data = input.required<ChartData>();
  data = input.required<MonthlyEventsChartItem[]>();
  private readonly translate = inject(TranslateService);
  private readonly currentLang = toSignal(this.translate.onLangChange);

  private readonly chartData = computed<ChartData>(() => {
    this.currentLang();

    return {
      labels: this.data().map((item: MonthlyEventsChartItem) => item.month),
      series: [
        {
          name: this.translate.instant('EVENTS.REMOTE'),
          data: this.data().map((item: MonthlyEventsChartItem) => item.remote),
          color: '#62B7AE',
          borderRadius: [0, 0, 6, 6],
        },
        {
          name: this.translate.instant('EVENTS.PHYSICAL'),
          data: this.data().map((item: MonthlyEventsChartItem) => item.physical),
          color: '#B14696',
          borderRadius: [6, 6, 0, 0],
        },
      ],
    };
  });

  chartOptions = computed(() => stackedBarChartConfig(this.chartData()));
}
