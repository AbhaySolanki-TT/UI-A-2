import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';
import { AppRoutes } from '../../shared/routes-enum';

export const doubleLoginGuard: CanActivateFn = () => {
  return true;
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    router.navigate([AppRoutes.home]);
    return false;
  }

  return true;
};

