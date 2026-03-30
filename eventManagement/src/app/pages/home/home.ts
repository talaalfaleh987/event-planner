import { Component, computed, inject } from '@angular/core';
import { StackedBarChart } from '../../components/charts/bar/stacked-bar-chart/stacked-bar-chart';
import { MonthlyEventsChartItem } from '../../models/charts/monthly-events-chart-Item';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChartData } from '../../models/charts/chart-data';
import { CardStyle } from '../../enums/card.enum';
import { Card } from '../../components/card/card';
import { EventService } from '../../service/events/event-service';

@Component({
  selector: 'app-home',
  imports: [StackedBarChart, Card, TranslatePipe],
  templateUrl: './home.html',
})
export class Home {
  private readonly translate = inject(TranslateService);
  private readonly eventService = inject(EventService);
  private readonly currentLang = toSignal(this.translate.onLangChange);
  protected readonly CardStyle = CardStyle;

  protected monthlyEventsData = toSignal(this.eventService.getMonthlyEventsData(), {
    initialValue: [],
  });

  protected chartData = computed<ChartData>(() => {
    const lang = this.currentLang();

    return {
      labels: this.monthlyEventsData().map((item: MonthlyEventsChartItem) => item.month),
      series: [
        {
          name: this.translate.instant('EVENTS.REMOTE'),
          data: this.monthlyEventsData().map((item: MonthlyEventsChartItem) => item.remote),
          color: '#62B7AE',
          borderRadius: [0, 0, 6, 6],
        },
        {
          name: this.translate.instant('EVENTS.PHYSICAL'),
          data: this.monthlyEventsData().map((item: MonthlyEventsChartItem) => item.physical),
          color: '#B14696',
          borderRadius: [6, 6, 0, 0],
        },
      ],
    };
  });
}
