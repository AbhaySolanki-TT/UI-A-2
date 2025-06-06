import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(environment.identity_type);

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  return next(req);
};
