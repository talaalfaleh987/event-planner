import { Component, computed, inject, input } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { stackedBarChartConfig } from './stacked-bar-chart.config';
import { ChartData } from '../../../../models/charts/chart-data';
import { ChartSeriesConfig } from '../../../../models/charts/chart-series-config';

echarts.use([BarChart, GridComponent, LegendComponent, TooltipComponent, CanvasRenderer]);

@Component({
  selector: 'app-events-stacked-bar-chart',
  imports: [NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './stacked-bar-chart.html',
})
export class StackedBarChart<T> {
  data = input.required<T[]>();
  config = input.required<ChartSeriesConfig<T>>();

  private readonly translate = inject(TranslateService);
  private readonly currentLang = toSignal(this.translate.onLangChange, {
    initialValue: null,
  });

  private readonly chartData = computed<ChartData>(() => {
    this.currentLang();

    return {
      labels: this.data().map((item) => this.config().getLabel(item)),
      series: this.config().series.map((seriesItem) => ({
        label: this.translate.instant(seriesItem.name),
        data: this.data().map((item) => seriesItem.getValue(item)),
        color: seriesItem.color,
        borderRadius: seriesItem.borderRadius,
      })),
    };
  });

  protected readonly chartOptions = computed(() => stackedBarChartConfig(this.chartData()));
}
