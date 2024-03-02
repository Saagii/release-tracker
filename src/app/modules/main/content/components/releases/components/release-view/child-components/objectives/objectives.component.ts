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
  selector: 'app-release-view-objectives',
  templateUrl: './objectives.component.html'
})
export class ReleaseObjectivesComponent implements OnInit {

  @Input() title?: string;
  @Input() description?: string;
  fetchLoader: boolean = false;
  releaseId: string = '';
  releaseDetails: any;
  releaseConfigDetails: any;
  releaseObjectivesForm: UntypedFormGroup;
  formViewType: string = '';
  editObjectiveId: string = '';
  deleteObjectiveId: string = '';
  expandedObjectiveId: string = '';
  formActionLoader: boolean = false;
  objectiveModifiedName: any;

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
    this.releaseObjectivesForm = this.fb.group({
      title: [''],
      description: [''],
      status: ['']
    });
  }

  ngOnInit(): void {
    console.log('Inside ReleaseObjectivesComponent');

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
    Dialog Method: Delete Objective
  */
  objectiveDeleteActions(titleData: any): any {
    this.dialog.open(DialogSharedComponent, {
      panelClass: ['w-5/12'],
      data: {
        type: 'confirmation',
        confirmationContent: {
          title: 'Are you sure you want to delete ' + '"' + titleData + '"' + ' from release objectives ?',
          subtitle: ''
        }
      },
    }).afterClosed().subscribe((result: boolean) => {
      console.log(result);

      if(result) {
        this.formViewType = 'Delete'; 
        this.updateReleaseObjectives();
      }
    });
  }


  /*
    Add Release Objectives.
  */
  updateReleaseObjectives(): void {

    const paramToBeUpdatedValue = 'releaseObjectives';
    this.formActionLoader = true;

    // Set the payload details.
    let releaseDetailsPayload: any = {
      releaseId: this.releaseDetails._id,
      paramToBeUpdatedValue: paramToBeUpdatedValue,
      actionType: this.formViewType.toLowerCase(),
      releaseDetailsUpdatePayload: {
        [paramToBeUpdatedValue] : [
          {
            title: this.releaseObjectivesForm.get('title')?.value,
            description: this.releaseObjectivesForm.get('description')?.value,
            status: this.releaseObjectivesForm.get('status')?.value
          }
        ]
      }
    }

    if(this.formViewType === 'Edit') {
      console.log(this.editObjectiveId);
      releaseDetailsPayload = {...releaseDetailsPayload, ...{"releaseObjectParamId": this.editObjectiveId}}
    }

    // For deleting the objective.
    if(this.formViewType === 'Delete') {
      console.log(this.editObjectiveId);
      this.fetchLoader = true;
      delete releaseDetailsPayload.releaseDetailsUpdatePayload;
      releaseDetailsPayload = {...releaseDetailsPayload, ...{"releaseObjectParamId": this.deleteObjectiveId}}
    }

    console.log(releaseDetailsPayload);

    // Disable the form.
    this.releaseObjectivesForm.disable();

    this.releasesService.updateReleaseDetails(this.releaseDetails._id, releaseDetailsPayload).subscribe((response: any) => {
      console.log(response);

      setTimeout(() => {
        this.formActionLoader = false;

        this.formViewType = ''; 
        this.editObjectiveId = '';

        this.fetchLoader = true;

        this.releaseObjectivesForm.enable();

        this.getReleasesDetails();
      }, 1000);
      
      
    })
  }


  /*
    Get member details by ID
  */
  getMemberDetails(memberId: string): void {
    this.objectiveModifiedName = null;
    this.membersService.getMemberDetails(memberId).subscribe((response: any) => {
      console.log(response);

      this.objectiveModifiedName = response;
    });
  }

  /* 
    Reset form.
  */
  resetForm(): void {
    this.releaseObjectivesForm.reset();
  }

  /*
    Edit Objectives.
  */
  editObjectives(objective: any): void {
    console.log(objective);
    this.releaseObjectivesForm.setValue(objective);
  }


    /*
    Filter clients, release config IDs.
  */
  filterRequiredIds(type: string, id: string): any {

    // Return Status value.
    if(type === 'status') {
      return this.releaseConfigDetails.objectiveStatus.filter((status: any) => {
         return status._id === id;
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
