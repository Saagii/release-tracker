import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogSharedComponent } from '../../shared/components/dialog/dialog.component';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  memberDetails: any;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private membersService: MembersService
    ) {}

  ngOnInit(): void {

    // Get Signed In member details.
    this.getSignedInMemberDetails();
  }

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
    Get Signed In member details.
  */
  getSignedInMemberDetails(): void {
    console.log(this.authService.memberIdValue);

    this.membersService.getMemberDetails(this.authService.memberIdValue).subscribe((response: any) => {
      console.log(response);

      this.memberDetails = response;
    });
  }


  /*
    Sign Out Method.
  */
  memberSignOut(memberId: string): void {

    this.authService.memberSignOut(memberId).subscribe((response: any) => {
      localStorage.removeItem('token');
      this.router.navigate(['/signIn']);
      // Call snackbar method.
      this._snackBar.open('Signed-out Successfully', 'Ok', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    });

    // Navigating to Sign out page temporarily.

    // if(this.authService.memberSignOut(memberId)) {
    //   this.router.navigate(['/signIn']);

    //   // Call snackbar method.
    //   this._snackBar.open('Signed-out Successfully', 'Ok', {
    //     horizontalPosition: 'right',
    //     verticalPosition: 'top',
    //   });
    // }

  }


  
}
