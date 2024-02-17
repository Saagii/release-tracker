import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { navigationNewMenu } from 'src/app/modules/main/navigation/data/navigation-create-new-menu';

@Component({
    selector: 'dialog-nav-menu',
    templateUrl: 'nav-menu.component.html',
  })
  export class NavMenuComponent {
    navMenuOptions: any[] = navigationNewMenu;
    
    constructor(
      public dialogRef: MatDialogRef<NavMenuComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private router: Router
    ) {
      console.log(data);
    }

    // Navigate based on the route parameters.
    navigate(routeParams: any): void {
      this.dialogRef.close();
      this.router.navigate(routeParams);
    }
  }