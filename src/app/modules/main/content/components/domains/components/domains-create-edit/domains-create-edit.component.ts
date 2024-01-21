import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { StatusService } from 'src/app/modules/shared/services/status.service';

@Component({
  selector: 'app-domains-create-edit',
  templateUrl: './domains-create-edit.component.html'
})
export class DomainCreateEditComponent implements OnInit {

    domainCreateEditForm: UntypedFormGroup;


  constructor(
    private statusService: StatusService,
    private fb: UntypedFormBuilder,
  ) {
     // Prepare domain Form
     this.domainCreateEditForm = this.fb.group({
      client: [null, [Validators.required]],
      domainURL: [null, [Validators.required]],
      domainType: [null, [Validators.required]],
      domainStatus: [null, [Validators.required]],
      domainBranch: [null, [Validators.required]],
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
