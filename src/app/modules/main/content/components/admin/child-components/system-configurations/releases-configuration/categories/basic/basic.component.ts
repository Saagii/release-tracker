import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReleasesService } from 'src/app/modules/main/services/releases.service';
import { StatusService } from 'src/app/modules/shared/services/status.service';

@Component({
  selector: 'app-release-config-basic',
  templateUrl: './basic.component.html'
})
export class ReleaseConfigBasicCategoryComponent implements OnInit {

  releaseConfigBasicForm: FormGroup | any;
  releaseConfig: any;
  releaseConfigActionStatus: string = '';

  constructor(
    private statusService: StatusService,
    private releaseService: ReleasesService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {

    // Set releaseConfigBasicForm.
    this.setReleaseConfigBasicForm();

    // Get Releases Configuration Details.
    this.getReleasesConfigurations();
  }


  /*
    Set Release config basic category form.
  */
  setReleaseConfigBasicForm(): void {
    this.releaseConfigBasicForm = this.fb.group({
      types: [''],
      targets: [''],
      status: [''],
      priorities: [''],
      compatibilities: [''],
      usabilities: [''],
      localization: ['']
    });
  }

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
  }


    /*
    Get Release Configurations.
  */
  getReleasesConfigurations(): void {
    this.releaseService.getReleasesConfig().subscribe((releaseConfig: any) => {
      console.log(releaseConfig);

      this.releaseConfig = releaseConfig;
    });
  }


  /*
    Update release configuration based on param.
  */
  updateReleaseConfigBasicDetails(releaseConfigParam: string): void {

    this.releaseConfigActionStatus = releaseConfigParam;

    // Validate form based on the release configuration type.


    // Set the payload details.
    const releaseConfigBasicTypePayload = {
      releaseConfigId: this.releaseConfig._id,
      releaseConfigDetails: {
        [releaseConfigParam] : [
          {
            value: this.releaseConfigBasicForm.get(releaseConfigParam)?.value,
            isMandatory: true
          }
        ]
      }
    }

    console.log(releaseConfigBasicTypePayload);

    // Disbaled the form until the response is received.
    this.releaseConfigBasicForm.disable();

    this.releaseService.updateReleaseConfigDetails(releaseConfigBasicTypePayload).subscribe((response: any) => {
      console.log(response);

      this.releaseConfigActionStatus = '';

      // Enable the form.
      this.releaseConfigBasicForm.enable();

      // Get the member config details.
      this.getReleasesConfigurations();

    }, (error: Error) => {
      console.log(error);

      this.releaseConfigActionStatus = '';

      // Enable the form.
      this.releaseConfigBasicForm.enable();
    });
  }


  /*
    Delete Release Config details.
  */
    deleteReleaseConfigDetailsByTypeAndId(releaseConfigDetailType: string, id: string): void {

    this.releaseService.deleteReleaseConfigDetailsByTypeAndId(releaseConfigDetailType, id).subscribe((response: any) => {
      console.log(response);

      // Get the member config details.
      this.getReleasesConfigurations();

    }, (error: Error) => {
      console.log(error);
    });
  }
  
}
