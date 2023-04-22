import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { adminMenu } from '../../../../data/admin-menu-mock-data';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html'
})
export class AdminMenuComponent implements OnInit {

  adminMenu: any[] = adminMenu;

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
