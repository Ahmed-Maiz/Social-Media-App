import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // let toster = inject(ToastrService);

  // toster.error('error', 'Route titel');
  return next(req).pipe((err) => {
    return throwError(() => err);
  });
};
