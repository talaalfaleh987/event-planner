import { Routes } from '@angular/router';
import { Layout } from './pages/layout/layout';
import { RouterPath } from './core/router-paths';
import { Home } from './pages/home/home';
import { EventsManagement } from './pages/events-management/events-management';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: RouterPath.Pages.HOME, pathMatch: 'full' },
      { path: RouterPath.Pages.HOME, component: Home },
      { path: RouterPath.Pages.EVENTS_MANAGEMENT, component: EventsManagement },
    ],
  },
];
