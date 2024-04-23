import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/modules/main/services/clients.service';
import { MembersService } from 'src/app/modules/main/services/members.service';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { ClientConfigurationResponse } from '../../../../model/clientConfigurationResponse.model';
import { MembersListResponse } from '../../../../model/membersListResponse.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-create-edit',
  templateUrl: './client-create-edit.component.html'
})
export class ClientCreateEditComponent implements OnInit {

    clientCreateEditForm: UntypedFormGroup;
    clientConfig: ClientConfigurationResponse | undefined;
    membersList: MembersListResponse[] | undefined;
    teamMembers: any[] = [];
    memberConfig: any;

  constructor(
    private statusService: StatusService,
    private fb: UntypedFormBuilder,
    private membersService: MembersService,
    private clientsService: ClientsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
     // Prepare Sign In Form
     this.clientCreateEditForm = this.fb.group({
      clientName: ['', [Validators.required]],
      clientAbout: ['', [Validators.required]],
      clientType: ['', [Validators.required]],
      clientMembers: ['', [Validators.required]],
      website: ['', [Validators.required]],
      email: ['', [Validators.required]],
      clientStatus: ['', [Validators.required]],
      clientCountry: ['', [Validators.required]],
      clientState: ['', [Validators.required]],
      clientCity: ['', [Validators.required]],
      searchString: ['']
    });
  }

  ngOnInit(): void {

    // Get Members of type: External.
    this.getMembersList();

    // Get Clients Configurations.
    this.getClientConfigurations();
  }

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }


  /*
    Get Members List of type: External.
  */
  getMembersList(): void {
    this.membersService.getMembersList('external').subscribe((response: MembersListResponse[]) => {
      console.log(response);

      this.membersList = response;
    });
  }

  /*
    Get Client Configurations.
  */
  getClientConfigurations(): void {
    this.clientsService.getClientsConfig().subscribe((response: ClientConfigurationResponse) => {
      console.log(response);

      this.clientConfig = response;
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
      firstName: this.clientCreateEditForm.get('searchString')?.value,
      lastName: this.clientCreateEditForm.get('searchString')?.value,
      email: this.clientCreateEditForm.get('searchString')?.value,
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
      this.clientCreateEditForm.get('searchString')?.setValue('');
    }

    if(action === 'remove') {
      this.membersList = [];
      this.clientCreateEditForm.get('searchString')?.setValue('');
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
    Save Client Details.
  */
  saveClientDetails(): void {

    // Filter Team members id into a list.
    const teamMembersList = [];

    for(const teamMember of this.teamMembers) {
      teamMembersList.push(teamMember._id);
    }

    const clientPayload = {
      clientName: this.clientCreateEditForm.get('clientName')?.value,
      clientAbout:  this.clientCreateEditForm.get('clientAbout')?.value,
      clientType:  this.clientCreateEditForm.get('clientType')?.value,
      clientWebsite:  this.clientCreateEditForm.get('website')?.value,
      clientContactEmail:  this.clientCreateEditForm.get('email')?.value,
      clientMembers:  teamMembersList,
      clientStatus:  this.clientCreateEditForm.get('clientStatus')?.value,
      clientCountry:  this.clientCreateEditForm.get('clientCountry')?.value,
      clientState:  this.clientCreateEditForm.get('clientState')?.value,
      clientCity:  this.clientCreateEditForm.get('clientCity')?.value
    };

    console.log(clientPayload);

    this.clientsService.saveClientDetails(clientPayload).subscribe((response: any) => {
      console.log(response);

      this.router.navigate(['../', response._id], {relativeTo: this.activatedRoute});
    });

  }

  
}
