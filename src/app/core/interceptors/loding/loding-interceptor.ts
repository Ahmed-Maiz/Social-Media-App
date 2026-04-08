import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
let totalRequests = 0;
export const lodingInterceptor: HttpInterceptorFn = (req, next) => {
  let ngxSpinnerService = inject(NgxSpinnerService);

  ngxSpinnerService.show();
  return next(req).pipe(
    finalize(() => {
      ngxSpinnerService.hide();
    }),
  );
};
