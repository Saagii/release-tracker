import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private _route: Router) {}

  canActivate(): boolean {
    if(this.authService.tokenValue) {
      console.log('Signing In');
      return true;
    } else {
      console.log('Signing Out');
      this._route.navigate(['/signIn']);
      return false;
    }
  }
  
}
