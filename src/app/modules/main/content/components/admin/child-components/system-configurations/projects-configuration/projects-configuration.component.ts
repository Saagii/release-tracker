import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/modules/shared/services/status.service';

@Component({
  selector: 'app-projects-configuration',
  templateUrl: './projects-configuration.component.html'
})
export class ProjectsConfigurationComponent implements OnInit {

  constructor(
    private statusService: StatusService
  ) {}

  ngOnInit(): void {
  }

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }
  
}
