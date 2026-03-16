import { CanActivateFn, Router } from '@angular/router';
import { RouterPath } from '../router-paths';
import { inject } from '@angular/core';
import { AuthService } from '../../service/auth/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree([RouterPath.Pages.LOGIN]);
};
