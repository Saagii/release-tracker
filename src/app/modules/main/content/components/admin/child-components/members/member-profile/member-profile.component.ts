import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/modules/shared/services/status.service';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html'
})
export class MemberProfileComponent implements OnInit {
  
  requirementsPanelOpenState = false;
  viewMoreReqDetails: string = '';

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
