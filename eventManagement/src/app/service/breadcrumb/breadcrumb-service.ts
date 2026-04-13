import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, startWith, map } from 'rxjs';
import { Breadcrumb } from '../../models/breadcrumb';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private readonly router = inject(Router);

  readonly breadcrumbs$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(null),
    map(() => this.buildBreadcrumbs(this.router.routerState.root))
  );

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL = child.snapshot.url
        .map(segment => segment.path)
        .join('/');
      if (routeURL) {
        url += `/${routeURL}`;
      }

      const data = child.snapshot.data;

      if (Array.isArray(data['breadcrumb'])) {
        data['breadcrumb'].forEach((bc: Breadcrumb) => {
          breadcrumbs.push({
            label: bc.label,
            url: bc.url ? `/${bc.url}` : url
          });
        });
        if (data['eventName']) {
          breadcrumbs.push({
            label: data['eventName'],
            url
          });
        }
      }
      else if (data['breadcrumb']) {
        breadcrumbs.push({
          label: data['breadcrumb'],
          url
        });
      }
      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
}