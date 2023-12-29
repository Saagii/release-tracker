import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReleasesService } from 'src/app/modules/main/services/releases.service';
import { DialogSharedComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { systemConfigurationsCategories } from '../../../data/system-configurations-categories';

@Component({
  selector: 'app-releases-configuration',
  templateUrl: './releases-configuration.component.html'
})
export class ReleasesConfigurationComponent implements OnInit {

  releaseCategories = systemConfigurationsCategories;
  activeReleaseCategory: string = '';
  activeComponent: any;

  releaseConfig: any;
  enableTargetEditForm: boolean = false;
  releaseConfigTypeForm: FormGroup;
  releaseConfigStatusForm: FormGroup;
  releaseConfigTargetForm: FormGroup;
  releaseConfigTypeLoader: boolean = false;
  releaseConfigStatusLoader: boolean = false;
  releaseConfigTargetLoader: boolean = false;

  constructor(
    private statusService: StatusService,
    private releaseService: ReleasesService,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    // Prepare Release Type Form
    this.releaseConfigTypeForm = this.fb.group({
      releaseType: ['']
    });

    // Prepare Release Status Form
    this.releaseConfigStatusForm = this.fb.group({
      releaseStatus: ['']
    });

    // Prepare Release Members Limit Form
    this.releaseConfigTargetForm = this.fb.group({
      releaseTarget: ['']
    });
  }

  ngOnInit(): void {

    // Get Releases Configuration Details.
    this.getReleasesConfigurations();
  }

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }


  /*
    Get Release Configurations.
  */
  getReleasesConfigurations(): void {
    this.releaseService.getReleasesConfig().subscribe((releaseConfig: any) => {
      console.log(releaseConfig);

      this.releaseConfig = releaseConfig;
    });
  }


  /*
    Add release type configuration.
  */
  addReleaseConfigType(): void {

    const releaseConfigTypePayload = {
      releaseConfigId: this.releaseConfig._id,
      types: [
        {
          value: this.releaseConfigTypeForm.get('releaseType')?.value,
          isMandatory: true
        }
      ]
    }

    // Enable Loaded
    this.releaseConfigTypeLoader = true;

    // Diable types form.
    this.releaseConfigTypeForm.disable();

    this.releaseService.addReleaseConfigType(releaseConfigTypePayload).subscribe((response: any) => {
      console.log(response);

      // Disable Loader
      this.releaseConfigTypeLoader = false;

      // Enable the form & reset.
      this.releaseConfigTypeForm.enable();
      this.releaseConfigTypeForm.reset();

      // Get the member config details.
      this.getReleasesConfigurations();

    }, (error: Error) => {
      console.log(error);

      // Disable Loader
      this.releaseConfigTypeLoader = false;

      // Enable the form.
      this.releaseConfigTypeForm.enable();
    });
  }


  /*
    Add release status configuration.
  */
  addReleaseConfigStatus(): void {

    const releaseConfigStatusPayload = {
      releaseConfigId: this.releaseConfig._id,
      status: [
        {
          value: this.releaseConfigStatusForm.get('releaseStatus')?.value,
          isMandatory: true
        }
      ]
    }

    // Enable Loaded
    this.releaseConfigStatusLoader = true;

    // Diable types form.
    this.releaseConfigStatusForm.disable();

    this.releaseService.addReleaseConfigStatus(releaseConfigStatusPayload).subscribe((response: any) => {
      console.log(response);

      // Disable Loader
      this.releaseConfigStatusLoader = false;

      // Enable the form & reset.
      this.releaseConfigStatusForm.enable();
      this.releaseConfigStatusForm.reset();

      // Get the member config details.
      this.getReleasesConfigurations();

    }, (error: Error) => {
      console.log(error);

      // Disable Loader
      this.releaseConfigStatusLoader = false;

      // Enable the form.
      this.releaseConfigStatusForm.enable();
    });
  }


  /*
    Update release members limit configuration.
  */
  updateReleaseConfigTarget(): void {

    const releaseConfigTargetPayload = {
      releaseConfigId: this.releaseConfig._id,
      membersLimit: this.releaseConfigTargetForm.get('releaseTarget')?.value
    }

    // Enable Loaded
    this.releaseConfigTargetLoader = true;

    // Diable types form.
    this.releaseConfigTargetForm.disable();

    this.releaseService.updateReleaseConfigTarget(releaseConfigTargetPayload).subscribe((response: any) => {
      console.log(response);

      // Disable Loader
      this.releaseConfigTargetLoader = false;

      // Enable the form & reset.
      this.releaseConfigTargetForm.enable();
      this.releaseConfigTargetForm.reset();

      // Hide Target Update Form.
      this.enableTargetEditForm = !this.enableTargetEditForm;

      // Get the member config details.
      this.getReleasesConfigurations();

    }, (error: Error) => {
      console.log(error);

      // Disable Loader
      this.releaseConfigTargetLoader = false;

      // Enable the form.
      this.releaseConfigTargetForm.enable();
    });
  }


  /*
    Delete Release Config Type.
  */
  deleteReleaseConfigType(releaseTypeId: string): void {

    const releaseConfigTypePayload = {
      // releaseConfigId: this.releaseConfig._id,
      typeId: releaseTypeId
    }

    this.releaseService.deleteReleaseConfigType(releaseConfigTypePayload).subscribe((response: any) => {
      console.log(response);

      // Get the member config details.
      this.getReleasesConfigurations();

    }, (error: Error) => {
      console.log(error);
    });
  }


  /*
    Delete Release Config Status.
  */
  deleteReleaseConfigStatus(releaseStatusId: string): void {

    const releaseConfigStatusPayload = {
      // releaseConfigId: this.releaseConfig._id,
      statusId: releaseStatusId
    }

    this.releaseService.deleteReleaseConfigStatus(releaseConfigStatusPayload).subscribe((response: any) => {
      console.log(response);

      // Get the member config details.
      this.getReleasesConfigurations();

    }, (error: Error) => {
      console.log(error);
    });
  }


  /*
    Set or Remove the local storage for release configuration active category.
  */
  releaseConfigLocalStorageActions(action: string): void {
    if(action === 'set') {
      localStorage.setItem('activeReleaseCategory', this.activeReleaseCategory);
    } else {
      localStorage.removeItem('activeReleaseCategory');
    }
  }


  /*
    Dialog Method: Nav New Menu
  */
  navigationActions(actionData: any, actionType: string): any {
    this.dialog.open(DialogSharedComponent, {
      panelClass: ['w-5/12'],
      data: {
        type: 'confirmation',
        confirmationContent: {
          title: 'Are you sure you want to delete ' + actionData.value + ' from release ' + actionType + ' ?',
          subtitle: ''
        }
      },
    }).afterClosed().subscribe((result: boolean) => {
      console.log(result);

      if(result) {
        if(actionType === 'type') { this.deleteReleaseConfigType(actionData._id); }

        if(actionType === 'status') { this.deleteReleaseConfigStatus(actionData._id); }
      }
    });
  }
  
}
