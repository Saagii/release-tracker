import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomainsService } from 'src/app/modules/main/services/domains.service';
import { DialogSharedComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { StatusService } from 'src/app/modules/shared/services/status.service';

@Component({
  selector: 'app-domains-configuration',
  templateUrl: './domains-configuration.component.html'
})
export class DomainsConfigurationComponent implements OnInit {

  domainConfig: any;
  domainConfigTypeForm: UntypedFormGroup;
  domainConfigStatusForm: UntypedFormGroup;
  domainConfigTypeLoader: boolean = false;
  domainConfigStatusLoader: boolean = false;

  constructor(
    private statusService: StatusService,
    private domainService: DomainsService,
    private fb: UntypedFormBuilder,
    public dialog: MatDialog,
  ) {
    // Prepare Domain Type Form
    this.domainConfigTypeForm = this.fb.group({
      domainType: ['']
    });

    // Prepare Domain Status Form
    this.domainConfigStatusForm = this.fb.group({
      domainStatus: ['']
    });
  }

  ngOnInit(): void {

    // Get Domains Configuration Details.
    this.getDomainsConfigurations();
  }

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }


  /*
    Get Domain Configurations.
  */
  getDomainsConfigurations(): void {
    this.domainService.getDomainsConfig().subscribe((domainConfig: any) => {
      console.log(domainConfig);

      this.domainConfig = domainConfig;
    });
  }


  /*
    Add domain type configuration.
  */
  addDomainConfigType(): void {

    const domainConfigTypePayload = {
      domainConfigId: this.domainConfig._id,
      types: [
        {
          value: this.domainConfigTypeForm.get('domainType')?.value,
          isMandatory: true
        }
      ]
    }

    // Enable Loaded
    this.domainConfigTypeLoader = true;

    // Diable types form.
    this.domainConfigTypeForm.disable();

    this.domainService.addDomainConfigType(domainConfigTypePayload).subscribe((response: any) => {
      console.log(response);

      // Disable Loader
      this.domainConfigTypeLoader = false;

      // Enable the form & reset.
      this.domainConfigTypeForm.enable();
      this.domainConfigTypeForm.reset();

      // Get the domain config details.
      this.getDomainsConfigurations();

    }, (error: Error) => {
      console.log(error);

      // Disable Loader
      this.domainConfigTypeLoader = false;

      // Enable the form.
      this.domainConfigTypeForm.enable();
    });
  }


  /*
    Add domain status configuration.
  */
  addDomainConfigStatus(): void {

    const domainConfigStatusPayload = {
      domainConfigId: this.domainConfig._id,
      status: [
        {
          value: this.domainConfigStatusForm.get('domainStatus')?.value,
          isMandatory: true
        }
      ]
    }

    // Enable Loaded
    this.domainConfigStatusLoader = true;

    // Diable types form.
    this.domainConfigStatusForm.disable();

    this.domainService.addDomainConfigStatus(domainConfigStatusPayload).subscribe((response: any) => {
      console.log(response);

      // Disable Loader
      this.domainConfigStatusLoader = false;

      // Enable the form & reset.
      this.domainConfigStatusForm.enable();
      this.domainConfigStatusForm.reset();

      // Get the domain config details.
      this.getDomainsConfigurations();

    }, (error: Error) => {
      console.log(error);

      // Disable Loader
      this.domainConfigStatusLoader = false;

      // Enable the form.
      this.domainConfigStatusForm.enable();
    });
  }


  /*
    Delete Domain Config Type.
  */
  deleteDomainConfigType(domainTypeId: string): void {

    const domainConfigTypePayload = {
      // domainConfigId: this.domainConfig._id,
      typeId: domainTypeId
    }

    this.domainService.deleteDomainConfigType(domainConfigTypePayload).subscribe((response: any) => {
      console.log(response);

      // Get the domain config details.
      this.getDomainsConfigurations();

    }, (error: Error) => {
      console.log(error);
    });
  }


  /*
    Delete Domain Config Status.
  */
  deleteDomainConfigStatus(domainStatusId: string): void {

    const domainConfigStatusPayload = {
      // domainConfigId: this.domainConfig._id,
      statusId: domainStatusId
    }

    this.domainService.deleteDomainConfigStatus(domainConfigStatusPayload).subscribe((response: any) => {
      console.log(response);

      // Get the domain config details.
      this.getDomainsConfigurations();

    }, (error: Error) => {
      console.log(error);
    });
  }


  /*
    Dialog Method: Nav New Menu
  */
  navigationActions(actionData: any, actionType: string): any {
    this.dialog.open(DialogSharedComponent, {
      panelClass: ['w-5/12'],
      data: {
        type: 'confirmation',
        confirmationContent: {
          title: 'Are you sure you want to delete ' + actionData.value + ' from domain ' + actionType + ' ?',
          subtitle: ''
        }
      },
    }).afterClosed().subscribe((result: boolean) => {
      console.log(result);

      if(result) {
        if(actionType === 'type') { this.deleteDomainConfigType(actionData._id); }

        if(actionType === 'status') { this.deleteDomainConfigStatus(actionData._id); }
      }
    });
  }
  
}
