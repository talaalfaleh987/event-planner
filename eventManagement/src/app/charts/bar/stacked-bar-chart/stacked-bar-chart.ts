import { Component, computed, inject, input, signal } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { TranslateService } from '@ngx-translate/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { MonthlyEventsChartItem } from '../../../models/charts/monthly-events-chart-Item';
import { stackedBarChartConfig } from './stacked-bar-chart.config';

echarts.use([BarChart, GridComponent, LegendComponent, TooltipComponent, CanvasRenderer]);

@Component({
  selector: 'app-events-stacked-bar-chart',
  imports: [NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './stacked-bar-chart.html',
})
export class StackedBarChart {
  data = input.required<MonthlyEventsChartItem[]>();

  private readonly translate = inject(TranslateService);
  private readonly currentLang = signal(this.translate.getCurrentLang());

  constructor() {
    this.translate.onLangChange.subscribe(({ lang }) => {
      this.currentLang.set(lang);
    });
  }

  chartOptions = computed(() => {
    this.currentLang();

    return stackedBarChartConfig(this.data(), {
      physical: this.translate.instant('EVENTS.PHYSICAL'),
      remote: this.translate.instant('EVENTS.REMOTE'),
    });
  });
}
