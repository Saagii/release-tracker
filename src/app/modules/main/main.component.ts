import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  
  overlayOnclick = false;

  constructor() {}

  ngOnInit(): void {}

  hideNavMenu(): any {
    this.overlayOnclick = false;
  }
}
