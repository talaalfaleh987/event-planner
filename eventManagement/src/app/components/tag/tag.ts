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
  label = input<string>('');

  readonly TagStyle = TagStyle;

  private configMap = {
  [TagType.EDUCATIONAL]: TagStyle.EDUCATIONAL,
  [TagType.ENTERTAINMENT]: TagStyle.ENTERTAINMENT,
  [TagType.WORK]: TagStyle.WORK,
  [TagType.OTHER]: TagStyle.OTHER
 };

  config = computed(() => {
    return this.configMap[this.type()] || this.configMap[TagType.OTHER];
  });
}
