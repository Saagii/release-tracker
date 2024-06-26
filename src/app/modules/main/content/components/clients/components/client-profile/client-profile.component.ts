import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { clientProfileMockData } from '../../../../data/client-profile-mock-data';
import { requirementsListMockData } from '../../../../data/requirements-list-mock-data';
import { ReleasesService } from 'src/app/modules/main/services/releases.service';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/modules/main/services/clients.service';
import { MembersService } from 'src/app/modules/main/services/members.service';
import { ProjectsService } from 'src/app/modules/main/services/projects.service';
import { DomainsService } from 'src/app/modules/main/services/domains.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html'
})
export class ClientProfileComponent implements OnInit {
  
  clientProfileData: any = clientProfileMockData;
  requirementsPanelOpenState = false;
  viewMoreReqDetails: string = '';
  phases = requirementsListMockData;
  clientId: string = '';
  projectId: string = '';
  projectsList: any;
  projectConfig: any;
  clientsList: any;
  tempStatusValue: string = '';
  teamMembersCount: number = 0;
  teamMembersDetailsList: any = [];
  releasesList: any = [];
  releaseConfigDetails: any;
  selectedReleaseDetails: any;
  membersList: any;
  clientDetails: any;
  clientConfig: any;
  projectsListGlobal: any;
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

    this.clientId = this._activatedRoute.snapshot.params['id'];

    // Get project configurations.
    this.getProjectConfigurations();

    // Get Release Config details
    this.getReleaseConfigDetails();

    // Get Clients Configurations.
    this.getClientConfigurations();

    // Get Client Details.
    this.getClientDetailsByID();

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
    Requirement View Toggle method
  */
  toggleRequirementView(toggleValue: any): void {
    this.viewMoreReqDetails = toggleValue;
  }


    /*
    Get Client Configurations.
  */
  getClientConfigurations(): void {
    this.clientsService.getClientsConfig().subscribe((response: any) => {
      console.log(response);

      this.clientConfig = response;
    });
  }


    /*
    Get domains configurations.
  */
  getDomainsConfig(): void {
    this.domainsService.getDomainsConfig().subscribe((response: any) => {
      console.log(response);

      this.domainsConfig = response;

      // Get domains list by clientId.
      this.getDomainsListByCustomFilter({clientId: this.clientId});
    })
  }


  /*
    Get client details by ID.
  */
  getClientDetailsByID(): void {
    this.clientsService.getClientDetailsByID(this.clientId).subscribe((response: any) => {
      this.clientDetails = response;
    });
  }


    /* 
    Get Project Configurations.
  */
  getProjectConfigurations(): void {
    this.projectsService.getProjectsConfig().subscribe((projectConfig: any) => {
      console.log(projectConfig);

      this.projectConfig = projectConfig;

      this.getMembersList();
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
    Get Members List.
  */
  getMembersList(): void {
    this.membersService.getMembersListByType('Internal').subscribe((response: any[]) => {
      console.log(response);
      
      this.membersList = response;

      // Get projects list associated with client Id
      this.getProjectListByClientId();

      // Get projects list Globally.
      this.getProjectListGlobally();
    });
  }


      /*
    Get release config details.
  */
  getReleaseConfigDetails(): any {
    this.releasesService.getReleasesConfig().subscribe((releaseConfig: any) => {
      console.log(releaseConfig);

      this.releaseConfigDetails = releaseConfig;

      // Get Releases List based on project id.
      this.getReleaseListByCustomFilter();
    });
  }


    /*
    Get release list by custom filter params.
  */
  getReleaseListByCustomFilter(): void {
    this.releasesService.getReleasesListByCustomFilter('client', this.clientId).subscribe((response: any) => {
      console.log(response);

      this.releasesList = response;

      this.selectedReleaseDetails = response[0];
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
    Get projects list by Client ID.
  */
  getProjectListByClientId(): void {
    this.projectsService.getProjectDetailsByClientId(this.clientId).subscribe((response: any[]) => {
      console.log(response);

      this.projectsList = response;
    })
  }


    /*
    Get projects list by Client ID.
  */
  getProjectListGlobally(): void {
    this.projectsService.getProjectsList().subscribe((response: any[]) => {
      console.log(response);

      this.projectsListGlobal = response;
    })
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
    if(type === 'client_status') {
      return this.clientConfig.status.filter((status: any) => {
        return status === id;
      })[0];
    }

    // Return project status.
    if(type === 'project_status') {
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
      const memberDetails = this.membersList.filter((member: any) => {
        return member._id === id;
      })[0];
      console.log(memberDetails);

      return memberDetails.firstName + ' ' + memberDetails.lastName;
    }

    // Return project name.
    if(type === 'project') {
      const project = this.projectsList.filter((project: any) => {
         return project._id === id;
      })[0]?.projectName;

      return project ? project : '-NA-';
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
