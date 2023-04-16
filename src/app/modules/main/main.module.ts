import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { ReleasesComponent } from './content/components/releases/releases.component';
import { ReleaseViewComponent } from './content/components/releases/components/release-view/release-view.component';
import { ProjectViewComponent } from './content/components/projects/components/project-view/project-view.component';
import { ProjectCreateEditComponent } from './content/components/projects/components/project-create-edit/project-create-edit.component';
import { ReleaseCreateEditComponent } from './content/components/releases/components/release-create-edit/release-create-edit.component';
import { InstanceCreateEditComponent } from './content/components/instances/components/instances-create-edit/instances-create-edit.component';
import { ClientsComponent } from './content/components/clients/clients.component';
import { ClientProfileComponent } from './content/components/clients/components/client-profile/client-profile.component';
import { ClientCreateRequirementsComponent } from './content/components/clients/components/client-create-requirements/client-create-requirements.component';
import { MemberProfileComponent } from './content/components/admin/child-components/member-profile/member-profile.component';



@NgModule({
  declarations: [
    ReleasesComponent,
    ReleaseViewComponent,
    ProjectViewComponent,
    ProjectCreateEditComponent,
    ReleaseCreateEditComponent,
    InstanceCreateEditComponent,
    ClientsComponent,
    ClientProfileComponent,
    ClientCreateRequirementsComponent,
    MemberProfileComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  exports: [
    ReleasesComponent,
    ReleaseViewComponent,
    ProjectViewComponent,
    ProjectCreateEditComponent,
    ReleaseCreateEditComponent,
    InstanceCreateEditComponent,
    ClientsComponent,
    ClientProfileComponent,
    ClientCreateRequirementsComponent,
    MemberProfileComponent
  ]
})
export class MainModule { }
