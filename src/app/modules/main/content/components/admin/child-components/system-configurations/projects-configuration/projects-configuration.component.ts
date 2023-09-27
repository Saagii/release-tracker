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
  }

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }


  /*
    Add client type configuration.
  */
  addProjectConfigType(): void {

    const projectConfigTypePayload = {
      memberConfigId: this.projectConfig._id,
      types: [
        {
          value: this.projectConfigTypeForm.get('projectType')?.value,
          status: 'Active'
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
      // this.getProjectsConfigurations();

    }, (error: Error) => {
      console.log(error);

      // Disable Loader
      this.projectConfigTypeLoader = false;

      // Enable the form.
      this.projectConfigTypeForm.enable();
    });
  }


    /*
    Dialog Method: Nav New Menu
  */
  navigationActions(typeData: any): any {
    this.dialog.open(DialogSharedComponent, {
      panelClass: ['w-5/12'],
      data: {
        type: 'confirmation',
        confirmationContent: {
          title: 'Are you sure you want to delete ' + typeData.value + ' from client types ?',
          subtitle: ''
        }
      },
    }).afterClosed().subscribe((result: boolean) => {
      console.log(result);

      // this.deleteClientConfigType(typeData._id);
    });
  }
  
}
