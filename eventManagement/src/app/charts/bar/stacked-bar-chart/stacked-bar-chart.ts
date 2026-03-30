import { Component, computed, input } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { stackedBarChartConfig } from './stacked-bar-chart.config';
import { ChartData } from '../../../components/charts/chart-data';

echarts.use([BarChart, GridComponent, LegendComponent, TooltipComponent, CanvasRenderer]);

@Component({
  selector: 'app-events-stacked-bar-chart',
  imports: [NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './stacked-bar-chart.html',
})
export class StackedBarChart {
  data = input.required<ChartData>();

  chartOptions = computed(() => stackedBarChartConfig(this.data()));
}
