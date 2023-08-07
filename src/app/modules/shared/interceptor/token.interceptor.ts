import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public authService: AuthService,
    private router: Router
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.tokenValue}`
      }
    });
    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirect to login page or handle unauthorized access
          this.router.navigate(['/signIn']);
        } else if (error.status === 403) {
          // Handle forbidden access
          this.router.navigate(['/signIn']);
        }

        // Propagate the error so it can be handled further downstream
        return throwError(error);
    }));
  }
}