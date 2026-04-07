import { inject, Injectable } from '@angular/core';
import { Breadcrumb } from '../../models/breadcrumb';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, startWith, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private readonly router = inject(Router);

  readonly breadcrumbs$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(null),
    map(() => this.createBreadcrumbs(this.router.routerState.root))
  );

  private createBreadcrumbs(route: ActivatedRoute): Breadcrumb[] {
    if (!route.firstChild) {
      return [];
    }
    const child = route.firstChild;
    const childBreadcrumbs = this.createBreadcrumbs(child);
    const breadcrumbs = child.snapshot.data['breadcrumb'] || childBreadcrumbs;
    return breadcrumbs;
  }
}

