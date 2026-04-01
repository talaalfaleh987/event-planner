import { Component, inject } from '@angular/core';
import { StackedBarChart } from '../../components/charts/bar/stacked-bar-chart/stacked-bar-chart';
import { TranslatePipe } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardStyle } from '../../enums/card.enum';
import { Card } from '../../components/card/card';
import { EventService } from '../../service/events/event-service';

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
}
