import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/modules/main/services/clients.service';
import { MembersService } from 'src/app/modules/main/services/members.service';
import { ProjectsService } from 'src/app/modules/main/services/projects.service';
import { StatusService } from 'src/app/modules/shared/services/status.service';

@Component({
  selector: 'app-project-create-edit',
  templateUrl: './project-create-edit.component.html'
})
export class ProjectCreateEditComponent implements OnInit {

  projectCreateEditForm: FormGroup;
  clientsList: any;
  membersList: any;
  memberConfig: any;
  projectConfig: any;
  teamMembers: any[] = [];

  constructor(
    private statusService: StatusService,
    private fb: FormBuilder,
    private clientsService: ClientsService,
    private membersService: MembersService,
    private projectsService: ProjectsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
     // Prepare Sign In Form
     this.projectCreateEditForm = this.fb.group({
      client: ['', [Validators.required]],
      projectName: ['', [Validators.required]],
      projectSummary: ['', [Validators.required]],
      searchString: ['']
    });
  }

  ngOnInit(): void {

    // Get clients list.
    this.getClientsList();

    // Get members config.
    this.getMembersConfigurations();

    // Get project config.
    this.getProjectConfigurations();
  }

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }


  /*
    Get Clients List.
  */
  getClientsList(): void {
    this.clientsService.getClientsList().subscribe((response: any[]) => {
      console.log(response);
      
      this.clientsList = response;
    });
  }


  /*
    Get Members Configurations.
  */
  getMembersConfigurations(): void {
    this.membersService.getMembersConfig().subscribe((memberConfig: any) => {
      console.log(memberConfig);

      this.memberConfig = memberConfig;
    });
  }


  /* 
    Get Project Configurations.
  */
  getProjectConfigurations(): void {
    this.projectsService.getProjectsConfig().subscribe((projectConfig: any) => {
      console.log(projectConfig);

      this.projectConfig = projectConfig;
    })
  }


  /*
    Search Member.
  */
  searchMember(event: any): void {
    console.log(event.target.value);

    if(event.target.value === '') {
      this.membersList = [];
      return;
    }

    const membersSearchPayload = {
      memberType: '',
      firstName: this.projectCreateEditForm.get('searchString')?.value,
      lastName: this.projectCreateEditForm.get('searchString')?.value,
      email: this.projectCreateEditForm.get('searchString')?.value,
      title: '',
    }

    this.membersService.getMembersListBySearch(membersSearchPayload).subscribe((response: any) => {
      console.log(response);

      this.membersList = response;
    });
  }


  /*
    Manage Team Members: Update action.
  */
  manageTeamMembers(teamMember: any, action: string, index?: any): void {
    if(action === 'save') {
      this.teamMembers.push(teamMember);
      this.membersList = [];
      this.projectCreateEditForm.get('searchString')?.setValue('');
    }

    if(action === 'remove') {
      this.membersList = [];
      this.projectCreateEditForm.get('searchString')?.setValue('');
      this.teamMembers.splice(index, 1);
    }
  }


  /*
    Filter selected members from search results.
  */
  filterSelectedMembersFromSearchResults(memberId: string): boolean {
    for(const member of this.teamMembers) {
      if(member._id === memberId) { return false; }
    }
    return true;
  }


  /*
    Submit Project Details.
  */
  submitProjectDetails(): void {

    // Filter Team members id into a list.
    const teamMembersList = [];

    for(const teamMember of this.teamMembers) {
      teamMembersList.push(teamMember._id);
    }

    // Get status Id of 'Initiated' project.
    const status = this.projectConfig.status.filter((status: any) => {
      return status.value === 'Initiated';
    })[0];

    const projectDetailsPayload = {
      projectName: this.projectCreateEditForm.get('projectName')?.value,
      description: this.projectCreateEditForm.get('projectSummary')?.value,
      clientId: this.projectCreateEditForm.get('client')?.value,
      projectManagerId: teamMembersList[0],
      teamMembers: teamMembersList,
      statusId: status._id,
      createdOn: new Date()
    }

    console.log(projectDetailsPayload);

    this.projectsService.createProjectDetails(projectDetailsPayload).subscribe((response: any) => {
      console.log(projectDetailsPayload);

      // Route back to projects list page.
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    });
  }
  
}
