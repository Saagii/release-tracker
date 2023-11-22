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
      projectMembers: ['', [Validators.required]],
      memberType: ['', [Validators.required]],
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

    const membersSearchPayload = {
      memberType: this.projectCreateEditForm.get('memberType')?.value,
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
  
}
