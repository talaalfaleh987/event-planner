import { Component, computed, inject, input } from '@angular/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { pieChartConfig } from './pie-chart-config';
import { TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PieChartType } from '../../../../enums/charts.enum';
import { PieChartItem } from '../../../../models/charts/events-pie-charts-data';

echarts.use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer]);

@Component({
  selector: 'app-pie-chart',
  imports: [NgxEchartsDirective],
  templateUrl: './pie-chart.html',
})
export class PieCharts {
  private translate = inject(TranslateService);
  private currentLanguage = toSignal(this.translate.onLangChange);

  data = input.required<PieChartItem[]>();
  type = input<PieChartType>(PieChartType.LEGEND);
  title = input<string>('');
  bottomTitle = input<string>('');
  total = input<number>(0);

  chartOption = computed(() => {
  const currentLanguage = this.currentLanguage()

  return pieChartConfig(
    this.data(),
    this.title(),
    this.type(),
    this.translate,
    this.total()
  );
});
}

