import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { projectsListMockData } from '../../data/projects-list-mock-data';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

  projectsList: any = new MatTableDataSource([]);
  projectDisplayColumns: string[] = ['projectName', 'clientName', 'projectType', 'projectManager', 'totalMembers', 'actions'];

  constructor(
    private statusService: StatusService
  ) {}

  ngOnInit(): void {
    this.projectsList.data = projectsListMockData.projects;
  }

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }
  
}
