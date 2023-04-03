import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { clientsProjectMockData } from '../../data/clients-project-mock-data';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

  projectsList: any[] = clientsProjectMockData;
  projectDataSource: any = new MatTableDataSource([]);
  projectDisplayColumns: string[] = ['projectName', 'members', 'lastUpdatedOn'];

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
