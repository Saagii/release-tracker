import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { verifyAndCreateAccount } from '../../model/verifyAndAccountCreation.model';
import { AccountVerificationResponse } from '../../model/accountCreationResponse.model';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html'
})
export class OnboardingComponent implements OnInit {

  orgInfoForm: UntypedFormGroup;
  adminInfoForm: UntypedFormGroup;
  verificationForm: UntypedFormGroup;
  hidePassword = true;
  navCount: number = 5;
  onBoardingState: number = 1;
  isUniqueTagVerified: boolean = false
  isAccountVerified: boolean = false;
  accountVerificationLoader: boolean = false;
  accountVerificationResponse: AccountVerificationResponse | undefined;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
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
  async verifyAndCreateAccount() {
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
          password: await this.encryptPassword(this.adminInfoForm.get('password')?.value),
          verificationCode: this.verificationForm.get('verificationCode')?.value
        }
      ]
    }

    console.log(tenantCreationPayload);

    this.authService.verifyAndCreateTenant(tenantCreationPayload).subscribe((response: AccountVerificationResponse) => {
      console.log(response);

      this.accountVerificationLoader = false;
      this.onBoardingState = 4;

      this.accountVerificationResponse = response;

      if(this.accountVerificationResponse.isTenantCreated) {
        this.authService.token = response.token.token;
        this.onboardingNavigationTimer();
      }
    });
  }


  /*
    Encrypt password.
  */
  encryptPassword(password: string): any {
    return bcrypt.hash(password, environment.bcryptSaltRounds);
  }


  /*
    Onboarding to Dashboard navigation timer.
  */
  onboardingNavigationTimer(): any {
    if(this.navCount) {
      setTimeout(() => {
        this.navCount-= 1;
        this.onboardingNavigationTimer();
      }, 1000);
    } else {
      this.router.navigate(['../', 'main', 'releases']);
    }
  }
  
}
