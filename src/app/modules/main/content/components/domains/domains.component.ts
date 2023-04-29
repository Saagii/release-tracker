import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { domainsMockData } from '../../data/domains-mock-data';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html'
})
export class DomainsComponent implements OnInit {

  domainList: any[] = domainsMockData;

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
