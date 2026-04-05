import { Component, inject } from '@angular/core';
import { BreadcrumbService } from '../../service/breadcrumb/breadcrumb-service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumb',
  imports: [TranslatePipe],
  templateUrl: './breadcrumb.html',
})
export class Breadcrumb {
  private breadcrumbService = inject(BreadcrumbService);

  items = this.breadcrumbService.items;
}
