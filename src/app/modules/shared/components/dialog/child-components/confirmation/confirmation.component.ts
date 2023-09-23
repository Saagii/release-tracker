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

    onConfirm() {
      this.dialogRef.close(true);
    }
  }