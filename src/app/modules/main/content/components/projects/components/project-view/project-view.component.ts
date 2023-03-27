import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { notesMockDataMenu } from '../../../../data/notes-mock-data';
import { releaseMockDataMenu } from '../../../../data/release-mock-data';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html'
})
export class ProjectViewComponent implements OnInit {

  releaseItems: any[] = releaseMockDataMenu;
  releaseNotes: any[] = notesMockDataMenu;

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
