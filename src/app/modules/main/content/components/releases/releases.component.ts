import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { notesMockDataMenu } from '../../data/notes-mock-data';
import { releaseMockDataMenu } from '../../data/release-mock-data';
import { ReleasesService } from '../../../services/releases.service';
import { ClientsService } from '../../../services/clients.service';
import { MembersService } from '../../../services/members.service';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html'
})
export class ReleasesComponent implements OnInit {

  releaseItems: any;
  releaseComments: any[] = notesMockDataMenu;
  clientsList: any;
  releaseConfigDetails: any;
  membersList: any;
  projectsList: any;
  releaseStatsObject: any;
  releaseStatusColor = [
    { statusValue: 'Initiated', color: '#cc8a29' },
    { statusValue: 'On Track', color: '#458D4A' },
    { statusValue: 'On Hold', color: '#5b5563' },
    { statusValue: 'Delayed', color: '#EF4E7C' },
    { statusValue: 'Completed', color: '#2563eb' },
    { statusValue: 'Rejected', color: '#DD0000' }
  ]

  constructor(
    private statusService: StatusService,
    private releasesService: ReleasesService,
    private clientsService: ClientsService,
    private membersService: MembersService,
    private projectsService: ProjectsService,
  ) {}

  ngOnInit(): void {

    // Get Release Config details
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
    Get Members List.
  */
  getMembersList(): void {
    this.membersService.getMembersListByType('Internal').subscribe((response: any[]) => {
      console.log(response);
      
      this.membersList = response;
    });
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

      // Get projects list.
      this.getProjectsList();
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
      
      setTimeout(() => {
        this.releaseItems = releasesList;

        // Get release status analystics.
        this.getReleasesStatusAnalytics();
      }, 500);
    });
  }


  /* Release Status analytics */
  getReleasesStatusAnalytics(): void {
    const groups: any = {};
    let finalStatusStats;
    const series = [];
    const labels = [];
    const colors = [];
    this.releaseItems.forEach((obj: any) => {
        const key = obj.releaseStatusId;
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(obj);
    });
    finalStatusStats = Object.values(groups);

    console.log('Final Status');
    console.log(finalStatusStats);

    for(const item of finalStatusStats) {
      const obj:any = item;
      series.push(obj.length);
      labels.push(this.filterRequiredIds('status', obj[0].releaseStatusId));
    }

    console.log('Series: ', series);
    console.log('Labels: ', labels);

    for(let label of labels) {
      let color = this.releaseStatusColor.filter((status: any) => {
        return status.statusValue === label;
      })[0]?.color;

      if(color) {
        colors.push(color);
      }
    }

    this.releaseStatsObject = {
      series: series,
      labels: labels,
      colors: colors
    }
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

    // Return Owner value.
    if(type === 'owner' || type === 'member') {
      const member = this.membersList.filter((member: any) => {
         return member._id === id;
      })[0];
      console.log(member);
      return (member.firstName + ' ' + member.lastName);
    }

    // Return project name.
    if(type === 'project') {
      const project = this.projectsList.filter((project: any) => {
         return project._id === id;
      })[0]?.projectName;

      return project ? project : '-NA-';
    }
  }
  
}
