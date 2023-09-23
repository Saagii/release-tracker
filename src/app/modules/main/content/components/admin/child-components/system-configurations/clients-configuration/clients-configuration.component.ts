import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClientsService } from 'src/app/modules/main/services/clients.service';
import { DialogSharedComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { StatusService } from 'src/app/modules/shared/services/status.service';

@Component({
  selector: 'app-clients-configuration',
  templateUrl: './clients-configuration.component.html'
})
export class ClientsConfigurationComponent implements OnInit {

  clientConfig: any;
  clientConfigTypeForm: FormGroup;
  clientConfigTypeLoader: boolean = false;

  constructor(
    private statusService: StatusService,
    private clientService: ClientsService,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    // Prepare Sign In Form
    this.clientConfigTypeForm = this.fb.group({
      clientType: ['']
    });
  }

  ngOnInit(): void {

    // Get Clients Configuration Details.
    this.getMembersConfigurations();
  }

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }


  /*
    Get Clients Configurations.
  */
  getMembersConfigurations(): void {
    this.clientService.getClientsConfig().subscribe((clientConfig: any) => {
      console.log(clientConfig);

      this.clientConfig = clientConfig;
    });
  }


  /*
    Add client type configuration.
  */
  addClientConfigType(): void {

  }


  /*
    Dialog Method: Nav New Menu
  */
  navigationActions(typeData: any): any {
    this.dialog.open(DialogSharedComponent, {
      panelClass: ['w-5/12'],
      data: {
        type: 'confirmation',
        confirmationContent: {
          title: 'Are you sure you want to delete ' + typeData.value + ' from client types ?',
          subtitle: ''
        }
      },
    }).afterClosed().subscribe((result: boolean) => {
      console.log(result);

      // this.deleteMemberConfigTitle(titleData._id);
    });
  }
  
}
