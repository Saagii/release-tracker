import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'dialog-confirmation',
    templateUrl: 'confirmation.component.html',
  })
  export class ConfirmationComponent {
    
    constructor(
      public dialogRef: MatDialogRef<ConfirmationComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
      ) {
      console.log(data);
    }

    confirmationDialogAction(actionType: string) {
      if(actionType === 'confirm') {
        this.dialogRef.close(true);
      } else {
        this.dialogRef.close(false);
      }
    }
  }