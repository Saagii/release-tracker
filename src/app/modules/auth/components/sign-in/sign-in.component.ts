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
  isRegisterFormEnabled: string = 'sign-in';

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
        orgUniqueTag: [null, [Validators.required, Validators.email]]
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
    Verify Unique Tag
  */
  verifyUniqueTag(): void {
    this.authService.verifyUniqueTag(this.orgSearchForm.get('orgUniqueTag')?.value).subscribe((response: any) => {
      console.log(response);

      this.isUniqueTagVerified = response.tagExists;
    });
  }
  
}
