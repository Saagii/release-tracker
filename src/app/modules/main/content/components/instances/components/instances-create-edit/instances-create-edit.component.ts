import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusService } from 'src/app/modules/shared/services/status.service';

@Component({
  selector: 'app-instances-create-edit',
  templateUrl: './instances-create-edit.component.html'
})
export class InstanceCreateEditComponent implements OnInit {

    instanceCreateEditForm: FormGroup;


  constructor(
    private statusService: StatusService,
    private fb: FormBuilder,
  ) {
     // Prepare Instance Form
     this.instanceCreateEditForm = this.fb.group({
      client: [null, [Validators.required]],
      instanceURL: [null, [Validators.required]],
      instanceType: [null, [Validators.required]],
      instanceStatus: [null, [Validators.required]],
      instanceBranch: [null, [Validators.required]],
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
