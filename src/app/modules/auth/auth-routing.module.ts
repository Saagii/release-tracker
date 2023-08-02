import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';

const authRoutes: Routes = [
  { path: '', redirectTo: 'signIn', pathMatch: 'full' },
  {
    path: 'signIn', component: SignInComponent
  },
  {
    path: 'onboard', component: OnboardingComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
