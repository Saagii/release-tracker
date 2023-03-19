import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { navigationNewMenu } from 'src/app/modules/main/navigation/data/navigation-create-new-menu';

@Component({
    selector: 'dialog-shared',
    templateUrl: 'dialog.component.html',
  })
  export class DialogSharedComponent {
    navMenuOptions: any[] = navigationNewMenu;
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
    }
  }