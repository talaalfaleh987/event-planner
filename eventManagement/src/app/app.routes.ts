import { Routes } from '@angular/router';
import { Layout } from './pages/layout/layout';
import { RouterPath } from './core/router-paths';
import { Home } from './pages/home/home';
import { EventsManagement } from './pages/events-management/events-management';
import { Login } from './pages/login/login';
import { authGuard } from './core/guards/auth-guard';
import { AddEvent } from './pages/events-management/add-event/add-event';
import { EventDetails } from './pages/events-management/event-details/event-details';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RouterPath.Pages.LOGIN,
    pathMatch: 'full',
  },
  {
    path: RouterPath.Pages.LOGIN,
    component: Login,
  },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: RouterPath.Pages.HOME, component: Home },
      {
        path: RouterPath.Pages.EVENTS_MANAGEMENT,
        children: [
          { path: '', component: EventsManagement },
          { path: RouterPath.Pages.ADD_EVENT, component: AddEvent },
        ],
      },
      { path: RouterPath.Pages.EVENTS_DETAILS, component: EventDetails },

    ],
  },
];
