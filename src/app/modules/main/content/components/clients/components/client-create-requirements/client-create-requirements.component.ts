import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { requirementsListMockData } from '../../../../data/requirements-list-mock-data';

@Component({
  selector: 'app-client-create-requirements',
  templateUrl: './client-create-requirements.component.html'
})
export class ClientCreateRequirementsComponent implements OnInit {

    clientCreateRequirementsForm: FormGroup;
    // <!-- Title, Desc, Project, Type, Links, Start Date, End Date, Status -->

  constructor(
    private statusService: StatusService,
    private fb: FormBuilder,
  ) {
     // Prepare Instance Form
     this.clientCreateRequirementsForm = this.fb.group({
      client: [null, [Validators.required]],
      phaseNumber: [null, [Validators.required]],
      phaseStartDate: [null, [Validators.required]],
      phaseEndDate: [null, [Validators.required]],
      phaseCategory: [null, [Validators.required]],
      requirementType: [null, [Validators.required]],
      requirementTitle: [null, [Validators.required]],
      requirementDescription: [null, [Validators.required]],
      project: [null, [Validators.required]],
      label: [null, [Validators.required]],
      links: [null],
      requirementStartDate: [null, [Validators.required]],
      requirementEndDate: [null, [Validators.required]],
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
