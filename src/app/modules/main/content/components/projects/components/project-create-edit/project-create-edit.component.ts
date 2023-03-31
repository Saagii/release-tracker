import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusService } from 'src/app/modules/shared/services/status.service';

@Component({
  selector: 'app-project-create-edit',
  templateUrl: './project-create-edit.component.html'
})
export class ProjectCreateEditComponent implements OnInit {

  projectCreateEditForm: FormGroup;


  constructor(
    private statusService: StatusService,
    private fb: FormBuilder,
  ) {
     // Prepare Sign In Form
     this.projectCreateEditForm = this.fb.group({
      client: [null, [Validators.required]],
      projectName: [null, [Validators.required]],
      projectSummary: [null, [Validators.required]],
      projectMembers: [null, [Validators.required]],
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
