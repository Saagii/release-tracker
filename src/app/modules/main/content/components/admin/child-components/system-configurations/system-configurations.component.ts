import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { systemConfigurationsMenu } from '../../data/system-configurations-menu';

@Component({
  selector: 'app-system-configurations',
  templateUrl: './system-configurations.component.html'
})
export class SystemConfigurationsComponent implements OnInit {

  systemConfigurationsMenu = systemConfigurationsMenu;

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
