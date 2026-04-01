import { Component, inject } from '@angular/core';
import { StackedBarChart } from '../../components/charts/bar/stacked-bar-chart/stacked-bar-chart';
import { TranslatePipe } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardStyle } from '../../enums/card.enum';
import { Card } from '../../components/card/card';
import { EventService } from '../../service/events/event-service';
import { ChartSeriesConfig } from '../../models/charts/chart-series-config';
import { MonthlyEventsChartItem } from '../../models/charts/monthly-events-chart-Item';

@Component({
  selector: 'app-home',
  imports: [StackedBarChart, Card, TranslatePipe],
  templateUrl: './home.html',
})
export class Home {
  private readonly eventService = inject(EventService);
  protected readonly CardStyle = CardStyle;

  protected monthlyEventsData = toSignal(this.eventService.getMonthlyEventsData(), {
    initialValue: [],
  });

  protected readonly eventsChartConfig: ChartSeriesConfig<MonthlyEventsChartItem> = {
    getLabel: (item) => item.month,
    series: [
      {
        name: 'EVENTS.REMOTE',
        getValue: (item) => item.remote,
        color: '#62B7AE',
        borderRadius: [0, 0, 6, 6],
      },
      {
        name: 'EVENTS.PHYSICAL',
        getValue: (item) => item.physical,
        color: '#B14696',
        borderRadius: [6, 6, 0, 0],
      },
    ],
  };
}
