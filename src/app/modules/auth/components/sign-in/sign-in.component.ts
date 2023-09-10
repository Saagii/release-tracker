import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import * as bcrypt from 'bcryptjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  signInLoader: boolean = false;
  isRegisterFormEnabled: string = 'sign-in';
  isUniqueTagVerifiedText: string = 'Required!!';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
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

      setTimeout(() => {
        this.orgUniqueTagVerificationLoader = false;

        if(response.tagExists) {
          this.isUniqueTagVerified = response.tagExists;
        } else {
          this._snackBar.open('Org. Unique Tag does not exist', 'OK', {
            duration: 3000
          });
          this.orgSearchForm.enable();
        }
      }, 800);
    });
  }


  /*
    Submit Sign In payload.
  */
  memberSignIn(): void {
    this.signInLoader = true;

    const signInPayload = {
      email: this.signinForm.get('email')?.value,
      password: this.signinForm.get('password')?.value,
      orgUniqueTag: this.orgSearchForm.get('orgUniqueTag')?.value
    };

    this.signinForm.disable();

    this.authService.memberSignin(signInPayload).subscribe((response: any) => {
      console.log(response);

      this.signInLoader = false;

      if(response.token) {
        this.authService.token = response.token;
        this.authService.memberId = response.memberDetails.id;
        this.router.navigate(['../', 'main', 'releases']);
      } else {
        this.signinForm.enable();
      }
    }, (error: Error) => {
      this.signInLoader = false;
      this.signinForm.enable();
      this.signinForm.updateValueAndValidity();
    });
  }


  /*
    Encrypt password.
  */
  encryptPassword(password: string): any {
    return bcrypt.hash(password, environment.bcryptSaltRounds);
  }
  
}
