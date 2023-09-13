import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { ReleasesComponent } from './content/components/releases/releases.component';
import { ReleaseViewComponent } from './content/components/releases/components/release-view/release-view.component';
import { ProjectViewComponent } from './content/components/projects/components/project-view/project-view.component';
import { ProjectCreateEditComponent } from './content/components/projects/components/project-create-edit/project-create-edit.component';
import { ReleaseCreateEditComponent } from './content/components/releases/components/release-create-edit/release-create-edit.component';
import { ClientsComponent } from './content/components/clients/clients.component';
import { ClientProfileComponent } from './content/components/clients/components/client-profile/client-profile.component';
import { ClientCreateRequirementsComponent } from './content/components/clients/components/client-create-requirements/client-create-requirements.component';
import { MemberProfileComponent } from './content/components/admin/child-components/members/member-profile/member-profile.component';
import { MemberCreateEditComponent } from './content/components/admin/child-components/members/member-create-edit/member-create-edit.component';
import { ClientCreateEditComponent } from './content/components/clients/components/client-create-edit/client-create-edit.component';
import { MembersComponent } from './content/components/admin/child-components/members/members.component';
import { AdminMenuComponent } from './content/components/admin/child-components/admin-menu/admin-menu.component';
import { DomainCreateEditComponent } from './content/components/domains/components/domains-create-edit/domains-create-edit.component';
import { SystemConfigurationsComponent } from './content/components/admin/child-components/system-configurations/system-configurations.component';
import { MembersConfigurationComponent } from './content/components/admin/child-components/system-configurations/members-configuration/members-configuration.component';



@NgModule({
  declarations: [
    ReleasesComponent,
    ReleaseViewComponent,
    ProjectViewComponent,
    ProjectCreateEditComponent,
    ReleaseCreateEditComponent,
    DomainCreateEditComponent,
    ClientsComponent,
    ClientProfileComponent,
    ClientCreateRequirementsComponent,
    AdminMenuComponent,
    MembersComponent,
    MemberProfileComponent,
    MemberCreateEditComponent,
    ClientCreateEditComponent,
    SystemConfigurationsComponent,
    MembersConfigurationComponent
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
    DomainCreateEditComponent,
    ClientsComponent,
    ClientProfileComponent,
    ClientCreateRequirementsComponent,
    AdminMenuComponent,
    MembersComponent,
    MemberProfileComponent,
    MemberCreateEditComponent,
    ClientCreateEditComponent,
    SystemConfigurationsComponent,
    MembersConfigurationComponent
  ]
})
export class MainModule { }
