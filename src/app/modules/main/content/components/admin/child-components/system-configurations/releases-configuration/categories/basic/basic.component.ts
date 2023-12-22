import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/modules/shared/services/status.service';

@Component({
  selector: 'app-release-config-basic',
  templateUrl: './basic.component.html'
})
export class ReleaseConfigBasicCategoryComponent implements OnInit {

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
