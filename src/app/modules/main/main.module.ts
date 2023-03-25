import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { ReleasesComponent } from './content/components/releases/releases.component';
import { ReleaseViewComponent } from './content/components/releases/components/release-view/release-view.component';



@NgModule({
  declarations: [
    ReleasesComponent,
    ReleaseViewComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  exports: [
    ReleasesComponent,
    ReleaseViewComponent
  ]
})
export class MainModule { }
