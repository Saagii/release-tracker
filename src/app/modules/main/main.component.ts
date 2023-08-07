import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  
  overlayOnclick = false;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get Member Details
    this.getMemberDetails();
  }

  hideNavMenu(): any {
    console.log('Working');
    this.overlayOnclick = false;
  }


  /*
    Get Member Details.
  */
  getMemberDetails(): void {
    this.authService.getMemberDetails().subscribe((member: any) => {
      console.log('Member Details', member);
    })
  }
}
