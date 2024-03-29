import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ClientsService } from 'src/app/modules/main/services/clients.service';
import { MembersService } from 'src/app/modules/main/services/members.service';
import { ProjectsService } from 'src/app/modules/main/services/projects.service';
import { ReleasesService } from 'src/app/modules/main/services/releases.service';
import { StatusService } from 'src/app/modules/shared/services/status.service';

@Component({
  selector: 'app-release-create-edit',
  templateUrl: './release-create-edit.component.html'
})
export class ReleaseCreateEditComponent implements OnInit {

    releaseCreateEditForm: UntypedFormGroup;
    clientsList: any;
    membersList: any;
    releaseConfigDetails: any;
    memberId: any;
    selectedClientId: string = '';
    projectsList: any = [];
    isProjectIdSelected: boolean = false;
    releaseId: string = '';
    releaseDetails: any;

  constructor(
    private statusService: StatusService,
    private fb: UntypedFormBuilder,
    private clientService: ClientsService,
    private releaseService: ReleasesService,
    private membersService: MembersService,
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
    private authService: AuthService,
    private router: Router,
  ) {
     // Prepare Sign In Form
     this.releaseCreateEditForm = this.fb.group({
      client: [null, [Validators.required]],
      project: [null, [Validators.required]],
      releaseName: [null, [Validators.required]],
      releaseTitle: [null, [Validators.required]],
      releaseType: [null, [Validators.required]],
      releaseTarget: [null, [Validators.required]],
      releasePriority: [null, [Validators.required]],
      releaseOwner: [null, [Validators.required]],
      releaseObjective: [null, [Validators.required]],
      releaseClosingDate: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {

    if(window.location.href.includes('edit')) {
      this.releaseId = this.activatedRoute.snapshot.params['id'];
      console.log(this.releaseId);
    }

    // Get release config details.
    this.getReleaseConfigDetails();

    // Get members list.
    this.getMembersList();

    // Get User Details.
    console.log(this.authService.memberIdValue);
    this.memberId = this.authService.memberIdValue;
  }

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }


  /*
    Get Clients List.
  */
  getClientsList(): any {
    this.clientService.getClientsList().subscribe((clients: any[]) => {
      console.log(clients);

      this.clientsList = clients;

      // Get Releases details.
      this.getReleasesDetails();
    });
  }


  /*
    Get Release config details.
  */
  getReleaseConfigDetails(): any {
    this.releaseService.getReleasesConfig().subscribe((releaseConfig: any) => {
      console.log(releaseConfig);

      this.releaseConfigDetails = releaseConfig;

      // Get Clients List
      this.getClientsList();
    })
  }

  /*
    Get Releases details.
  */
  getReleasesDetails(): any {
    this.releaseService.getReleaseDetails(this.releaseId).subscribe((releaseDetails: any) => {
      console.log(releaseDetails);
      
      this.releaseDetails = releaseDetails;

      this.selectedClientId = this.releaseDetails.clientId;

      // set the form fields values
      this.releaseCreateEditForm.get('client')?.setValue(this.releaseDetails.clientId);
      this.releaseCreateEditForm.get('project')?.setValue(this.releaseDetails.projectId);
      this.releaseCreateEditForm.get('releaseTitle')?.setValue(this.releaseDetails.releaseTitle);
      this.releaseCreateEditForm.get('releaseTarget')?.setValue(this.releaseDetails.releaseTargetId);
      this.releaseCreateEditForm.get('releaseType')?.setValue(this.releaseDetails.releaseTypeId);
      this.releaseCreateEditForm.get('releaseOwner')?.setValue(this.releaseDetails.releaseOwnerId);
      this.releaseCreateEditForm.get('releasePriority')?.setValue(this.releaseDetails.releasePriority);
      this.releaseCreateEditForm.get('releaseClosingDate')?.setValue(this.releaseDetails.releaseClosingDate);

      this.getProjectsListByClientId(this.releaseDetails.clientId);
    });
  }


  /*
    Get members list.
  */
  getMembersList(): any {
    this.membersService.getMembersListByType('Internal').subscribe((membersList: any) => {
      console.log(membersList);

      this.membersList = membersList;
    });
  }


  /*
    Get client id on selection.
  */
  getClientIdOnSelection(event: MatSelectChange): void {
    console.log(event);

    this.selectedClientId = event.value;

    this.getProjectsListByClientId(this.selectedClientId);
  }


  /*
    Get project id on selection.
  */
  getProjectIdOnSelection(event: MatSelectChange): void {
    console.log(event);

    this.isProjectIdSelected = true;
  }


  /*
    Get project list based on the client selection.
  */
  getProjectsListByClientId(clientId: string): void {
    this.projectsService.getProjectDetailsByClientId(clientId).subscribe((projectsList: any) => {
      console.log(projectsList);

      this.projectsList = projectsList;

      if(this.releaseId !== '') {
        this.isProjectIdSelected = true;
      }
    });
  }


  /*
    Submit release details.
  */
  submiteReleaseDetails(): any {
    
    // Release details payload.
    const releaseDetailsPayload = {
      clientId: this.releaseCreateEditForm.get('client')?.value,
      projectId: this.releaseCreateEditForm.get('project')?.value,
      releaseTitle: this.releaseCreateEditForm.get('releaseTitle')?.value,
      releaseTypeId: this.releaseCreateEditForm.get('releaseType')?.value,
      releaseTargetId: this.releaseCreateEditForm.get('releaseTarget')?.value,
      releaseOwnerId: this.releaseCreateEditForm.get('releaseOwner')?.value,
      releaseClosingDate: this.releaseCreateEditForm.get('releaseClosingDate')?.value,
      releaseCreatedOnDate: new Date(),
      releaseCreatedById: this.memberId,
      releaseStatusId: this.releaseConfigDetails.status.filter((status: any) => { return status.value === 'Initiated' })[0]._id,
      releasePriority: this.releaseCreateEditForm.get('releasePriority')?.value
    };

    console.log(releaseDetailsPayload);

    this.releaseService.createReleaseDetails(releaseDetailsPayload).subscribe((response: any) => {
      console.log(response);

      this.router.navigate(['../', response], {relativeTo: this.activatedRoute});

      window.scrollTo(0, 0);
    });
  }
  
}
