import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { AuthComponent } from './auth.component';


@NgModule({
  declarations: [
    SignInComponent,
    OnboardingComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  exports: [
    SignInComponent,
    OnboardingComponent,
    AuthComponent
  ]
})

export class AuthModule { }
