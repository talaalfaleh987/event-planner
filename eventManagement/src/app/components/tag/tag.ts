import { Component, computed, input } from '@angular/core';
import { TagStyle, TagType } from '../../enums/tag.enum';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-tag',
  imports: [TranslatePipe],
  templateUrl: './tag.html',
})
export class Tag {
  type = input<TagType>(TagType.OTHER);

  readonly TagStyle = TagStyle;

  private configMap = {
    [TagType.EDUCATIONAL]: {
      label: 'EVENTS.EVENT_CATEGORY_EDUCATION',
      bg: TagStyle.EDUCATIONAL_BG,
      text: TagStyle.EDUCATIONAL_TEXT
    },
    [TagType.ENTERTAINMENT]: {
      label: 'EVENTS.EVENT_CATEGORY_ENTERTAINMENT',
      bg: TagStyle.ENTERTAINMENT_BG,
      text: TagStyle.ENTERTAINMENT_TEXT
    },
    [TagType.WORK]: {
      label: 'EVENTS.EVENT_CATEGORY_WORK',
      bg: TagStyle.WORK_BG,
      text: TagStyle.WORK_TEXT
    },
    [TagType.OTHER]: {
      label: 'EVENTS.EVENT_CATEGORY_OTHER',
      bg: TagStyle.OTHER_BG,
      text: TagStyle.OTHER_TEXT
    }
  };

  config = computed(() => {
    return this.configMap[this.type()] || this.configMap[TagType.OTHER];
  });
}
