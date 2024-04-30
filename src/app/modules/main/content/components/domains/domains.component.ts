import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { domainsMockData } from '../../data/domains-mock-data';
import { DomainsService } from '../../../services/domains.service';
import { ClientsService } from '../../../services/clients.service';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html'
})
export class DomainsComponent implements OnInit {

  domainList: any;
  clientsList: any;
  projectsListGlobal: any;
  domainsConfig: any;
  

  constructor(
    private statusService: StatusService,
    private domainsService: DomainsService,
    private clientsService: ClientsService,
    private projectsService: ProjectsService,
  ) {}

  ngOnInit(): void {

    // Get Clients list.
    this.getClientsList();

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
    Get all domains list.
  */
  getAllDomainsList(): void {
    this.domainsService.getAllDomainsList().subscribe((response: any) => {
      console.log(response);

      this.domainList = response;
    })
  }


  /*
    Get domains configurations.
  */
  getDomainsConfig(): void {
    this.domainsService.getDomainsConfig().subscribe((response: any) => {
      console.log(response);

      this.domainsConfig = response;
    })
  }


  /*
    Get Clients List.
  */
  getClientsList(): void {
    this.clientsService.getClientsList().subscribe((response: any[]) => {
      console.log(response);
      
      this.clientsList = response;

      // Get Projects List.
      this.getProjectListGlobally();
      
    });
  }


  /*
    Get projects list..
  */
  getProjectListGlobally(): void {
    this.projectsService.getProjectsList().subscribe((response: any[]) => {
      console.log(response);

      this.projectsListGlobal = response;

      // Get domains list.
      this.getAllDomainsList();
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

    // Return domain status value.
    if(type === 'status') {
      return this.domainsConfig.status.filter((status: any) => {
         return status._id === id;
      })[0].value;
    }

    // Return domain type value.
    if(type === 'type') {
      return this.domainsConfig.types.filter((type: any) => {
         return type._id === id;
      })[0].value;
    }

    // Return project name.
    if(type === 'project') {
      const project = this.projectsListGlobal.filter((project: any) => {
         return project._id === id;
      })[0]?.projectName;

      return project ? project : '-NA-';
    }
  }
  
}
