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
import { StatusService } from './modules/shared/services/status.service';
import { ProjectsComponent } from './modules/main/content/components/projects/projects.component';
import { TimelinesComponent } from './modules/main/content/components/timelines/timelines.component';
import { AdminComponent } from './modules/main/content/components/admin/admin.component';
import { DomainsComponent } from './modules/main/content/components/domains/domains.component';
import { AuthService } from './modules/auth/services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './modules/shared/interceptor/token.interceptor';
import { AuthGuard } from './modules/shared/authGaurd/auth.gaurd';
import { AuthComponent } from './modules/auth/auth.component';
import { MembersService } from './modules/main/services/members.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    // AuthComponent,
    NavigationComponent,
    DialogSharedComponent,
    ContentComponent,
    DomainsComponent,
    ProjectsComponent,
    TimelinesComponent,
    AdminComponent,
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
  providers: [StatusService, AuthService, MembersService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
