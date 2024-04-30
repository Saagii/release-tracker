import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/modules/main/services/clients.service';
import { DomainsService } from 'src/app/modules/main/services/domains.service';
import { ProjectsService } from 'src/app/modules/main/services/projects.service';
import { StatusService } from 'src/app/modules/shared/services/status.service';

@Component({
  selector: 'app-domains-create-edit',
  templateUrl: './domains-create-edit.component.html'
})
export class DomainCreateEditComponent implements OnInit {

  domainCreateEditForm: UntypedFormGroup;
  domainsConfig: any;
  clientsList: any;
  selectedClientId: string = '';
  projectsList: any = [];
  isProjectIdSelected: boolean = false;
  projectId: string = '';

  constructor(
    private statusService: StatusService,
    private fb: UntypedFormBuilder,
    private domainsService: DomainsService,
    private clientsService: ClientsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
  ) {
     // Prepare domain Form
     this.domainCreateEditForm = this.fb.group({
      clientId: ['', [Validators.required]],
      projectId: ['', [Validators.required]],
      domainURL: ['', [Validators.required]],
      domainDescription: ['', [Validators.required]],
      environmentType: ['', [Validators.required]],
      status: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      deploymentDate: ['', [Validators.required]],
      notes: [''],
    });
  }

  ngOnInit(): void {

    // Get domains configuration.
    this.getDomainsConfig();

    // Get clients list.
    this.getClientsList();
  }

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }


  /*
    Get domains configurations.
  */
  getDomainsConfig(): void {
    this.domainsService.getDomainsConfig().subscribe((response: any) => {
      console.log(response);

      this.domainsConfig = response;
    })
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
    Get client id on selection.
  */
  getClientIdOnSelection(event: MatSelectChange): void {
    console.log(event);

    this.selectedClientId = event.value;

    this.getProjectsListByClientId(this.selectedClientId);
  }


  /*
    Get project id on selection.
  */
  getProjectIdOnSelection(event: MatSelectChange): void {
    console.log(event);

    this.isProjectIdSelected = true;
  }


    /*
    Get project list based on the client selection.
  */
  getProjectsListByClientId(clientId: string): void {
    this.projectsService.getProjectDetailsByClientId(clientId).subscribe((projectsList: any) => {
      console.log(projectsList);

      this.projectsList = projectsList;
    });
  }


  /*
    Create domain details.
  */
  createDomainDetails(): void {

    const domainPayload = {
      domainDetails: {
        clientId: this.domainCreateEditForm.get('clientId')?.value,
        projectId: this.domainCreateEditForm.get('projectId')?.value,
        domainURL: this.domainCreateEditForm.get('domainURL')?.value,
        domainDescription: this.domainCreateEditForm.get('domainDescription')?.value,
        environmentType: this.domainCreateEditForm.get('environmentType')?.value,
        status: this.domainCreateEditForm.get('status')?.value,
        branch: this.domainCreateEditForm.get('branch')?.value,
        deploymentDate: this.domainCreateEditForm.get('deploymentDate')?.value,
        notes: this.domainCreateEditForm.get('notes')?.value
      }
    }

    this.domainsService.createDomainDetails(domainPayload).subscribe((response: any) => {
      console.log(response);

      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    });
  }
  
}
