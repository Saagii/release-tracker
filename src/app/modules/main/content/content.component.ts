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

  ngOnInit(): void {}


  
}
