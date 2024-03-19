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
  selector: 'app-release-view-version-control',
  templateUrl: './version-control.component.html'
})
export class ReleaseVersionControlComponent implements OnInit {

  @Input() title?: string;
  @Input() description?: string;
  fetchLoader: boolean = false;
  releaseId: string = '';
  releaseDetails: any;
  releaseConfigDetails: any;
  formViewType: string = '';
  editVersionControlPlanId: string = '';
  deleteVersionControlId: string = '';
  formActionLoader: boolean = false;
  expandedVersionControlId: string = '';
  versionControlForm: UntypedFormGroup;
  versionControlModifiedName: any;
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
    this.versionControlForm = this.fb.group({
      systemHostedPlatform: [''],
      technologies: [''],
      codeRepositories: [''],
      automatedTools: [''],
      securityTestingTools: [''],
      additionalInputs: ['']
    });
  }

  ngOnInit(): void {
    console.log('Inside ReleaseVersionControlComponent');

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

      this.getMemberDetails(this.releaseDetails.releasePerformanceStrategy[0].lastModifiedById);
    });
  }


  /*
    Dialog Method: Delete Defects, Bugs, Observations
  */
  versionControlComponentDeleteActions(titleData: any): any {
    this.dialog.open(DialogSharedComponent, {
      panelClass: ['w-5/12'],
      data: {
        type: 'confirmation',
        confirmationContent: {
          title: 'Are you sure you want to delete ' + '"' + titleData + '"' + ' from release performance details ?',
          subtitle: ''
        }
      },
    }).afterClosed().subscribe((result: boolean) => {
      console.log(result);

      if(result) {
        this.formViewType = 'Delete'; 
        this.updateVersionControl();
      }
    });
  }


  /*
    Get member details by ID
  */
  getMemberDetails(memberId: string): void {
    this.versionControlModifiedName = null;
    this.membersService.getMemberDetails(memberId).subscribe((response: any) => {
      console.log(response);

      this.versionControlModifiedName = response;
    });
  }


    /*
    Add Release Objectives.
  */
  updateVersionControl(): void {

    const paramToBeUpdatedValue = 'releaseVersionControl';
    this.formActionLoader = true;

    // Set the payload details.
    let releaseDetailsPayload: any = {
      releaseId: this.releaseDetails._id,
      paramToBeUpdatedValue: paramToBeUpdatedValue,
      actionType: this.formViewType.toLowerCase(),
      releaseDetailsUpdatePayload: {
        [paramToBeUpdatedValue] : [
          {
            systemHostedPlatform: this.versionControlForm.get('systemHostedPlatform')?.value,
            technologies: this.versionControlForm.get('technologies')?.value,
            codeRepositories: this.versionControlForm.get('codeRepositories')?.value,
            automatedTools: this.versionControlForm.get('automatedTools')?.value,
            securityTestingTools: this.versionControlForm.get('securityTestingTools')?.value,
            additionalInputs: this.versionControlForm.get('additionalInputs')?.value
          }
        ]
      }
    }

    if(this.formViewType === 'Edit') {
      releaseDetailsPayload = {...releaseDetailsPayload, ...{"releaseObjectParamId": this.editVersionControlPlanId}}
    }

    // For deleting the objective.
    if(this.formViewType === 'Delete') {
      this.fetchLoader = true;
      delete releaseDetailsPayload.releaseDetailsUpdatePayload;
      releaseDetailsPayload = {...releaseDetailsPayload, ...{"releaseObjectParamId": this.deleteVersionControlId}}
    }

    console.log(releaseDetailsPayload);

    // Disable the form.
    this.versionControlForm.disable();

    this.releasesService.updateReleaseDetails(this.releaseDetails._id, releaseDetailsPayload).subscribe((response: any) => {
      console.log(response);

      setTimeout(() => {
        this.formActionLoader = false;

        this.formViewType = ''; 
        this.editVersionControlPlanId = '';

        this.fetchLoader = true;

        this.versionControlForm.enable();

        this.getReleasesDetails();
      }, 1000);
      
      
    })
  }

  /* 
    Reset form.
  */
  resetForm(): void {
    this.versionControlForm.reset();
  }


  /*
    Edit enhancement.
  */
  editVersionControlForm(versionControl: any): void {
    console.log(versionControl);
    this.versionControlForm.patchValue(versionControl);
  }


    /*
    Filter clients, release config IDs.
  */
  filterRequiredIds(type: string, id: string): any {

    return this.releaseConfigDetails[type].filter((item: any) => {
        return item._id === id;
     })[0]?.value;

    // // Return System Hosted Platform value.
    // if(type === 'systemHostedPlatform') {
    //   return this.releaseConfigDetails.systemHostedPlatform.filter((platform: any) => {
    //      return platform._id === id;
    //   })[0]?.value;
    // }

    // // Return Technology value.
    // if(type === 'technologies') {
    //     return this.releaseConfigDetails.technologies.filter((technology: any) => {
    //        return technology._id === id;
    //     })[0]?.value;
    //   }

    //   // Return Code Repository value.
    // if(type === 'codeRepositories') {
    //     return this.releaseConfigDetails.codeRepositories.filter((codeRepository: any) => {
    //        return codeRepository._id === id;
    //     })[0]?.value;
    //   }

    //   // Return Automated Tool value.
    // if(type === 'automatedTools') {
    //     return this.releaseConfigDetails.automatedTools.filter((automatedTool: any) => {
    //        return automatedTool._id === id;
    //     })[0]?.value;
    //   }

    // //   Return Security Testing Tool value.
    //   if(type === 'securityTestingTools') {
    //     return this.releaseConfigDetails.securityTestingTools.filter((securityTestingTool: any) => {
    //        return securityTestingTool._id === id;
    //     })[0]?.value;
    //   }
  }
}
