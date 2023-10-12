import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/modules/main/services/clients.service';
import { ReleasesService } from 'src/app/modules/main/services/releases.service';
import { StatusService } from 'src/app/modules/shared/services/status.service';

@Component({
  selector: 'app-release-create-edit',
  templateUrl: './release-create-edit.component.html'
})
export class ReleaseCreateEditComponent implements OnInit {

    releaseCreateEditForm: FormGroup;
    clientsList: any;
    releaseConfigDetails: any;


  constructor(
    private statusService: StatusService,
    private fb: FormBuilder,
    private clientService: ClientsService,
    private releaseService: ReleasesService
  ) {
     // Prepare Sign In Form
     this.releaseCreateEditForm = this.fb.group({
      client: [null, [Validators.required]],
      releaseName: [null, [Validators.required]],
      releaseTitle: [null, [Validators.required]],
      releaseType: [null, [Validators.required]],
      releaseTarget: [null, [Validators.required]],
      releaseOwner: [null, [Validators.required]],
      releaseObjective: [null, [Validators.required]],
      releaseClosingDate: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {

    // Get Clients List
    this.getClientsList();

    // Get release config details.
    this.getReleaseConfigDetails();
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
  getClientsList(): any {
    this.clientService.getClientsList().subscribe((clients: any[]) => {
      console.log(clients);

      this.clientsList = clients;
    });
  }


  /*
    Get Release config details.
  */
  getReleaseConfigDetails(): any {
    this.releaseService.getReleasesConfig().subscribe((releaseConfig: any) => {
      console.log(releaseConfig);

      this.releaseConfigDetails = releaseConfig;
    })
  }


  /*
    Submit release details.
  */
  submiteReleaseDetails(): any {
    
  }
  
}
