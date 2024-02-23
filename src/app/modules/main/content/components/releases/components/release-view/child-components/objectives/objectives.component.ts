import { Component, Input, OnInit } from '@angular/core';
import { statusListMockDataMenu } from 'src/app/modules/shared/data/status-list-mock-data';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { ActivatedRoute } from '@angular/router';
import { ReleasesService } from 'src/app/modules/main/services/releases.service';
import { ClientsService } from 'src/app/modules/main/services/clients.service';
import { MembersService } from 'src/app/modules/main/services/members.service';
import { ProjectsService } from 'src/app/modules/main/services/projects.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

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
  expandedObjectiveId: string = '';

  constructor(
    private statusService: StatusService,
    private _activatedRoute: ActivatedRoute,
    private releasesService: ReleasesService,
    private clientsService: ClientsService,
    private membersService: MembersService,
    private projectsService: ProjectsService,
    private fb: UntypedFormBuilder
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
    Add Release Objectives.
  */
  updateReleaseObjectives(): void {

    const paramToBeUpdatedValue = 'releaseObjectives';

    // Set the payload details.
    let releaseDetailsPayload = {
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
      releaseDetailsPayload = {...releaseDetailsPayload, ...{"releaseObjectParam": this.editObjectiveId}}
      // releaseDetailsPayload['releaseObjectiveToBeUpdatedId'] = objectiveId;
    }

    console.log(releaseDetailsPayload);

    this.releasesService.updateReleaseDetails(this.releaseDetails._id, releaseDetailsPayload).subscribe((response: any) => {
      console.log(response);
      console.log('++++++++++++++++');

      this.formViewType = ''; 
      this.editObjectiveId = '';

      this.fetchLoader = true;

      this.getReleasesDetails();
    })
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
