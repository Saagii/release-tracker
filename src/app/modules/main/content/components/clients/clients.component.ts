import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { clientsMockData } from '../../data/clients-mock-data';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

    clientsList: any[] = clientsMockData;
    clientsDisplayColumns: string[] = ['clientName', 'tags', 'totalProjects', 'totalReleases', 'actions'];

  constructor(
    private statusService: StatusService
  ) {}

  ngOnInit(): void {}

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }
  
}
