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
  selector: 'app-release-view-enhancements-innovations',
  templateUrl: './enhancements-innovations.component.html'
})
export class ReleaseEnhancementsInnovationsComponent implements OnInit {

  @Input() title?: string;
  @Input() description?: string;
  fetchLoader: boolean = false;
  releaseId: string = '';
  releaseDetails: any;
  releaseConfigDetails: any;
  formViewType: string = '';
  editEnhancementInnovationId: string = '';
  deleteEnhancementInnovationId: string = '';
  formActionLoader: boolean = false;
  expandedEnhancementInnovationId: string = '';
  enhancementsInnovationsForm: UntypedFormGroup;
  enhancementInnovationsModifiedName: any;

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
    this.enhancementsInnovationsForm = this.fb.group({
      category: [''],
      title: [''],
      description: [''],
      benefits: [''],
      comments: [''],
      status: ['']
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
  enhancementsInnovationsComponentDeleteActions(titleData: any): any {
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
        this.updateReleaseEnhancementsInnovations();
      }
    });
  }


  /*
    Get member details by ID
  */
  getMemberDetails(memberId: string): void {
    this.enhancementInnovationsModifiedName = null;
    this.membersService.getMemberDetails(memberId).subscribe((response: any) => {
      console.log(response);

      this.enhancementInnovationsModifiedName = response;
    });
  }


    /*
    Add Release Objectives.
  */
  updateReleaseEnhancementsInnovations(): void {

    const paramToBeUpdatedValue = 'releaseEnhancements';
    this.formActionLoader = true;

    // Set the payload details.
    let releaseDetailsPayload: any = {
      releaseId: this.releaseDetails._id,
      paramToBeUpdatedValue: paramToBeUpdatedValue,
      actionType: this.formViewType.toLowerCase(),
      releaseDetailsUpdatePayload: {
        [paramToBeUpdatedValue] : [
          {
            category: this.enhancementsInnovationsForm.get('category')?.value,
            title: this.enhancementsInnovationsForm.get('title')?.value,
            description: this.enhancementsInnovationsForm.get('description')?.value,
            benefits: this.enhancementsInnovationsForm.get('benefits')?.value,
            comments: this.enhancementsInnovationsForm.get('title')?.value,
            status: this.enhancementsInnovationsForm.get('status')?.value
          }
        ]
      }
    }

    if(this.formViewType === 'Edit') {
      releaseDetailsPayload = {...releaseDetailsPayload, ...{"releaseObjectParamId": this.editEnhancementInnovationId}}
    }

    // For deleting the objective.
    if(this.formViewType === 'Delete') {
      this.fetchLoader = true;
      delete releaseDetailsPayload.releaseDetailsUpdatePayload;
      releaseDetailsPayload = {...releaseDetailsPayload, ...{"releaseObjectParamId": this.deleteEnhancementInnovationId}}
    }

    console.log(releaseDetailsPayload);

    // Disable the form.
    this.enhancementsInnovationsForm.disable();

    this.releasesService.updateReleaseDetails(this.releaseDetails._id, releaseDetailsPayload).subscribe((response: any) => {
      console.log(response);

      setTimeout(() => {
        this.formActionLoader = false;

        this.formViewType = ''; 
        this.editEnhancementInnovationId = '';

        this.fetchLoader = true;

        this.enhancementsInnovationsForm.enable();

        this.getReleasesDetails();
      }, 1000);
      
      
    })
  }

  /* 
    Reset form.
  */
  resetForm(): void {
    this.enhancementsInnovationsForm.reset();
  }


  /*
    Edit enhancement.
  */
  editEnhancementInnovationsForm(enhancement: any): void {
    console.log(enhancement);
    this.enhancementsInnovationsForm.setValue(enhancement);
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
