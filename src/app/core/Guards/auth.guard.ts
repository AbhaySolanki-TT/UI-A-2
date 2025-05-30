import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { AppRoutes } from '../../shared/routes-enum';


export const authGuard: CanActivateFn = () => {
  return true;
  
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) return true;

  router.navigate([AppRoutes.login]);
  return false;
};

