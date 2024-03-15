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
  selector: 'app-release-view-user-support',
  templateUrl: './user-support.component.html'
})
export class ReleaseUserSupportComponent implements OnInit {

  @Input() title?: string;
  @Input() description?: string;
  fetchLoader: boolean = false;
  releaseId: string = '';
  releaseDetails: any;
  releaseConfigDetails: any;
  formViewType: string = '';
  editUserSupportId: string = '';
  deleteUserSupportId: string = '';
  formActionLoader: boolean = false;
  expandedUserSupportId: string = '';
  userSupportForm: UntypedFormGroup;
  userSupportModifiedName: any;
  membersList: any;
  teamMembers: any[] = [];
  internalMembers: any;

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
    this.userSupportForm = this.fb.group({
      userSupportType: [''],
      userSupportMembers: [''],
      userSupportDurationValue: [''],
      userSupportDurationFormat: [''],
      userSupportStartDate: [''],
      userSupportEndDate: [''],
      comments: ['']
    });
  }

  ngOnInit(): void {
    console.log('Inside ReleaseUserSupportsComponent');

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

      // Get members list.
      this.getMembersList();
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
    Get Members List.
  */
  getMembersList(): void {
    this.membersService.getMembersListByType('Internal').subscribe((response: any[]) => {
      console.log(response);
      
      this.internalMembers = response;
    });
  }


  /*
    Dialog Method: Delete Defects, Bugs, Observations
  */
  userSupportDeleteActions(titleData: any): any {
    this.dialog.open(DialogSharedComponent, {
      panelClass: ['w-5/12'],
      data: {
        type: 'confirmation',
        confirmationContent: {
          title: 'Are you sure you want to delete ' + '"' + titleData + '"' + ' from release User Support strategies ?',
          subtitle: ''
        }
      },
    }).afterClosed().subscribe((result: boolean) => {
      console.log(result);

      if(result) {
        this.formViewType = 'Delete'; 
        this.updateReleaseUserSupport();
      }
    });
  }


  /*
    Get member details by ID
  */
  getMemberDetails(memberId: string): void {
    this.userSupportModifiedName = null;
    this.membersService.getMemberDetails(memberId).subscribe((response: any) => {
      console.log(response);

      this.userSupportModifiedName = response;
    });
  }


    /*
    Add Release Objectives.
  */
  updateReleaseUserSupport(): void {

    // Filter Team members id into a list.
    const teamMembersList: any = [];

    for(const teamMember of this.teamMembers) {
      teamMembersList.push(teamMember._id);
    }

    const paramToBeUpdatedValue = 'releaseUserSupport';
    this.formActionLoader = true;

    // Set the payload details.
    let releaseDetailsPayload: any = {
      releaseId: this.releaseDetails._id,
      paramToBeUpdatedValue: paramToBeUpdatedValue,
      actionType: this.formViewType.toLowerCase(),
      releaseDetailsUpdatePayload: {
        [paramToBeUpdatedValue] : [
          {
            userSupportType: this.userSupportForm.get('userSupportType')?.value,
            userSupportMembers: teamMembersList,
            userSupportDurationValue: this.userSupportForm.get('userSupportDurationValue')?.value,
            userSupportDurationFormat: this.userSupportForm.get('userSupportDurationFormat')?.value,
            userSupportStartDate: this.userSupportForm.get('userSupportStartDate')?.value,
            userSupportEndDate: this.userSupportForm.get('userSupportEndDate')?.value,
            comments: this.userSupportForm.get('comments')?.value
          }
        ]
      }
    }

    if(this.formViewType === 'Edit') {
      releaseDetailsPayload = {...releaseDetailsPayload, ...{"releaseObjectParamId": this.editUserSupportId}}
    }

    // For deleting the objective.
    if(this.formViewType === 'Delete') {
      this.fetchLoader = true;
      delete releaseDetailsPayload.releaseDetailsUpdatePayload;
      releaseDetailsPayload = {...releaseDetailsPayload, ...{"releaseObjectParamId": this.deleteUserSupportId}}
    }

    console.log(releaseDetailsPayload);

    // Disable the form.
    this.userSupportForm.disable();

    this.releasesService.updateReleaseDetails(this.releaseDetails._id, releaseDetailsPayload).subscribe((response: any) => {
      console.log(response);

      setTimeout(() => {
        this.formActionLoader = false;

        this.formViewType = ''; 
        this.editUserSupportId = '';

        this.fetchLoader = true;

        this.userSupportForm.enable();

        this.getReleasesDetails();
      }, 1000);
      
      
    })
  }

  /* 
    Reset form.
  */
  resetForm(): void {
    this.userSupportForm.reset();
  }


  /*
    Edit Defects.
  */
  editUserSupport(userSupport: any): void {
    console.log(userSupport);
    for(const teamMemberId of userSupport.userSupportMembers) {
      for(const internalMember of this.internalMembers) {
        if(teamMemberId === internalMember._id) {
          this.teamMembers.push(internalMember);
        }
      }
    }
    let userSupportDetails = userSupport;
    // rollbackDetails.rollbackTeam = [];
    this.userSupportForm.patchValue(userSupportDetails);
    this.userSupportForm.get('userSupportMembers')?.setValue('');
  }


    /*
    Filter clients, release config IDs.
  */
  filterRequiredIds(type: string, id: string): any {

    // Return Type value.
    if(type === 'type') {
      return this.releaseConfigDetails.userSupportTypes.filter((type: any) => {
         return type._id === id;
      })[0]?.value;
    }

    // Return Type value.
    if(type === 'members') {
      const memberDetails = this.internalMembers.filter((member: any) => {
         return member._id === id;
      })[0];

      if(memberDetails) {
        return memberDetails.firstName + ' ' + memberDetails.lastName;
      } else {
        return '-NA-';
      }

      
    }
  }


    /*
    Search Member.
  */
  searchMember(event: any): void {
    console.log(event.target.value);

    if(event.target.value === '' || /^\s*$/.test(event.target.value)) {
      this.membersList = [];
      return;
    }

    const membersSearchPayload = {
      memberType: '',
      firstName: this.userSupportForm.get('userSupportMembers')?.value,
      lastName: this.userSupportForm.get('userSupportMembers')?.value,
      email: this.userSupportForm.get('userSupportMembers')?.value,
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
      this.userSupportForm.get('userSupportMembers')?.setValue('');
    }

    if(action === 'remove') {
      this.membersList = [];
      this.userSupportForm.get('userSupportMembers')?.setValue('');
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
