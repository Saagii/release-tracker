import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './modules/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { NavigationComponent } from './modules/main/navigation/navigation.component';
import { DialogSharedComponent } from './modules/shared/components/dialog/dialog.component';
import { ContentComponent } from './modules/main/content/content.component';
// import { ReleasesComponent } from './modules/main/content/components/releases/releases.component';
import { StatusService } from './modules/shared/services/status.service';
import { ProjectsComponent } from './modules/main/content/components/projects/projects.component';
import { TimelinesComponent } from './modules/main/content/components/timelines/timelines.component';
import { AdminComponent } from './modules/main/content/components/admin/admin.component';
import { MembersComponent } from './modules/main/content/components/admin/child-components/members/members.component';
import { DomainsComponent } from './modules/main/content/components/domains/domains.component';
import { SignInComponent } from './modules/auth/components/sign-in/sign-in.component';
import { OnboardingComponent } from './modules/auth/components/onboarding/onboarding.component';
import { AuthService } from './modules/auth/services/auth.service';
// import { ReleaseViewComponent } from './modules/main/content/components/releases/components/release-view/release-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavigationComponent,
    DialogSharedComponent,
    ContentComponent,
    // ReleasesComponent,
    DomainsComponent,
    ProjectsComponent,
    TimelinesComponent,
    AdminComponent,
    SignInComponent,
    OnboardingComponent,
    // ReleaseViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [StatusService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
