import { Component, Input, OnInit } from '@angular/core';
import { statusListMockDataMenu } from 'src/app/modules/shared/data/status-list-mock-data';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { notesMockDataMenu } from '../../../../data/notes-mock-data';
import { ActivatedRoute } from '@angular/router';
import { ReleasesService } from 'src/app/modules/main/services/releases.service';
import { ClientsService } from 'src/app/modules/main/services/clients.service';
import { MembersService } from 'src/app/modules/main/services/members.service';
import { ProjectsService } from 'src/app/modules/main/services/projects.service';

@Component({
  selector: 'app-release-view',
  templateUrl: './release-view.component.html'
})
export class ReleaseViewComponent implements OnInit {

  statusListMenu: any;
  tempStatusValue: string = '';
  releaseNotes: any[] = notesMockDataMenu;
  releaseId: string = '';
  releaseDetails: any;
  clientsList: any;
  releaseConfigDetails: any;
  membersList: any;
  projectDetails: any;

  constructor(
    private statusService: StatusService,
    private _activatedRoute: ActivatedRoute,
    private releasesService: ReleasesService,
    private clientsService: ClientsService,
    private membersService: MembersService,
    private projectsService: ProjectsService,
  ) {}

  ngOnInit(): void {
    for(const statusMenu of statusListMockDataMenu) {
      if(statusMenu.type === 'Release') {
        this.statusListMenu = statusMenu;
      }
    }

    this.releaseId = this._activatedRoute.snapshot.params['id'];

    // Get release config.
    this.getReleaseConfigDetails();

    // Get members list.
    this.getMembersList();
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

      // Get Releases details.
      this.getReleasesDetails();
    });
  }


  /*
    Get Members List.
  */
  getMembersList(): void {
    this.membersService.getMembersListByType('Internal').subscribe((response: any[]) => {
      console.log(response);
      
      this.membersList = response;
    });
  }


  /*
    Get Releases details.
  */
  getReleasesDetails(): any {
    this.releasesService.getReleaseDetails(this.releaseId).subscribe((releaseDetails: any) => {
      console.log(releaseDetails);
      
      setTimeout(() => {
        this.releaseDetails = releaseDetails;

        // Set Status
        this.tempStatusValue = this.releaseDetails.releaseStatusId;

        // Get Project Details by project Id.
        this.getProjectDetailsByProjectId(this.releaseDetails.projectId);
      }, 500);
    });
  }


  /*
    Get project details by project Id.
  */
  getProjectDetailsByProjectId(projectId: string): void {
    this.projectsService.getProjectDetailsByProjectId(projectId).subscribe((response: any) => {
      console.log(response);

      this.projectDetails = response;
    })
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

    // Return Owner value.
    if(type === 'owner' || type === 'member') {
      const member = this.membersList.filter((member: any) => {
         return member._id === id;
      })[0];
      console.log(member);
      return (member.firstName + ' ' + member.lastName);
    }

    // Return client name.
    if(type === 'client') {
      return this.clientsList.filter((client: any) => {
         return client._id === id;
      })[0].clientName;
    }
  }
  
}
