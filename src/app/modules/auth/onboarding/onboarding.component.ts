import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html'
})
export class OnboardingComponent implements OnInit {

  orgInfoForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.orgInfoForm = this.fb.group({
      orgName: [null, Validators.required],
      orgType: [null, Validators.required]
    });
  }

  ngOnInit(): void {}
  
}
