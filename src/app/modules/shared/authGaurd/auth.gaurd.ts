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
      console.log('Yes')
      return true;
    } else {
      console.log('No')
      this._route.navigate(['login']);
      return false;
    }
  }
  
}
