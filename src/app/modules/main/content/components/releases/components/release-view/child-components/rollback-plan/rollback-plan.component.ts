import { Component, Input, OnInit } from '@angular/core';
import { statusListMockDataMenu } from 'src/app/modules/shared/data/status-list-mock-data';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { ActivatedRoute } from '@angular/router';
import { ReleasesService } from 'src/app/modules/main/services/releases.service';
import { ClientsService } from 'src/app/modules/main/services/clients.service';
import { MembersService } from 'src/app/modules/main/services/members.service';
import { ProjectsService } from 'src/app/modules/main/services/projects.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { DialogSharedComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-release-view-rollback-plan',
  templateUrl: './rollback-plan.component.html'
})
export class ReleaseRollbackPlansComponent implements OnInit {

  @Input() title?: string;
  @Input() description?: string;
  fetchLoader: boolean = false;
  releaseId: string = '';
  releaseDetails: any;
  releaseConfigDetails: any;
  formViewType: string = '';
  editRollbackPlanId: string = '';
  deleteRollbackPlanId: string = '';
  formActionLoader: boolean = false;
  expandedRollbackPlanId: string = '';
  rollbackPlanForm: UntypedFormGroup;
  rollbackPlanModifiedName: any;
  membersList: any;
  teamMembers: any[] = [];

  constructor(
    private statusService: StatusService,
    private _activatedRoute: ActivatedRoute,
    private releasesService: ReleasesService,
    private clientsService: ClientsService,
    private membersService: MembersService,
    private projectsService: ProjectsService,
    private fb: UntypedFormBuilder,
    public dialog: MatDialog,
  ) {
    // Prepare Objectives Form
    this.rollbackPlanForm = this.fb.group({
      type: [''],
      reasons: [''],
      testingPlan: [''],
      rollbackTeam: [''],
      rollbackTimeline: [''],
      userImpactMitigation: [''],
      escalationPlan: [''],
      comments: ['']
    });
  }

  ngOnInit(): void {
    console.log('Inside ReleaseRollbackPlansComponent');

    this.releaseId = this._activatedRoute.snapshot.params['id'];

    // Get release config.
    this.getReleaseConfigDetails();
  }


  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }


  /*
    Get release config details.
  */
  getReleaseConfigDetails(): any {
    this.fetchLoader = true;
    this.releasesService.getReleasesConfig().subscribe((releaseConfig: any) => {
      console.log(releaseConfig);

      this.releaseConfigDetails = releaseConfig;
      
      // Get Releases details.
      this.getReleasesDetails();
    });
  }


    /*
    Get Releases details.
  */
  getReleasesDetails(): any {
    this.releasesService.getReleaseDetails(this.releaseId).subscribe((releaseDetails: any) => {
      console.log(releaseDetails);

      this.fetchLoader = false;
      
      this.releaseDetails = releaseDetails;
    });
  }


  /*
    Dialog Method: Delete Defects, Bugs, Observations
  */
  rollbackPlanDeleteActions(titleData: any): any {
    this.dialog.open(DialogSharedComponent, {
      panelClass: ['w-5/12'],
      data: {
        type: 'confirmation',
        confirmationContent: {
          title: 'Are you sure you want to delete ' + '"' + titleData + '"' + ' from release rollback plans ?',
          subtitle: ''
        }
      },
    }).afterClosed().subscribe((result: boolean) => {
      console.log(result);

      if(result) {
        this.formViewType = 'Delete'; 
        this.updateReleaseRollbackPlan();
      }
    });
  }


  /*
    Get member details by ID
  */
  getMemberDetails(memberId: string): void {
    this.rollbackPlanModifiedName = null;
    this.membersService.getMemberDetails(memberId).subscribe((response: any) => {
      console.log(response);

      this.rollbackPlanModifiedName = response;
    });
  }


    /*
    Add Release Objectives.
  */
  updateReleaseRollbackPlan(): void {

    // Filter Team members id into a list.
    const teamMembersList = [];

    for(const teamMember of this.teamMembers) {
      teamMembersList.push(teamMember._id);
    }

    const paramToBeUpdatedValue = 'releaseRollbackPlan';
    this.formActionLoader = true;

    // Set the payload details.
    let releaseDetailsPayload: any = {
      releaseId: this.releaseDetails._id,
      paramToBeUpdatedValue: paramToBeUpdatedValue,
      actionType: this.formViewType.toLowerCase(),
      releaseDetailsUpdatePayload: {
        [paramToBeUpdatedValue] : [
          {
            type: this.rollbackPlanForm.get('type')?.value,
            reasons: this.rollbackPlanForm.get('reasons')?.value,
            testingPlan: this.rollbackPlanForm.get('testingPlan')?.value,
            rollbackTeam: teamMembersList,
            rollbackTimeline: this.rollbackPlanForm.get('rollbackTimeline')?.value,
            userImpactMitigation: this.rollbackPlanForm.get('userImpactMitigation')?.value,
            escalationPlan: this.rollbackPlanForm.get('escalationPlan')?.value,
            comments: this.rollbackPlanForm.get('comments')?.value
          }
        ]
      }
    }

    if(this.formViewType === 'Edit') {
      releaseDetailsPayload = {...releaseDetailsPayload, ...{"releaseObjectParamId": this.editRollbackPlanId}}
    }

    // For deleting the objective.
    if(this.formViewType === 'Delete') {
      this.fetchLoader = true;
      delete releaseDetailsPayload.releaseDetailsUpdatePayload;
      releaseDetailsPayload = {...releaseDetailsPayload, ...{"releaseObjectParamId": this.deleteRollbackPlanId}}
    }

    console.log(releaseDetailsPayload);

    // Disable the form.
    this.rollbackPlanForm.disable();

    this.releasesService.updateReleaseDetails(this.releaseDetails._id, releaseDetailsPayload).subscribe((response: any) => {
      console.log(response);

      setTimeout(() => {
        this.formActionLoader = false;

        this.formViewType = ''; 
        this.editRollbackPlanId = '';

        this.fetchLoader = true;

        this.rollbackPlanForm.enable();

        this.getReleasesDetails();
      }, 1000);
      
      
    })
  }

  /* 
    Reset form.
  */
  resetForm(): void {
    this.rollbackPlanForm.reset();
  }


  /*
    Edit Defects.
  */
  editRollbackPlan(rollback: any): void {
    console.log(rollback);
    this.teamMembers = rollback.rollbackTeam;
    this.rollbackPlanForm.setValue(rollback);
  }


    /*
    Filter clients, release config IDs.
  */
  filterRequiredIds(type: string, id: string): any {

    // Return Type value.
    if(type === 'type') {
      return this.releaseConfigDetails.rollbackPlanTypes.filter((type: any) => {
         return type._id === id;
      })[0]?.value;
    }
  }


    /*
    Search Member.
  */
  searchMember(event: any): void {
    console.log(event.target.value);

    if(event.target.value === '') {
      this.membersList = [];
      return;
    }

    const membersSearchPayload = {
      memberType: '',
      firstName: this.rollbackPlanForm.get('rollbackTeam')?.value,
      lastName: this.rollbackPlanForm.get('rollbackTeam')?.value,
      email: this.rollbackPlanForm.get('rollbackTeam')?.value,
      title: '',
    }

    this.membersService.getMembersListBySearch(membersSearchPayload).subscribe((response: any) => {
      console.log(response);

      this.membersList = response;
    });
  }


  /*
    Manage Team Members: Update action.
  */
  manageTeamMembers(teamMember: any, action: string, index?: any): void {
    if(action === 'save') {
      this.teamMembers.push(teamMember);
      this.membersList = [];
      this.rollbackPlanForm.get('rollbackTeam')?.setValue('');
    }

    if(action === 'remove') {
      this.membersList = [];
      this.rollbackPlanForm.get('rollbackTeam')?.setValue('');
      this.teamMembers.splice(index, 1);
    }
  }


  /*
    Filter selected members from search results.
  */
  filterSelectedMembersFromSearchResults(memberId: string): boolean {
    for(const member of this.teamMembers) {
      if(member._id === memberId) { return false; }
    }
    return true;
  }
}
