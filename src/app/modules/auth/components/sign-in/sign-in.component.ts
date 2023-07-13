import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {

  signinForm: FormGroup;
  registerForm: FormGroup;
  hideLoginPassword: boolean = true;
  isRegisterFormEnabled: string = 'sign-in';

  constructor(
    private fb: FormBuilder,
  ) {
      // Prepare Sign In Form
      this.signinForm = this.fb.group({
          email: [null, [Validators.required, Validators.email]],
          password: [null, [Validators.required, Validators.minLength(4)]]
      });

      // Prepare Register Form
      this.registerForm = this.fb.group({
          firstName: [null, [Validators.required, Validators.email]],
          lastName: [null, [Validators.required, Validators.email]],
          email: [null, [Validators.required, Validators.email]],
          password: [null, [Validators.required, Validators.minLength(4)]]
      });
  }

  ngOnInit(): void {}


  /*
    Toggle Register Form and 
  */
  toggleRegisterForm(formType: string): any {
    this.isRegisterFormEnabled = formType;
    this.signinForm.reset();
    this.registerForm.reset();
  }
  
}
