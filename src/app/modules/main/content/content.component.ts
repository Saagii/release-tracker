import { Component, Input, OnInit } from '@angular/core';
import { contentMenu } from './data/content-menu';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit {

  contentMenuOption: any[] = contentMenu;
  activeContentMenu: string = 'Releases';

  constructor() {}

  ngOnInit(): void {
    
    // Set Menu Active style by validating if the URL has the required menu route.
    for(const menu of this.contentMenuOption) {
      if(window.location.href.includes(menu.route)) {
        this.activeContentMenu = menu.name;
      }
    }
  }


  
}
