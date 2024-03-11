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
  selector: 'app-release-view-deployment-plan',
  templateUrl: './deployment-plan.component.html'
})
export class ReleaseDeploymentPlanComponent implements OnInit {

  @Input() title?: string;
  @Input() description?: string;
  fetchLoader: boolean = false;
  releaseId: string = '';
  releaseDetails: any;
  releaseConfigDetails: any;
  formViewType: string = '';
  editDeploymentPlanId: string = '';
  deleteDeploymentPlanId: string = '';
  formActionLoader: boolean = false;
  expandedDeploymentPlanId: string = '';
  deploymentPlanForm: UntypedFormGroup;
  deploymentPlanModifiedName: any;
  timeArray: string[] = [];

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
    this.deploymentPlanForm = this.fb.group({
      type: [''],
      deploymentDate: [''],
      deploymentDownTime: [''],
      deploymentDomainId: [''],
      time: [''],
      meridian: [''],
      downTimeFormat: ['']
    });
  }

  ngOnInit(): void {
    console.log('Inside ReleaseDeploymentPlanComponent');

    this.releaseId = this._activatedRoute.snapshot.params['id'];

    // Get release config.
    this.getReleaseConfigDetails();

    // Set time dropdown values.
    for(var i=0; i<12; i++) {
      let time: any = i+1;
      this.timeArray.push(time + ' : 00');
      this.timeArray.push(time + ' : 30');
    }
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
  deploymentPlanComponentDeleteActions(titleData: any): any {
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
        this.updateReleaseDeploymentStrategy();
      }
    });
  }


  /*
    Get member details by ID
  */
  getMemberDetails(memberId: string): void {
    this.deploymentPlanModifiedName = null;
    this.membersService.getMemberDetails(memberId).subscribe((response: any) => {
      console.log(response);

      this.deploymentPlanModifiedName = response;
    });
  }


    /*
    Add Release Objectives.
  */
  updateReleaseDeploymentStrategy(): void {

    const paramToBeUpdatedValue = 'releaseDeploymentStrategy';
    this.formActionLoader = true;

    // Set the payload details.
    let releaseDetailsPayload: any = {
      releaseId: this.releaseDetails._id,
      paramToBeUpdatedValue: paramToBeUpdatedValue,
      actionType: this.formViewType.toLowerCase(),
      releaseDetailsUpdatePayload: {
        [paramToBeUpdatedValue] : [
          {
            type: this.deploymentPlanForm.get('type')?.value,
            deploymentDate: this.deploymentPlanForm.get('deploymentDate')?.value,
            deploymentTime: this.deploymentPlanForm.get('time')?.value,
            deploymentTimeMeridian: this.deploymentPlanForm.get('meridian')?.value,
            deploymentDownTime: this.deploymentPlanForm.get('deploymentDownTime')?.value,
            deploymentDownTimeFormat: this.deploymentPlanForm.get('downTimeFormat')?.value,
            deploymentDomainId: this.deploymentPlanForm.get('deploymentDomainId')?.value
          }
        ]
      }
    }

    if(this.formViewType === 'Edit') {
      releaseDetailsPayload = {...releaseDetailsPayload, ...{"releaseObjectParamId": this.editDeploymentPlanId}}
    }

    // For deleting the objective.
    if(this.formViewType === 'Delete') {
      this.fetchLoader = true;
      delete releaseDetailsPayload.releaseDetailsUpdatePayload;
      releaseDetailsPayload = {...releaseDetailsPayload, ...{"releaseObjectParamId": this.deleteDeploymentPlanId}}
    }

    console.log(releaseDetailsPayload);

    // Disable the form.
    this.deploymentPlanForm.disable();

    this.releasesService.updateReleaseDetails(this.releaseDetails._id, releaseDetailsPayload).subscribe((response: any) => {
      console.log(response);

      setTimeout(() => {
        this.formActionLoader = false;

        this.formViewType = ''; 
        this.editDeploymentPlanId = '';

        this.fetchLoader = true;

        this.deploymentPlanForm.enable();

        this.getReleasesDetails();
      }, 1000);
      
      
    })
  }

  /* 
    Reset form.
  */
  resetForm(): void {
    this.deploymentPlanForm.reset();
  }


  /*
    Edit enhancement.
  */
  editDeploymentPlansForm(deploymentPLan: any): void {
    console.log(deploymentPLan);
    this.deploymentPlanForm.setValue(deploymentPLan);
  }


    /*
    Filter clients, release config IDs.
  */
  filterRequiredIds(type: string, id: string): any {

    // Return Type value.
    if(type === 'type') {
      return this.releaseConfigDetails.deploymentTypes.filter((type: any) => {
         return type._id === id;
      })[0]?.value;
    }
  }
}
