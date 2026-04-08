import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const nothGuardGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);

  if (localStorage.getItem('token') !== null) {
    return router.navigate(['/home']);
  } else {
    return true;
  }
};
