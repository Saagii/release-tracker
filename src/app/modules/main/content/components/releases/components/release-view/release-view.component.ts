import { Component, Input, OnInit } from '@angular/core';
import { statusListMockDataMenu } from 'src/app/modules/shared/data/status-list-mock-data';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { notesMockDataMenu } from '../../../../data/notes-mock-data';

@Component({
  selector: 'app-release-view',
  templateUrl: './release-view.component.html'
})
export class ReleaseViewComponent implements OnInit {

  statusListMenu: any;
  tempStatusValue: string = 'On Track';
  releaseNotes: any[] = notesMockDataMenu;

  constructor(
    private statusService: StatusService
  ) {}

  ngOnInit(): void {
    for(const statusMenu of statusListMockDataMenu) {
      if(statusMenu.type === 'Release') {
        this.statusListMenu = statusMenu;
      }
    }
  }

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }
  
}
