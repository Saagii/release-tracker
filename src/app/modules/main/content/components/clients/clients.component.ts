import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { clientsMockData } from '../../data/clients-mock-data';
import { ClientsService } from '../../../services/clients.service';
import { ClientConfigurationResponse } from '../../model/clientConfigurationResponse.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

    clientsList: any;
    clientConfig: ClientConfigurationResponse | undefined;
    clientsDisplayColumns: string[] = ['clientName', 'lables', 'totalProjects', 'totalReleases', 'actions'];

  constructor(
    private statusService: StatusService,
    private clientsService: ClientsService
  ) {}

  ngOnInit(): void {

    // Get Clients Configurations.
    this.getClientConfigurations();
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
    });
  }


  /*
    Get Client Configurations.
  */
  getClientConfigurations(): void {
    this.clientsService.getClientsConfig().subscribe((response: ClientConfigurationResponse) => {
      console.log(response);

      this.clientConfig = response;

      // Get Clients List
      this.getClientsList();
    });
  }


  /*
    Filter Client type based on ID and return the type value.
  */
  filterClientType(clientTypeId: string): any {
    const clientTypesConfig: any = this.clientConfig?.types;
    for(const client of clientTypesConfig) {
      if(client._id === clientTypeId) {
        return client.value;
      }
    }
  }
  
}
