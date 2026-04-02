import { StackedBarChart } from '../../components/charts/bar/stacked-bar-chart/stacked-bar-chart';
import { Component, computed, inject } from '@angular/core';
import { MonthlyEventsChartItem } from '../../models/charts/monthly-events-chart-Item';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardStyle } from '../../enums/card.enum';
import { Card } from '../../components/card/card';
import { EventService } from '../../service/events/event-service';
import { ChartSeriesConfig } from '../../models/charts/chart-series-config';
import { PieChartType } from '../../enums/charts.enum';
import { PieCharts } from '../../components/charts/pie/pie-chart/pie-chart';
import { GroupedBar } from '../../components/charts/bar/grouped-bar/grouped-bar';
import { MonthlyAttendanceChartItem } from '../../models/charts/monthly-attendance-chartI-tem';

@Component({
  selector: 'app-home',
  imports: [StackedBarChart, Card, TranslatePipe, PieCharts, GroupedBar],
  templateUrl: './home.html',
})
export class Home {
  private readonly eventService = inject(EventService);
  protected readonly CardStyle = CardStyle;
  protected readonly PieChartType = PieChartType;
  private readonly translate = inject(TranslateService);
  private readonly currentLang = toSignal(this.translate.onLangChange);

  protected monthlyEventsData = toSignal(
    this.eventService.getMonthlyEventsData(), 
  {
    initialValue: [],
  });

  protected readonly eventsChartConfig: ChartSeriesConfig<MonthlyEventsChartItem> = {
    getLabel: (item) => item.month,
    series: [
      {
        name: 'EVENTS.REMOTE',
        getValue: (item) => item.remote,
        color: '#62B7AE',
        borderRadius: [0, 0, 3, 3],
      },
      {
        name: 'EVENTS.PHYSICAL',
        getValue: (item) => item.physical,
        color: '#B14696',
        borderRadius: [3, 3, 0, 0],
      },
    ],
  };

  protected monthlyAttendanceData = toSignal(
    this.eventService.getMonthlyAttendanceData(), 
  {
    initialValue: [],
  });

  protected readonly attendanceChartConfig: ChartSeriesConfig<MonthlyAttendanceChartItem> = {
    getLabel: (item) => item.month,
    series: [
      {
        name: 'EVENTS.MALE',
        getValue: (item) => item.male,
        color: '#0195ff',
        borderRadius: [3, 3, 0, 0],
      },
      {
        name: 'EVENTS.FEMALE',
        getValue: (item) => item.female,
        color: '#fa5b7d',
        borderRadius: [3, 3, 0, 0],
      },
    ],
  };

  protected eventTypes = toSignal(
    this.eventService.getEventTypesData(),
    {
      initialValue: []
    }
  );

  protected eventCategories = toSignal(
    this.eventService.getEventCategoriesData(),
    {
      initialValue: []
    }
  );

  protected total = computed(() => {
    return this.eventCategories().reduce(
      (sum, item) => sum + Number(item.value || 0),
      0
    );
  });

  protected createCategoryChart(name: string ,  color: string) {
    const item = this.eventCategories().find(c => c.name === name);
    console.log('total:', this.total());
    if (!item) return [];
    return [
      {
        value: item.value,
        name: item.name,
        itemStyle: {
          color: color
        }
      }
    ];
  }

  protected workChart = computed(() =>
    this.createCategoryChart('EVENT_CATEGORY_WORK' , '#ff9579')
  );

  protected entertainmentChart = computed(() =>
    this.createCategoryChart('EVENT_CATEGORY_ENTERTAINMENT' , '#c48dff')
  );

  protected educationChart = computed(() =>
    this.createCategoryChart('EVENT_CATEGORY_EDUCATION' , '#4dbf66')
  );

  protected otherChart = computed(() =>
    this.createCategoryChart('EVENT_CATEGORY_OTHER', '#fa5b7c')
  );
}
