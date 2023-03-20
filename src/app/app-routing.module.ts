import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { MainComponent } from './modules/main/main.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
