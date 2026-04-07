import { Component, inject } from '@angular/core';
import { BreadcrumbService } from '../../service/breadcrumb/breadcrumb-service';
import { TranslatePipe } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  imports: [TranslatePipe, AsyncPipe],
  templateUrl: './breadcrumb.html',
})
export class Breadcrumb {
  private breadcrumbService = inject(BreadcrumbService);

  breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
}
