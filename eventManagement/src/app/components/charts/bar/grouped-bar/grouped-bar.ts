import { Component, computed, input } from '@angular/core';
import { groupedBarChartConfig } from './grouped-bar-chart.config';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { ChartData } from '../../../../models/charts/chart-data';
import { BarChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([BarChart, GridComponent, LegendComponent, TooltipComponent, CanvasRenderer]);

@Component({
  selector: 'app-grouped-bar',
  imports: [NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './grouped-bar.html',
})
export class GroupedBar {
  data = input.required<ChartData>();
 
  chartOptions = computed(() => groupedBarChartConfig(this.data()));
}