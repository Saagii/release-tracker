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
    Add release type configuration.
  */
  updateReleaseConfigBasicDetails(releaseConfigParam: string): void {

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

    this.releaseService.updateReleaseConfigDetails(releaseConfigBasicTypePayload).subscribe((response: any) => {
      console.log(response);

      // Get the member config details.
      this.getReleasesConfigurations();

    }, (error: Error) => {
      console.log(error);

      // Enable the form.
      // this.releaseConfigTypeForm.enable();
    });
  }
  
}
