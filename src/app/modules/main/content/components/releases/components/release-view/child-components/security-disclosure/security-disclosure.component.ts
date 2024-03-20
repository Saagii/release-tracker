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
  selector: 'app-release-view-security-disclosure',
  templateUrl: './security-disclosure.component.html'
})
export class ReleaseSecurityDisclosureComponent implements OnInit {

  @Input() title?: string;
  @Input() description?: string;
  fetchLoader: boolean = false;
  releaseId: string = '';
  releaseDetails: any;
  releaseConfigDetails: any;
  formViewType: string = '';
  editSecurityDisclosureId: string = '';
  deleteSecurityDisclosureId: string = '';
  formActionLoader: boolean = false;
  expandedSecurityDisclosureId: string = '';
  securityDisclosureForm: UntypedFormGroup;
  securityDisclosureModifiedName: any;

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
    this.securityDisclosureForm = this.fb.group({
      securityVulnerabilities: [''],
      affectedAreas: [''],
      userDataImpact: [''],
      exploitationRisks: [''],
      regulatoryCompilance: [''],
      postDisclosurePlan: ['']
    });
  }

  ngOnInit(): void {
    console.log('Inside ReleaseEnhancementsInnovationsComponent');

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
  securityDisclosureComponentDeleteActions(titleData: any): any {
    this.dialog.open(DialogSharedComponent, {
      panelClass: ['w-5/12'],
      data: {
        type: 'confirmation',
        confirmationContent: {
          title: 'Are you sure you want to delete ' + '"' + titleData + '"' + ' from release enhancements & innovations ?',
          subtitle: ''
        }
      },
    }).afterClosed().subscribe((result: boolean) => {
      console.log(result);

      if(result) {
        this.formViewType = 'Delete'; 
        this.updateReleaseSecurityDisclosure();
      }
    });
  }


  /*
    Get member details by ID
  */
  getMemberDetails(memberId: string): void {
    this.securityDisclosureModifiedName = null;
    this.membersService.getMemberDetails(memberId).subscribe((response: any) => {
      console.log(response);

      this.securityDisclosureModifiedName = response;
    });
  }


    /*
    Add Release Objectives.
  */
  updateReleaseSecurityDisclosure(): void {

    const paramToBeUpdatedValue = 'releaseSecurityDisclosure';
    this.formActionLoader = true;

    // Set the payload details.
    let releaseDetailsPayload: any = {
      releaseId: this.releaseDetails._id,
      paramToBeUpdatedValue: paramToBeUpdatedValue,
      actionType: this.formViewType.toLowerCase(),
      releaseDetailsUpdatePayload: {
        [paramToBeUpdatedValue] : [
          {
            securityVulnerabilities: this.securityDisclosureForm.get('securityVulnerabilities')?.value,
            affectedAreas: this.securityDisclosureForm.get('affectedAreas')?.value,
            userDataImpact: this.securityDisclosureForm.get('userDataImpact')?.value,
            exploitationRisks: this.securityDisclosureForm.get('exploitationRisks')?.value,
            regulatoryCompilance: this.securityDisclosureForm.get('regulatoryCompilance')?.value,
            postDisclosurePlan: this.securityDisclosureForm.get('postDisclosurePlan')?.value
          }
        ]
      }
    }

    if(this.formViewType === 'Edit') {
      releaseDetailsPayload = {...releaseDetailsPayload, ...{"releaseObjectParamId": this.editSecurityDisclosureId}}
    }

    // For deleting the objective.
    if(this.formViewType === 'Delete') {
      this.fetchLoader = true;
      delete releaseDetailsPayload.releaseDetailsUpdatePayload;
      releaseDetailsPayload = {...releaseDetailsPayload, ...{"releaseObjectParamId": this.deleteSecurityDisclosureId}}
    }

    console.log(releaseDetailsPayload);

    // Disable the form.
    this.securityDisclosureForm.disable();

    this.releasesService.updateReleaseDetails(this.releaseDetails._id, releaseDetailsPayload).subscribe((response: any) => {
      console.log(response);

      setTimeout(() => {
        this.formActionLoader = false;

        this.formViewType = ''; 
        this.editSecurityDisclosureId = '';

        this.fetchLoader = true;

        this.securityDisclosureForm.enable();

        this.getReleasesDetails();
      }, 1000);
      
      
    })
  }

  /* 
    Reset form.
  */
  resetForm(): void {
    this.securityDisclosureForm.reset();
  }


  /*
    Edit enhancement.
  */
  editSecurityDisclosuresForm(enhancement: any): void {
    console.log(enhancement);
    this.securityDisclosureForm.setValue(enhancement);
  }


    /*
    Filter clients, release config IDs.
  */
  filterRequiredIds(type: string, id: string): any {

    // Return Status value.
    if(type === 'status') {
      return this.releaseConfigDetails.enhancementStatus.filter((status: any) => {
         return status._id === id;
      })[0]?.value;
    }

    // Return Status value.
    if(type === 'category') {
        return this.releaseConfigDetails.enhancementsCategories.filter((category: any) => {
           return category._id === id;
        })[0]?.value;
      }

    // Return Target value.
    if(type === 'target') {
      return this.releaseConfigDetails.targets.filter((target: any) => {
         return target._id === id;
      })[0]?.value;
    }

    // Return Type value.
    if(type === 'type') {
      return this.releaseConfigDetails.types.filter((type: any) => {
         return type._id === id;
      })[0]?.value;
    }
  }
}
