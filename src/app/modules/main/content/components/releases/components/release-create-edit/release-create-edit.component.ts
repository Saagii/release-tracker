import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ClientsService } from 'src/app/modules/main/services/clients.service';
import { MembersService } from 'src/app/modules/main/services/members.service';
import { ReleasesService } from 'src/app/modules/main/services/releases.service';
import { StatusService } from 'src/app/modules/shared/services/status.service';

@Component({
  selector: 'app-release-create-edit',
  templateUrl: './release-create-edit.component.html'
})
export class ReleaseCreateEditComponent implements OnInit {

    releaseCreateEditForm: FormGroup;
    clientsList: any;
    membersList: any;
    releaseConfigDetails: any;
    memberId: any;


  constructor(
    private statusService: StatusService,
    private fb: FormBuilder,
    private clientService: ClientsService,
    private releaseService: ReleasesService,
    private membersService: MembersService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) {
     // Prepare Sign In Form
     this.releaseCreateEditForm = this.fb.group({
      client: [null, [Validators.required]],
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

    // Get Clients List
    this.getClientsList();

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
    });
  }


  /*
    Get Release config details.
  */
  getReleaseConfigDetails(): any {
    this.releaseService.getReleasesConfig().subscribe((releaseConfig: any) => {
      console.log(releaseConfig);

      this.releaseConfigDetails = releaseConfig;
    })
  }


  /*
    Get members list.
  */
  getMembersList(): any {
    this.membersService.getMembersList('Internal').subscribe((membersList: any) => {
      console.log(membersList);

      this.membersList = membersList;
    });
  }


  /*
    Submit release details.
  */
  submiteReleaseDetails(): any {
    
    // Release details payload.
    const releaseDetailsPayload = {
      clientId: this.releaseCreateEditForm.get('client')?.value,
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

      this.router.navigate(['../releases'], {relativeTo: this.activatedRoute});
    });
  }
  
}
