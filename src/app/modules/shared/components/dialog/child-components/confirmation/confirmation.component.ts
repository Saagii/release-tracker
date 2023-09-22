import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'dialog-confirmation',
    templateUrl: 'confirmation.component.html',
  })
  export class ConfirmationComponent {
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
    }
  }