import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-release-sign-off-examine',
    templateUrl: 'examine.component.html',
  })

  export class ExamineComponent implements OnInit  {
    

    constructor() {}


    ngOnInit(): void {
        console.log('Examine component');
    }
    
  }