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
    this.getClientsConfigurations();
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
  getClientsConfigurations(): void {
    this.clientService.getClientsConfig().subscribe((clientConfig: any) => {
      console.log(clientConfig);

      this.clientConfig = clientConfig;
    });
  }


  /*
    Add client type configuration.
  */
  addClientConfigType(): void {

    const clientConfigTypePayload = {
      memberConfigId: this.clientConfig._id,
      types: [
        {
          value: this.clientConfigTypeForm.get('clientType')?.value,
          status: 'Active'
        }
      ]
    }

    // Enable Loaded
    this.clientConfigTypeLoader = true;

    // Diable types form.
    this.clientConfigTypeForm.disable();

    this.clientService.addClientConfigType(clientConfigTypePayload).subscribe((response: any) => {
      console.log(response);

      // Disable Loader
      this.clientConfigTypeLoader = false;

      // Enable the form & reset.
      this.clientConfigTypeForm.enable();
      this.clientConfigTypeForm.reset();

      // Get the member config details.
      this.getClientsConfigurations();

    }, (error: Error) => {
      console.log(error);

      // Disable Loader
      this.clientConfigTypeLoader = false;

      // Enable the form.
      this.clientConfigTypeForm.enable();
    });
  }


  /*
    Delete Client Config Type.
  */
  deleteClientConfigType(clientTypeId: string): void {

    const clientConfigTypePayload = {
      clientConfigId: this.clientConfig._id,
      typeId: clientTypeId
    }

    this.clientService.deleteClientConfigType(clientConfigTypePayload).subscribe((response: any) => {
      console.log(response);

      // Get the member config details.
      this.getClientsConfigurations();

    }, (error: Error) => {
      console.log(error);
    });
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

      this.deleteClientConfigType(typeData._id);
    });
  }
  
}
