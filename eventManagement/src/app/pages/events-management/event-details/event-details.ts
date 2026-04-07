import { Component, inject, input } from '@angular/core';
import { CardStyle } from '../../../enums/card.enum';
import { TranslatePipe } from '@ngx-translate/core';
import { Card } from '../../../components/card/card';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { QUERY_PARAMS } from '../../../core/query-prams';
import { EventService } from '../../../service/events/event-service';
import { EventData } from '../../../models/event-details';

@Component({
  selector: 'app-event-details',
  imports: [Card, TranslatePipe, NgTemplateOutlet, AsyncPipe],
  templateUrl: './event-details.html',
})
export class EventDetails {
  readonly CardStyle = CardStyle;
  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);

  event$!: Observable<EventData | undefined>;

  ngOnInit() {
  this.event$ = this.route.paramMap.pipe(
    map(params => Number(params.get(QUERY_PARAMS.ID))),
    switchMap(id => {
      if (id) {
        return this.eventService.getEvent(id);
      }
      return of(undefined);
    })
  );
}
}
