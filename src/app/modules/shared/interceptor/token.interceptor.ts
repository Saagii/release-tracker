import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.tokenValue}`
      }
    });
    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorObject: any = error.error;

        if (error.status === 401) {
          // Redirect to login page or handle unauthorized access
          this.router.navigate(['/signIn']);
          console.log(error);
          this.snackBarMethod(errorObject.errorInfo.errorMessage);
        } else if (error.status === 403) {
          // Handle forbidden access
          this.router.navigate(['/signIn']);
          this.snackBarMethod('Unauthorized Access. You are signed Out...');
        }

        if(errorObject.errorInfo) {
          this.snackBarMethod(errorObject.errorInfo.errorMessage);
        }

        // Propagate the error so it can be handled further downstream
        return throwError(error);
    }));
  }


  // Common Snackbar Method.
  snackBarMethod(snackBarMessage: any): any {
    this._snackBar.open(snackBarMessage, 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000
    });

    return;
  }
}