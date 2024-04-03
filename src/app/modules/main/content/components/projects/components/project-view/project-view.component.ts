import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { ProjectsService } from 'src/app/modules/main/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/modules/main/services/clients.service';
import { MembersService } from 'src/app/modules/main/services/members.service';
import { ReleasesService } from 'src/app/modules/main/services/releases.service';

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
  teamMembersCount: number = 0;
  teamMembersDetailsList: any = [];
  releasesList: any = [];
  releaseConfigDetails: any;
  selectedReleaseDetails: any;

  constructor(
    private statusService: StatusService,
    private projectsService: ProjectsService,
    private _activatedRoute: ActivatedRoute,
    private clientsService: ClientsService,
    private membersService: MembersService,
    private releasesService: ReleasesService
  ) {}

  ngOnInit(): void {

    this.projectId = this._activatedRoute.snapshot.params['id'];

    // Get project configurations.
    this.getProjectConfigurations();

    // Get Release Config details
    this.getReleaseConfigDetails();
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

      this.projectDetails.teamMembers.push(this.projectDetails.projectManagerId);

      // Set Status
      this.tempStatusValue = this.projectDetails.statusId;

      // Get clients list.
      this.getClientsList();
    })
  }


    /*
    Get release config details.
  */
  getReleaseConfigDetails(): any {
    this.releasesService.getReleasesConfig().subscribe((releaseConfig: any) => {
      console.log(releaseConfig);

      this.releaseConfigDetails = releaseConfig;
    });
  }


  /*
    Get Clients List.
  */
  getClientsList(): void {
    this.clientsService.getClientsList().subscribe((response: any[]) => {
      console.log(response);
      
      this.clientsList = response;

      // Get project team members details.
      this.getMemberDetails();
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
    Get Members List.
  */
  getMemberDetails(): void {
    if(this.teamMembersCount < this.projectDetails.teamMembers.length) {
      this.membersService.getMemberDetails(this.projectDetails.teamMembers[this.teamMembersCount]).subscribe((response: any) => {
        console.log(response);

        // Push member details.
        this.teamMembersDetailsList.push(response);
        
        // Count Increment.
        this.teamMembersCount = this.teamMembersCount + 1;

        // Call method again until count is greater than the projects list length.
        this.getMemberDetails();
      });
    } else {
      console.log(this.teamMembersDetailsList);

      // Get Releases List based on project id.
      this.getReleaseListByCustomFilter();
    }
  }


  /*
    Get release list by custom filter params.
  */
  getReleaseListByCustomFilter(): void {
    this.releasesService.getReleasesListByCustomFilter('project', this.projectId).subscribe((response: any) => {
      console.log(response);

      this.releasesList = response;
    });
  }


  /*
    Release quick view.
  */
  releaseQuickView(release: any): void {
    this.selectedReleaseDetails = release;
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

    // Return project status.
    if(type === 'release_status') {
      return this.releaseConfigDetails.status.filter((status: any) => {
        return status._id === id;
      })[0].value;
    }

    // Return member name.
    if(type === 'teamMember') {
      console.log(this.teamMembersDetailsList);
      const memberDetails = this.teamMembersDetailsList.filter((member: any) => {
        return member.id === id;
      })[0];

      return memberDetails.firstName + ' ' + memberDetails.lastName;
    }
  }
  
}
