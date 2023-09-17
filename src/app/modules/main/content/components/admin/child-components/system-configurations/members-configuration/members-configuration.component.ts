import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MembersService } from 'src/app/modules/main/services/members.service';
import { StatusService } from 'src/app/modules/shared/services/status.service';

@Component({
  selector: 'app-members-configuration',
  templateUrl: './members-configuration.component.html'
})
export class MembersConfigurationComponent implements OnInit {
  
  memberConfig: any;
  memberConfigTitleForm: FormGroup;
  memberConfigTitleLoader: boolean = false;

  constructor(
    private statusService: StatusService,
    private membersService: MembersService,
    private fb: FormBuilder,
  ) {
    // Prepare Sign In Form
    this.memberConfigTitleForm = this.fb.group({
      memberType: ['']
    });
  }

  ngOnInit(): void {

    // Get Members Configuration Details.
    this.getMembersConfigurations();
  }

  /*
    Get Status Style
  */
  getStatusStyle(statusValue: string): any {
    return this.statusService.getStatusStyle(statusValue);
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
    Add Member Config Type.
  */
  addMemberConfigTitle(): void {

    const memberConfigTypePayload = {
      memberConfigId: this.memberConfig._id,
      titles: [
        {
          value: this.memberConfigTitleForm.get('memberType')?.value,
          status: 'Active'
        }
      ]
    }

    this.memberConfigTitleLoader = true;
    this.memberConfigTitleForm.disable();

    this.membersService.addMemberConfigTitle(memberConfigTypePayload).subscribe((response: any) => {
      console.log(response);

      // Disable Loader
      this.memberConfigTitleLoader = false;

      // Enable the form & reset.
      this.memberConfigTitleForm.enable();
      this.memberConfigTitleForm.reset();

      // Get the member config details.
      this.getMembersConfigurations();

    }, (error: Error) => {
      console.log(error);

      // Disable Loader
      this.memberConfigTitleLoader = false;

      // Enable the form.
      this.memberConfigTitleForm.enable();
    });
  }
  
}
