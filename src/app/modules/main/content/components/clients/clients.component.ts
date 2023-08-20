import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { clientsMockData } from '../../data/clients-mock-data';
import { ClientsService } from '../../../services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

    clientsList: any[] = clientsMockData;
    clientsDisplayColumns: string[] = ['clientName', 'lables', 'totalProjects', 'totalReleases', 'actions'];

  constructor(
    private statusService: StatusService,
    private clientsService: ClientsService
  ) {}

  ngOnInit(): void {
    this.getClientsList();
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
    this.clientsService.getClientsList().subscribe((response: any) => {
      console.log(response);
    });
  }
  
}
