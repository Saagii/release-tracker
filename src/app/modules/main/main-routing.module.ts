import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './content/components/admin/admin.component';
import { InstancesComponent } from './content/components/instances/instances.component';
import { ProjectCreateEditComponent } from './content/components/projects/components/project-create-edit/project-create-edit.component';
import { ProjectViewComponent } from './content/components/projects/components/project-view/project-view.component';
import { ProjectsComponent } from './content/components/projects/projects.component';
import { ReleaseViewComponent } from './content/components/releases/components/release-view/release-view.component';
import { ReleasesComponent } from './content/components/releases/releases.component';
import { TimelinesComponent } from './content/components/timelines/timelines.component';
import { ReleaseCreateEditComponent } from './content/components/releases/components/release-create-edit/release-create-edit.component';
import { InstanceCreateEditComponent } from './content/components/instances/components/instances-create-edit/instances-create-edit.component';
import { ClientsComponent } from './content/components/clients/clients.component';
import { ClientProfileComponent } from './content/components/clients/components/client-profile/client-profile.component';
import { ClientCreateRequirementsComponent } from './content/components/clients/components/client-create-requirements/client-create-requirements.component';
import { MemberProfileComponent } from './content/components/admin/child-components/members/member-profile/member-profile.component';
import { MemberCreateEditComponent } from './content/components/admin/child-components/members/member-create-edit/member-create-edit.component';
import { ClientCreateEditComponent } from './content/components/clients/components/client-create-edit/client-create-edit.component';
import { MembersComponent } from './content/components/admin/child-components/members/members.component';
import { AdminMenuComponent } from './content/components/admin/child-components/admin-menu/admin-menu.component';

const mainRoutes: Routes = [
  { path: '', redirectTo: 'releases', pathMatch: 'full' },
  {
    path: 'releases', component: ReleasesComponent
  },
  {
    path: 'releases/create', component: ReleaseCreateEditComponent
  },
  {
    path: 'instances', component: InstancesComponent
  },
  {
    path: 'instances/create', component: InstanceCreateEditComponent
  },
  {
    path: 'projects', component: ProjectsComponent
  },
  {
    path: 'projects/create', component: ProjectCreateEditComponent
  },
  {
    path: 'clients', component: ClientsComponent
  },
  {
    path: 'clients/create', component: ClientCreateEditComponent
  },
  {
    path: 'clients/createRequirement', component: ClientCreateRequirementsComponent
  },
  {
    path: 'clients/:id', component: ClientProfileComponent
  },
  {
    path: 'timelines', component: TimelinesComponent
  },
  {
    path: 'admin', component: AdminComponent,
    children: [
      {
        path: '', component: AdminMenuComponent
      },
      {
        path: 'members', component: MembersComponent
      }
    ]
  },
  {
    path: 'admin/members/create', component: MemberCreateEditComponent
  },
  {
    path: 'admin/members/:id', component: MemberProfileComponent
  },
  {
    path: 'releases/:id', component: ReleaseViewComponent
  },
  {
    path: 'projects/:id', component: ProjectViewComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
