import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html'
})
export class OnboardingComponent implements OnInit {

  orgInfoForm: FormGroup;
  adminInfoForm: FormGroup;
  verificationForm: FormGroup;
  hidePassword = true;
  onBoardingState: number = 1;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {

    // Organization info
    this.orgInfoForm = this.fb.group({
      orgName: [null, Validators.required],
      orgType: [null, Validators.required],
      orgUniqueTag: ['', Validators.required]
    });

    // Admin info
    this.adminInfoForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required]
    });

    // Verification Code
    this.verificationForm = this.fb.group({
      verificationCode: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

  /*
    Tab Navigation Methods
  */
  tabNavigation(tabNumber: number): void {
    this.onBoardingState = this.onBoardingState + tabNumber;
  }


  /*
    Validate form to enable tab navigation.
  */
  validateForm(): boolean {
    if(this.onBoardingState === 1) {
      return this.orgInfoForm.valid;
    } else if(this.onBoardingState === 2) {
      return this.adminInfoForm.valid;
    }
    
    return false;
  }


  /*
    Verify Unique Tag
  */
  verifyUniqueTag(): void {
    this.authService.verifyUniqueTag(this.orgInfoForm.get('orgUniqueTag')?.value).subscribe((respose: any) => {
      console.log(respose);
    });
  }


  /*
    Verfiy and Create Account Method
  */
  verifyAndCreateAccount(): void {
    console.log('Account Created...');
  }
  
}
