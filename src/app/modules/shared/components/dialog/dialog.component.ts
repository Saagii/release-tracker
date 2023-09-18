import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogMetaData } from '../../data/dialogMetaData';

@Component({
    selector: 'dialog-shared',
    templateUrl: 'dialog.component.html',
  })
  export class DialogSharedComponent {

    dialogMetaData = DialogMetaData;
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);

      for(const meta of this.dialogMetaData) {
        if(data.type === meta.type) {
          data['dialogMetaData'] = meta;
          break;
        }
      }
    }
  }