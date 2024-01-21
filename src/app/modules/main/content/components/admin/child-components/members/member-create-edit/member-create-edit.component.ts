import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { StatusService } from 'src/app/modules/shared/services/status.service';

@Component({
  selector: 'app-member-create-edit',
  templateUrl: './member-create-edit.component.html'
})
export class MemberCreateEditComponent implements OnInit {

    memberCreateEditForm: UntypedFormGroup;


  constructor(
    private statusService: StatusService,
    private fb: UntypedFormBuilder,
  ) {
     // Prepare Sign In Form
     this.memberCreateEditForm = this.fb.group({
      memberType: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      title: [null, [Validators.required]],
      role: [null, [Validators.required]]
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
