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
    path: 'projects', component: ProjectsComponent
  },
  {
    path: 'projects/create', component: ProjectCreateEditComponent
  },
  {
    path: 'timelines', component: TimelinesComponent
  },
  {
    path: 'admin', component: AdminComponent
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
