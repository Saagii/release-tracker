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
  selector: 'app-release-view-performance-optimization',
  templateUrl: './performance-optimization.component.html'
})
export class ReleasePerformanceOptimizationComponent implements OnInit {

  @Input() title?: string;
  @Input() description?: string;
  fetchLoader: boolean = false;
  releaseId: string = '';
  releaseDetails: any;
  releaseConfigDetails: any;
  formViewType: string = '';
  editPerformanceOptimizationPlanId: string = '';
  deletePerformanceOptimizationId: string = '';
  formActionLoader: boolean = false;
  expandedPerformanceOptimizationId: string = '';
  performanceOptimizationForm: UntypedFormGroup;
  performanceOptimizationModifiedName: any;
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
    this.performanceOptimizationForm = this.fb.group({
      responseTime: [''],
      throughput: [''],
      errorRate: [''],
      cpuMemoryUsage: [''],
      networkLatency: [''],
      pageLoadTime: [''],
      algorithimicOptimization: [''],
      cachingStrategies: [''],
      databaseOptimization: [''],
      codeOptimization: [''],
      resourceUtilizationOptimization: [''],
      newtorkOptimization: [''],
      frontEndOptimization: ['']
    });
  }

  ngOnInit(): void {
    console.log('Inside ReleasePerformanceOptimizationComponent');

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
  performanceOptimizationComponentDeleteActions(titleData: any): any {
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
        this.updatePerformanceOptimization();
      }
    });
  }


  /*
    Get member details by ID
  */
  getMemberDetails(memberId: string): void {
    this.performanceOptimizationModifiedName = null;
    this.membersService.getMemberDetails(memberId).subscribe((response: any) => {
      console.log(response);

      this.performanceOptimizationModifiedName = response;
    });
  }


    /*
    Add Release Objectives.
  */
  updatePerformanceOptimization(): void {

    const paramToBeUpdatedValue = 'releasePerformanceStrategy';
    this.formActionLoader = true;

    // Set the payload details.
    let releaseDetailsPayload: any = {
      releaseId: this.releaseDetails._id,
      paramToBeUpdatedValue: paramToBeUpdatedValue,
      actionType: this.formViewType.toLowerCase(),
      releaseDetailsUpdatePayload: {
        [paramToBeUpdatedValue] : [
          {
            responseTime: this.performanceOptimizationForm.get('responseTime')?.value,
            throughput: this.performanceOptimizationForm.get('throughput')?.value,
            errorRate: this.performanceOptimizationForm.get('errorRate')?.value,
            cpuMemoryUsage: this.performanceOptimizationForm.get('cpuMemoryUsage')?.value,
            networkLatency: this.performanceOptimizationForm.get('networkLatency')?.value,
            pageLoadTime: this.performanceOptimizationForm.get('pageLoadTime')?.value,
            algorithimicOptimization: this.performanceOptimizationForm.get('algorithimicOptimization')?.value,
            cachingStrategies: this.performanceOptimizationForm.get('cachingStrategies')?.value,
            databaseOptimization: this.performanceOptimizationForm.get('databaseOptimization')?.value,
            codeOptimization: this.performanceOptimizationForm.get('codeOptimization')?.value,
            resourceUtilizationOptimization: this.performanceOptimizationForm.get('resourceUtilizationOptimization')?.value,
            newtorkOptimization: this.performanceOptimizationForm.get('newtorkOptimization')?.value,
            frontEndOptimization: this.performanceOptimizationForm.get('frontEndOptimization')?.value
          }
        ]
      }
    }

    if(this.formViewType === 'Edit') {
      releaseDetailsPayload = {...releaseDetailsPayload, ...{"releaseObjectParamId": this.editPerformanceOptimizationPlanId}}
    }

    // For deleting the objective.
    if(this.formViewType === 'Delete') {
      this.fetchLoader = true;
      delete releaseDetailsPayload.releaseDetailsUpdatePayload;
      releaseDetailsPayload = {...releaseDetailsPayload, ...{"releaseObjectParamId": this.deletePerformanceOptimizationId}}
    }

    console.log(releaseDetailsPayload);

    // Disable the form.
    this.performanceOptimizationForm.disable();

    this.releasesService.updateReleaseDetails(this.releaseDetails._id, releaseDetailsPayload).subscribe((response: any) => {
      console.log(response);

      setTimeout(() => {
        this.formActionLoader = false;

        this.formViewType = ''; 
        this.editPerformanceOptimizationPlanId = '';

        this.fetchLoader = true;

        this.performanceOptimizationForm.enable();

        this.getReleasesDetails();
      }, 1000);
      
      
    })
  }

  /* 
    Reset form.
  */
  resetForm(): void {
    this.performanceOptimizationForm.reset();
  }


  /*
    Edit enhancement.
  */
  editPerformanceOptimizationForm(performanceOptimization: any): void {
    console.log(performanceOptimization);
    this.performanceOptimizationForm.patchValue(performanceOptimization);
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
