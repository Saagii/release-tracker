import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { projectsListMockData } from '../../data/projects-list-mock-data';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

  projectsList: any[] = projectsListMockData;
  projectDataSource: any = new MatTableDataSource([]);
  projectDisplayColumns: any = ['projectName', 'members', 'lastUpdatedOn'];

  constructor(
    private statusService: StatusService
  ) {}

  ngOnInit(): void {
    this.projectDataSource.data = projectsListMockData;
  }

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }
  
}
