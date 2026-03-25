import { Component, input } from '@angular/core';
import { CardStyle } from '../../../enums/card.enum';
import { TranslatePipe } from '@ngx-translate/core';
import { Card } from '../../../components/card/card';
import { AppEvent } from '../../../models/event';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-event-details',
  imports: [Card, TranslatePipe, NgTemplateOutlet],
  templateUrl: './event-details.html',
})
export class EventDetails {
  readonly CardStyle = CardStyle;
  event = input.required<AppEvent>();

  protected getEventTypeTranslationKey(type: AppEvent['type']): string {
    return `EVENTS.EVENT_TYPE_${type.toUpperCase()}`;
  }
}
