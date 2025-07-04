import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const session = localStorage.getItem('session');

  if (!session) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
