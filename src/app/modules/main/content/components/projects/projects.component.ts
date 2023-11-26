import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { projectsListMockData } from '../../data/projects-list-mock-data';
import { ProjectsService } from '../../../services/projects.service';
import { ClientsService } from '../../../services/clients.service';
import { MembersService } from '../../../services/members.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

  projectsList: any;
  clientsList: any;
  membersList: any;

  constructor(
    private statusService: StatusService,
    private projectsService: ProjectsService,
    private clientsService: ClientsService,
    private membersService: MembersService
  ) {}

  ngOnInit(): void {

    // Get projects list.
    this.getProjectsList();

    // Get Clients list.
    this.getClientsList();

    // Get Members list.
    this.getMembersList();
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
    Get projects list.
  */
  getProjectsList(): void {
    this.projectsService.getProjectsList().subscribe((projectsList: any) => {
      console.log(projectsList);

      this.projectsList = projectsList;
    })
  }


  /*
    Get Members List.
  */
  getMembersList(): void {
    this.membersService.getMembersList('Internal').subscribe((response: any[]) => {
      console.log(response);
      
      this.membersList = response;
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

    // Return Owner value.
    if(type === 'member') {
      const member = this.membersList.filter((member: any) => {
         return member._id === id;
      })[0];
      console.log(member);
      return (member.firstName + ' ' + member.lastName);
    }
  }
  
}
