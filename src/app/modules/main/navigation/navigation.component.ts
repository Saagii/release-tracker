import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogSharedComponent } from '../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  /*
    Dialog Method: Nav New Menu
  */
  navigationActions(): any {
    this.dialog.open(DialogSharedComponent, {
      data: {
        type: 'navMenu'
      },
    });
  }


  
}
