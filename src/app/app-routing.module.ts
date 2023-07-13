import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './modules/main/main.component';
import { OnboardingComponent } from './modules/auth/components/onboarding/onboarding.component';
import { SignInComponent } from './modules/auth/components/sign-in/sign-in.component';

const routes: Routes = [
  {
    component: MainComponent, path: 'main',
    children : [
      {
        path: '', loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
      }
    ]
  },
  {
    component: SignInComponent, path: ''
  },
  {
    component: OnboardingComponent, path: 'onboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
