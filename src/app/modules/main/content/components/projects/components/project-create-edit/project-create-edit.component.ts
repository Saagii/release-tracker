import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/modules/main/services/clients.service';
import { MembersService } from 'src/app/modules/main/services/members.service';
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
  teamMembers: any[] = [];

  constructor(
    private statusService: StatusService,
    private fb: FormBuilder,
    private clientsService: ClientsService,
    private membersService: MembersService
  ) {
     // Prepare Sign In Form
     this.projectCreateEditForm = this.fb.group({
      client: ['', [Validators.required]],
      projectName: ['', [Validators.required]],
      projectSummary: ['', [Validators.required]],
      searchString: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

    // Get clients list.
    this.getClientsList();

    // Get members config.
    this.getMembersConfigurations();
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
  manageTeamMembers(teamMemberId: any, action: string, index?: any): void {

    if(action == 'save') {
      this.teamMembers.push(teamMemberId);
    }

    if(action == 'remove') {
      this.teamMembers.splice(index, teamMemberId);
    }

    if(action == 'update') {
      this.teamMembers.splice(index, teamMemberId);
    }
    
  }


  /*
    Submit Project Details.
  */
  submitProjectDetails(): void {
    const projectDetailsPayload = {
      projectName: this.projectCreateEditForm.get('projectName')?.value,
      description: this.projectCreateEditForm.get('projectSummary')?.value,
      clientId: this.projectCreateEditForm.get('client')?.value,
      teamMembers: this.teamMembers,

    }
  }
  
}
