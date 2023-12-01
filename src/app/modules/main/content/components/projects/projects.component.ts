import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { projectsListMockData } from '../../data/projects-list-mock-data';
import { ProjectsService } from '../../../services/projects.service';
import { ClientsService } from '../../../services/clients.service';
import { MembersService } from '../../../services/members.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

  projectsList: any;
  clientsList: any;
  projectConfig: any;
  projectCount: number = 0;

  constructor(
    private statusService: StatusService,
    private projectsService: ProjectsService,
    private clientsService: ClientsService,
    private membersService: MembersService
  ) {}

  ngOnInit(): void {

    // Get Clients list.
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
    Get Clients List.
  */
  getClientsList(): void {
    this.clientsService.getClientsList().subscribe((response: any[]) => {
      console.log(response);
      
      this.clientsList = response;

      // Get projects list.
      this.getProjectsList();
    });
  }


  /* 
    Get Project Configurations.
  */
  getProjectConfigurations(): void {
    this.projectsService.getProjectsConfig().subscribe((projectConfig: any) => {
      console.log(projectConfig);

      this.projectConfig = projectConfig;
    })
  }


  /*
    Get projects list.
  */
  getProjectsList(): void {
    this.projectsService.getProjectsList().subscribe((projectsList: any) => {
      console.log(projectsList);

      this.projectsList = projectsList;

      this.getMemberDetails();
    })
  }


  /*
    Get Members List.
  */
  getMemberDetails(): void {
    if(this.projectCount < this.projectsList.length) {
      this.membersService.getMemberDetails(this.projectsList[this.projectCount].projectManagerId).subscribe((response: any[]) => {
        console.log(response);

        this.projectsList[this.projectCount]['projectManagerDetails'] = response;
        
        // Count Increment.
        this.projectCount = this.projectCount + 1;

        // Call method again until count is greater than the projects list length.
        this.getMemberDetails();
      });
    } else {
      console.log(this.projectsList);
    }
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
