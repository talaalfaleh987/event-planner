import { Component, inject } from '@angular/core';
import { CardStyle } from '../../../enums/card.enum';
import { TranslatePipe } from '@ngx-translate/core';
import { Card } from '../../../components/card/card';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { distinctUntilChanged, filter, map, Observable, of, switchMap } from 'rxjs';
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

  event$: Observable<EventData> = this.route.paramMap.pipe(
    map((params: ParamMap) => params.get(QUERY_PARAMS.ID)),
    filter((id): id is string => id !== null),
    map((id: string) => Number(id)),
    filter((id: number) => !Number.isNaN(id) && id > 0),
    distinctUntilChanged(),
    switchMap((id) => this.eventService.getEvent(id))
  );
}
