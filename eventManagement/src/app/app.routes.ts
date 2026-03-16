import { Routes } from '@angular/router';
import { Layout } from './pages/layout/layout';
import { RouterPath } from './core/router-paths';
import { Home } from './pages/home/home';
import { EventsManagement } from './pages/events-management/events-management';
import { Login } from './pages/login/login';
import { authGuard } from './core/guards/auth-guard';

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
      { path: RouterPath.Pages.EVENTS_MANAGEMENT, component: EventsManagement },
    ],
  },
];
