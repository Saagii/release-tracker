import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { ProjectsService } from 'src/app/modules/main/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/modules/main/services/clients.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html'
})
export class ProjectViewComponent implements OnInit {

  projectId: string = '';
  projectDetails: any;
  projectConfig: any;
  clientsList: any;
  tempStatusValue: string = '';

  constructor(
    private statusService: StatusService,
    private projectsService: ProjectsService,
    private _activatedRoute: ActivatedRoute,
    private clientsService: ClientsService,
  ) {}

  ngOnInit(): void {

    this.projectId = this._activatedRoute.snapshot.params['id'];

    // Get clients list.
    this.getClientsList();

    // Get project configurations.
    this.getProjectConfigurations();
  }

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }


  /*
    Get project details by project Id.
  */
  getProjectDetailsByProjectId(projectId: string): void {
    this.projectsService.getProjectDetailsByProjectId(projectId).subscribe((response: any) => {
      console.log(response);

      this.projectDetails = response;

      // Set Status
      this.tempStatusValue = this.projectDetails.statusId;
    })
  }


  /*
    Get Clients List.
  */
  getClientsList(): void {
    this.clientsService.getClientsList().subscribe((response: any[]) => {
      console.log(response);
      
      this.clientsList = response;
    });
  }

  /* 
    Get Project Configurations.
  */
  getProjectConfigurations(): void {
    this.projectsService.getProjectsConfig().subscribe((projectConfig: any) => {
      console.log(projectConfig);

      this.projectConfig = projectConfig;

      // Get project details by project id.
      this.getProjectDetailsByProjectId(this.projectId);
    })
  }


    /*
    Filter clients, release config IDs.
  */
  filterRequiredIds(type: string, id: string): any {

    // Return client name.
    if(type === 'client') {
      return this.clientsList.filter((client: any) => {
         return client._id === id;
      })[0].clientName;
    }

    // Return project status.
    if(type === 'status') {
      return this.projectConfig.status.filter((status: any) => {
        return status._id === id;
      })[0].value;
    }
  }
  
}
