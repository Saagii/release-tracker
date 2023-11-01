import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { notesMockDataMenu } from '../../data/notes-mock-data';
import { releaseMockDataMenu } from '../../data/release-mock-data';
import { ReleasesService } from '../../../services/releases.service';
import { ClientsService } from '../../../services/clients.service';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html'
})
export class ReleasesComponent implements OnInit {

  releaseItems: any;
  releaseComments: any[] = notesMockDataMenu;
  clientsList: any;
  releaseConfigDetails: any;

  constructor(
    private statusService: StatusService,
    private releasesService: ReleasesService,
    private clientsService: ClientsService
  ) {}

  ngOnInit(): void {

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
    Get release config details.
  */
  getReleaseConfigDetails(): any {
    this.releasesService.getReleasesConfig().subscribe((releaseConfig: any) => {
      console.log(releaseConfig);

      this.releaseConfigDetails = releaseConfig;
      
      // Get Clients list.
      this.getClientsList();
    });
  }


  /*
    Get Clients List.
  */
  getClientsList(): void {
    this.clientsService.getClientsList().subscribe((response: any[]) => {
      console.log(response);
      
      this.clientsList = response;

      // Get Releases List.
      this.getReleasesList();
    });
  }


  /*
    Get Releases list.
  */
  getReleasesList(): any {
    this.releasesService.getReleasesList().subscribe((releasesList: any[]) => {
      console.log(releasesList);

      this.releaseItems = releasesList;
    });
  }


  /*
    Filter clients, release config IDs.
  */
  filterRequiredIds(type: string, id: string): any {

    // Return Status value.
    if(type === 'status') {
      return this.releaseConfigDetails.status.filter((status: any) => {
         return status._id === id;
      })[0]?.value;
    }

    // Return client name.
    if(type === 'client') {
      return this.clientsList.filter((client: any) => {
         return client._id === id;
      })[0].clientName;
    }
  }
  
}
