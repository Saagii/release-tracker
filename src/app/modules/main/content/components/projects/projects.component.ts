import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { projectsListMockData } from '../../data/projects-list-mock-data';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

  projectsList: any;

  constructor(
    private statusService: StatusService,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {

    // Get projects list.
    this.getProjectsList();
  }

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
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
  
}
