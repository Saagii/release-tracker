import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {

  signinForm: FormGroup;
  orgSearchForm: FormGroup;
  hideLoginPassword: boolean = true;
  isUniqueTagVerified: boolean = false
  orgUniqueTagVerificationLoader: boolean = false;
  isRegisterFormEnabled: string = 'sign-in';
  isUniqueTagVerifiedText: string = 'Required!!';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
      // Prepare Sign In Form
      this.signinForm = this.fb.group({
          email: [null, [Validators.required, Validators.email]],
          password: [null, [Validators.required, Validators.minLength(4)]]
      });

      // Prepare Org Search Form
      this.orgSearchForm = this.fb.group({
        orgUniqueTag: ['', [Validators.required]]
      });
  }

  ngOnInit(): void {}


  /*
    Toggle Register Form and 
  */
  toggleRegisterForm(formType: string): any {
    this.isRegisterFormEnabled = formType;
    this.signinForm.reset();
    this.orgSearchForm.reset();
  }


  /*
    Validate Form
  */
  validateFormStatus(formType: string): boolean {
    if(formType === 'orgUniqueTagForm' ) {
      return this.orgSearchForm.get('orgUniqueTag')?.value !== '' ? false : true;
    } else {
      return this.signinForm.valid;
    }
  }


  /*
    Verify Unique Tag
  */
  verifyUniqueTag(): void {
    this.orgUniqueTagVerificationLoader = true;
    this.isUniqueTagVerifiedText = '';

    this.orgSearchForm.disable();
    this.authService.verifyUniqueTag(this.orgSearchForm.get('orgUniqueTag')?.value).subscribe((response: any) => {
      console.log(response);

      this.orgSearchForm.enable();

      setTimeout(() => {
        this.orgUniqueTagVerificationLoader = false;

        if(response.tagExists) {
          this.isUniqueTagVerified = response.tagExists;
        } else {
          this.isUniqueTagVerifiedText = "Org. Unique Tag doesn't exist";
        }
      }, 2000);
    });
  }
  
}
