import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsService } from 'src/app/modules/main/services/projects.service';
import { DialogSharedComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { StatusService } from 'src/app/modules/shared/services/status.service';

@Component({
  selector: 'app-projects-configuration',
  templateUrl: './projects-configuration.component.html'
})
export class ProjectsConfigurationComponent implements OnInit {

  projectConfig: any;
  enableMembersLimitEditForm: boolean = false;
  projectConfigTypeForm: FormGroup;
  projectConfigStatusForm: FormGroup;
  projectConfigMembersLimitForm: FormGroup;
  projectConfigTypeLoader: boolean = false;
  projectConfigStatusLoader: boolean = false;
  projectConfigMembersLimitLoader: boolean = false;

  constructor(
    private statusService: StatusService,
    private projectService: ProjectsService,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    // Prepare Project Type Form
    this.projectConfigTypeForm = this.fb.group({
      projectType: ['']
    });

    // Prepare Project Status Form
    this.projectConfigStatusForm = this.fb.group({
      projectStatus: ['']
    });

    // Prepare Project Members Limit Form
    this.projectConfigMembersLimitForm = this.fb.group({
      projectMembersLimit: ['']
    });
  }

  ngOnInit(): void {

    // Get Projects Configuration Details.
    this.getProjectsConfigurations();
  }

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }


  /*
    Get Project Configurations.
  */
  getProjectsConfigurations(): void {
    this.projectService.getProjectsConfig().subscribe((projectConfig: any) => {
      console.log(projectConfig);

      this.projectConfig = projectConfig;

      this.projectConfigMembersLimitForm.get('projectMembersLimit')?.setValue(projectConfig.membersLimit);
    });
  }


  /*
    Add project type configuration.
  */
  addProjectConfigType(): void {

    const projectConfigTypePayload = {
      projectConfigId: this.projectConfig._id,
      types: [
        {
          value: this.projectConfigTypeForm.get('projectType')?.value,
          isMandatory: true
        }
      ]
    }

    // Enable Loaded
    this.projectConfigTypeLoader = true;

    // Diable types form.
    this.projectConfigTypeForm.disable();

    this.projectService.addProjectConfigType(projectConfigTypePayload).subscribe((response: any) => {
      console.log(response);

      // Disable Loader
      this.projectConfigTypeLoader = false;

      // Enable the form & reset.
      this.projectConfigTypeForm.enable();
      this.projectConfigTypeForm.reset();

      // Get the member config details.
      this.getProjectsConfigurations();

    }, (error: Error) => {
      console.log(error);

      // Disable Loader
      this.projectConfigTypeLoader = false;

      // Enable the form.
      this.projectConfigTypeForm.enable();
    });
  }


  /*
    Add project status configuration.
  */
  addProjectConfigStatus(): void {

    const projectConfigStatusPayload = {
      projectConfigId: this.projectConfig._id,
      status: [
        {
          value: this.projectConfigStatusForm.get('projectStatus')?.value,
          isMandatory: true
        }
      ]
    }

    // Enable Loaded
    this.projectConfigStatusLoader = true;

    // Diable types form.
    this.projectConfigStatusForm.disable();

    this.projectService.addProjectConfigStatus(projectConfigStatusPayload).subscribe((response: any) => {
      console.log(response);

      // Disable Loader
      this.projectConfigStatusLoader = false;

      // Enable the form & reset.
      this.projectConfigStatusForm.enable();
      this.projectConfigStatusForm.reset();

      // Get the member config details.
      this.getProjectsConfigurations();

    }, (error: Error) => {
      console.log(error);

      // Disable Loader
      this.projectConfigStatusLoader = false;

      // Enable the form.
      this.projectConfigStatusForm.enable();
    });
  }


  /*
    Update project members limit configuration.
  */
  updateProjectConfigMembersLimit(): void {

    const projectConfigMembersLimitPayload = {
      projectConfigId: this.projectConfig._id,
      membersLimit: this.projectConfigMembersLimitForm.get('projectMembersLimit')?.value
    }

    // Enable Loaded
    this.projectConfigMembersLimitLoader = true;

    // Diable types form.
    this.projectConfigMembersLimitForm.disable();

    this.projectService.updateProjectConfigMembersLimit(projectConfigMembersLimitPayload).subscribe((response: any) => {
      console.log(response);

      // Disable Loader
      this.projectConfigMembersLimitLoader = false;

      // Enable the form & reset.
      this.projectConfigMembersLimitForm.enable();
      this.projectConfigMembersLimitForm.reset();

      // Hide MembersLimit Update Form.
      this.enableMembersLimitEditForm = !this.enableMembersLimitEditForm;

      // Get the member config details.
      this.getProjectsConfigurations();

    }, (error: Error) => {
      console.log(error);

      // Disable Loader
      this.projectConfigMembersLimitLoader = false;

      // Enable the form.
      this.projectConfigMembersLimitForm.enable();
    });
  }


  /*
    Delete Project Config Type.
  */
  deleteProjectConfigType(projectTypeId: string): void {

    const projectConfigTypePayload = {
      // projectConfigId: this.projectConfig._id,
      typeId: projectTypeId
    }

    this.projectService.deleteProjectConfigType(projectConfigTypePayload).subscribe((response: any) => {
      console.log(response);

      // Get the member config details.
      this.getProjectsConfigurations();

    }, (error: Error) => {
      console.log(error);
    });
  }


  /*
    Delete Project Config Status.
  */
  deleteProjectConfigStatus(projectStatusId: string): void {

    const projectConfigStatusPayload = {
      // projectConfigId: this.projectConfig._id,
      statusId: projectStatusId
    }

    this.projectService.deleteProjectConfigStatus(projectConfigStatusPayload).subscribe((response: any) => {
      console.log(response);

      // Get the member config details.
      this.getProjectsConfigurations();

    }, (error: Error) => {
      console.log(error);
    });
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
          title: 'Are you sure you want to delete ' + actionData.value + ' from project ' + actionType + ' ?',
          subtitle: ''
        }
      },
    }).afterClosed().subscribe((result: boolean) => {
      console.log(result);

      if(result) {
        if(actionType === 'type') { this.deleteProjectConfigType(actionData._id); }

        if(actionType === 'status') { this.deleteProjectConfigStatus(actionData._id); }
      }
    });
  }
  
}
