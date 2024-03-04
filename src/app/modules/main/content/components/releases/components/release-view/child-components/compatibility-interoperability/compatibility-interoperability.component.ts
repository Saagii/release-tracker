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
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-release-view-compatibility-interoperability',
  templateUrl: './compatibility-interoperability.component.html'
})
export class ReleaseCompatibilityInteroperabilityComponent implements OnInit {

  @Input() title?: string;
  @Input() description?: string;
  fetchLoader: boolean = false;
  releaseId: string = '';
  releaseDetails: any;
  releaseConfigDetails: any;
  formViewType: string = '';
  selectedCategoryId: string = '';
  editCompatibilityInteroperabilityId: string = '';
  deleteCompatibilityInteroperabilityId: string = '';
  formActionLoader: boolean = false;
  expandedCompatibilityInteroperabilityId: string = '';
  compatibilityInteroperabilityForm: UntypedFormGroup;
  compatibilityInteroperabilityModifiedName: any;

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
    this.compatibilityInteroperabilityForm = this.fb.group({
      category: [''],
      title: [''],
      description: [''],
      comments: ['']
    });
  }

  ngOnInit(): void {
    console.log('Inside ReleaseCompatibilityInteroperabilityComponent');

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
  compatibilityInteroperabilityComponentDeleteActions(titleData: any): any {
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
        this.updateCompatibilityInteroperability();
      }
    });
  }


  /*
    Get member details by ID
  */
  getMemberDetails(memberId: string): void {
    this.compatibilityInteroperabilityModifiedName = null;
    this.membersService.getMemberDetails(memberId).subscribe((response: any) => {
      console.log(response);

      this.compatibilityInteroperabilityModifiedName = response;
    });
  }


  /*
    Get Category id on selection.
  */
  getCategoryIdOnSelection(event: MatSelectChange): void {
    console.log(event);

    this.selectedCategoryId = event.value;
  }


    /*
    Add Release Objectives.
  */
  updateCompatibilityInteroperability(): void {

    const paramToBeUpdatedValue = 'releaseCompatibility';
    this.formActionLoader = true;

    // Set the payload details.
    let releaseDetailsPayload: any = {
      releaseId: this.releaseDetails._id,
      paramToBeUpdatedValue: paramToBeUpdatedValue,
      actionType: this.formViewType.toLowerCase(),
      releaseDetailsUpdatePayload: {
        [paramToBeUpdatedValue] : [
          {
            category: this.compatibilityInteroperabilityForm.get('category')?.value,
            title: this.compatibilityInteroperabilityForm.get('title')?.value,
            description: this.compatibilityInteroperabilityForm.get('description')?.value,
            comments: this.compatibilityInteroperabilityForm.get('title')?.value
          }
        ]
      }
    }

    if(this.formViewType === 'Edit') {
      releaseDetailsPayload = {...releaseDetailsPayload, ...{"releaseObjectParamId": this.editCompatibilityInteroperabilityId}}
    }

    // For deleting the objective.
    if(this.formViewType === 'Delete') {
      this.fetchLoader = true;
      delete releaseDetailsPayload.releaseDetailsUpdatePayload;
      releaseDetailsPayload = {...releaseDetailsPayload, ...{"releaseObjectParamId": this.deleteCompatibilityInteroperabilityId}}
    }

    console.log(releaseDetailsPayload);

    // Disable the form.
    this.compatibilityInteroperabilityForm.disable();

    this.releasesService.updateReleaseDetails(this.releaseDetails._id, releaseDetailsPayload).subscribe((response: any) => {
      console.log(response);

      setTimeout(() => {
        this.formActionLoader = false;

        this.formViewType = ''; 
        this.editCompatibilityInteroperabilityId = '';

        this.fetchLoader = true;

        this.compatibilityInteroperabilityForm.enable();

        this.getReleasesDetails();
      }, 1000);
      
      
    })
  }

  /* 
    Reset form.
  */
  resetForm(): void {
    this.compatibilityInteroperabilityForm.reset();
  }


  /*
    Edit compatibility.
  */
  editCompatibilityInteroperabilityForm(compatibility: any): void {
    console.log(compatibility);
    this.compatibilityInteroperabilityForm.setValue(compatibility);
  }


    /*
    Filter clients, release config IDs.
  */
  filterRequiredIds(type: string, id: string): any {

    // Return Status value.
    if(type === 'category') {
        return this.releaseConfigDetails.compatibilities.filter((category: any) => {
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
