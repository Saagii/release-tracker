import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { clientProfileMockData } from '../../../../data/client-profile-mock-data';
import { requirementsListMockData } from '../../../../data/requirements-list-mock-data';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html'
})
export class ClientProfileComponent implements OnInit {
  
  clientProfileData: any = clientProfileMockData;
  requirementsPanelOpenState = false;
  viewMoreReqDetails: string = '';
  phases = requirementsListMockData;

  constructor(
    private statusService: StatusService
  ) {}

  ngOnInit(): void {}

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }

  /* 
    Requirement View Toggle method
  */
  toggleRequirementView(toggleValue: any): void {
    this.viewMoreReqDetails = toggleValue;
  }
  
}
