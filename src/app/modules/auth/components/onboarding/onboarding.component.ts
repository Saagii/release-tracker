import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { verifyAndCreateAccount } from '../../model/verifyAndAccountCreation.model';

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
  isUniqueTagVerified: boolean = false
  isAccountVerified: boolean = false;
  accountVerificationLoader: boolean = false;

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
    if(this.onBoardingState === 1 && this.isUniqueTagVerified) {
      return this.orgInfoForm.valid;
    } else if(this.onBoardingState === 2 && this.isUniqueTagVerified) {
      return this.adminInfoForm.valid;
    }
    
    return false;
  }


  /*
    Verify Unique Tag
  */
  verifyUniqueTag(): void {
    this.authService.verifyUniqueTag(this.orgInfoForm.get('orgUniqueTag')?.value).subscribe((response: any) => {
      console.log(response);

      this.isUniqueTagVerified = !response.tagExists;
    });
  }


  /*
    Verfiy and Create Account Method
  */
  verifyAndCreateAccount(): void {
    console.log('Account Created...');

    this.accountVerificationLoader = true;

    const tenantCreationPayload: verifyAndCreateAccount = {
      tenants: [{
          orgName: this.orgInfoForm.get('orgName')?.value,
          orgType: this.orgInfoForm.get('orgType')?.value,
          tag: this.orgInfoForm.get('orgUniqueTag')?.value,
          memberType: this.adminInfoForm.get('memberType')?.value,
          firstName: this.adminInfoForm.get('firstName')?.value,
          lastName: this.adminInfoForm.get('lastName')?.value,
          email: this.adminInfoForm.get('email')?.value,
          password: this.adminInfoForm.get('password')?.value,
          verificationCode: this.verificationForm.get('verificationCode')?.value
        }
      ]
    }

    this.authService.verifyAndCreateTenant(tenantCreationPayload).subscribe((response: any) => {
      console.log(response);

      this.accountVerificationLoader = false;
    });
  }
  
}
