import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogSharedComponent } from '../../shared/components/dialog/dialog.component';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {}

  /*
    Dialog Method: Nav New Menu
  */
  navigationActions(): any {
    this.dialog.open(DialogSharedComponent, {
      panelClass: ['w-8/12'],
      data: {
        type: 'navMenu'
      },
    });
  }


  /*
    Sign Out Method.
  */
  memberSignOut(): void {
    if(this.authService.memberSignOut()) {
      this.router.navigate(['/signIn']);

      // Call snackbar method.
      this._snackBar.open('Signed-out Successfully', 'Ok', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }

  }


  
}
