import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusService } from 'src/app/modules/shared/services/status.service';

@Component({
  selector: 'app-release-create-edit',
  templateUrl: './release-create-edit.component.html'
})
export class ReleaseCreateEditComponent implements OnInit {

    releaseCreateEditForm: FormGroup;


  constructor(
    private statusService: StatusService,
    private fb: FormBuilder,
  ) {
     // Prepare Sign In Form
     this.releaseCreateEditForm = this.fb.group({
      client: [null, [Validators.required]],
      releaseName: [null, [Validators.required]],
      releaseTitle: [null, [Validators.required]],
      releaseType: [null, [Validators.required]],
      releaseTarget: [null, [Validators.required]],
      releaseOwner: [null, [Validators.required]],
      releaseObjective: [null, [Validators.required]],
      releaseClosingDate: [null, [Validators.required]]
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
