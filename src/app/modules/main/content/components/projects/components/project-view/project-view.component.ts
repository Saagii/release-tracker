import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { ProjectsService } from 'src/app/modules/main/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/modules/main/services/clients.service';
import { MembersService } from 'src/app/modules/main/services/members.service';
import { ReleasesService } from 'src/app/modules/main/services/releases.service';
import { DomainsService } from 'src/app/modules/main/services/domains.service';

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
  domainsConfig: any;
  domainsList: any;

  constructor(
    private statusService: StatusService,
    private projectsService: ProjectsService,
    private _activatedRoute: ActivatedRoute,
    private clientsService: ClientsService,
    private membersService: MembersService,
    private releasesService: ReleasesService,
    private domainsService: DomainsService,
  ) {}

  ngOnInit(): void {

    this.projectId = this._activatedRoute.snapshot.params['id'];

    // Get project configurations.
    this.getProjectConfigurations();

    // Get Release Config details
    this.getReleaseConfigDetails();

    // Get domains configuration.
    this.getDomainsConfig();
  }

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }


      /*
    Get domains configurations.
  */
  getDomainsConfig(): void {
    this.domainsService.getDomainsConfig().subscribe((response: any) => {
      console.log(response);

      this.domainsConfig = response;

      // Get domains list by clientId.
      this.getDomainsListByCustomFilter({projectId: this.projectId});
    })
  }


    /*
    Get domains list based on custom input.
  */
  getDomainsListByCustomFilter(payload: any): void {
    this.domainsService.getDomainsListByCustomFilter(payload).subscribe((response: any) => {
      console.log(response);

      this.domainsList = response;
    });
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

      this.selectedReleaseDetails = response[0];
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

      return memberDetails ? memberDetails.firstName + ' ' + memberDetails.lastName : '- NA -';
    }

    // Return domain status value.
    if(type === 'domain_status') {
      return this.domainsConfig.status.filter((status: any) => {
         return status._id === id;
      })[0].value;
    }

    // Return domain type value.
    if(type === 'domain_type') {
      return this.domainsConfig.types.filter((type: any) => {
         return type._id === id;
      })[0].value;
    }

    // Return domain status value.
    if(type === 'domain_status') {
      return this.domainsConfig.status.filter((status: any) => {
         return status._id === id;
      })[0].value;
    }
  }
  
}
