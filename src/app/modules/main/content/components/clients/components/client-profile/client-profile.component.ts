import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { clientProfileMockData } from '../../../../data/client-profile-mock-data';
import { requirementsListMockData } from '../../../../data/requirements-list-mock-data';
import { ReleasesService } from 'src/app/modules/main/services/releases.service';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/modules/main/services/clients.service';
import { MembersService } from 'src/app/modules/main/services/members.service';
import { ProjectsService } from 'src/app/modules/main/services/projects.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html'
})
export class ClientProfileComponent implements OnInit {
  
  clientProfileData: any = clientProfileMockData;
  requirementsPanelOpenState = false;
  viewMoreReqDetails: string = '';
  phases = requirementsListMockData;
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
    Requirement View Toggle method
  */
  toggleRequirementView(toggleValue: any): void {
    this.viewMoreReqDetails = toggleValue;
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
    });
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

    // Return Type value.
    if(type === 'priorities') {
      return this.releaseConfigDetails.priorities.filter((priority: any) => {
         return priority._id === id;
      })[0]?.value;
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
