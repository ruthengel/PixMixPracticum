
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  console.log("in interceptor");
  const authService = inject(AuthService);
  const navigator = inject(Router);
  const token = authService.getToken();

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }
  else if (!token) {
    // alert("please Login to your account first!"); 
    navigator.navigate(['/login']);
  }
  return next(req);
};
