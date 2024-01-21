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
      representative: ['', [Validators.required]],
      website: ['', [Validators.required]],
      email: ['', [Validators.required]],
      clientStatus: ['', [Validators.required]]
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
    Save Client Details.
  */
  saveClientDetails(): void {
    const clientPayload = {
      clientName: this.clientCreateEditForm.get('clientName')?.value,
      clientAbout:  this.clientCreateEditForm.get('clientAbout')?.value,
      clientType:  this.clientCreateEditForm.get('clientType')?.value,
      clientWebsite:  this.clientCreateEditForm.get('website')?.value,
      clientContactEmail:  this.clientCreateEditForm.get('email')?.value,
      clientRepresentative:  this.clientCreateEditForm.get('representative')?.value,
      clientStatus:  this.clientCreateEditForm.get('clientStatus')?.value
    };

    console.log(clientPayload);

    this.clientsService.saveClientDetails(clientPayload).subscribe((response: any) => {
      console.log(response);

      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    });

  }

  
}
