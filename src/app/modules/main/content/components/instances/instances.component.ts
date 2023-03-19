import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { instancesMockData } from '../../data/instances-mock-data';

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html'
})
export class InstancesComponent implements OnInit {

    instanceList: any[] = instancesMockData;

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
