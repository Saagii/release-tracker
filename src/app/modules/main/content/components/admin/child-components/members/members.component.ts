import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { membersListMockData } from '../../../../data/members-mock-data';

@Component({
  selector: 'app-admin-members',
  templateUrl: './members.component.html'
})
export class MembersComponent implements OnInit {

  membersList: any = new MatTableDataSource([]);
  displayedColumns: string[] = ['name', 'title', 'email', 'role'];

  constructor(
    private statusService: StatusService
  ) {}

  ngOnInit(): void {
    this.membersList.data = membersListMockData;
  }

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }
  
}
