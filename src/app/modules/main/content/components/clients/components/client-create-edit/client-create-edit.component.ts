import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusService } from 'src/app/modules/shared/services/status.service';

@Component({
  selector: 'app-client-create-edit',
  templateUrl: './client-create-edit.component.html'
})
export class ClientCreateEditComponent implements OnInit {

    clientCreateEditForm: FormGroup;


  constructor(
    private statusService: StatusService,
    private fb: FormBuilder,
  ) {
     // Prepare Sign In Form
     this.clientCreateEditForm = this.fb.group({
      clientName: [null, [Validators.required]],
      clientAbout: [null, [Validators.required]],
      representative: [null, [Validators.required]],
      projectLabel: [null, [Validators.required]],
      website: [null, [Validators.required]],
      email: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {}

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }
  
}
