import { Component, input, output } from '@angular/core';
import { Card } from '../../../components/card/card';
import { CardStyle } from '../../../enums/card.enum';
import { EventData } from '../../../models/event-details';
import { TagType } from '../../../enums/tag.enum';
import { Tag } from '../../../components/tag/tag';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-card-view',
  imports: [Card, Tag, TranslatePipe],
  templateUrl: './card-view.html',
})
export class CardView {
  readonly CardStyle = CardStyle;
  readonly TagType = TagType
  
  events = input.required<EventData[]>();

  selectedEvent = output<EventData>();

  onCardClick(event: EventData) {
    this.selectedEvent.emit(event);
  }

  readonly categoryMap: Record<string, TagType> = {
  Work: TagType.WORK,
  Education: TagType.EDUCATIONAL,
  Entertainment: TagType.ENTERTAINMENT,
  Other: TagType.OTHER,
};
}
