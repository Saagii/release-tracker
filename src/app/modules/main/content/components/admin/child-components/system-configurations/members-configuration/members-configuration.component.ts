import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MembersService } from 'src/app/modules/main/services/members.service';
import { DialogSharedComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
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
    public dialog: MatDialog,
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

    // Enable Loaded
    this.memberConfigTitleLoader = true;

    // Diable title form.
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


  /*
    Delete Member Config Type.
  */
  deleteMemberConfigTitle(memberTitleId: string): void {

    const memberConfigTypePayload = {
      memberConfigId: this.memberConfig._id,
      titleId: memberTitleId
    }

    this.membersService.deleteMemberConfigTitle(memberConfigTypePayload).subscribe((response: any) => {
      console.log(response);

      // Get the member config details.
      this.getMembersConfigurations();

    }, (error: Error) => {
      console.log(error);
    });
  }


  /*
    Dialog Method: Nav New Menu
  */
  navigationActions(titleData: any): any {
    this.dialog.open(DialogSharedComponent, {
      panelClass: ['w-5/12'],
      data: {
        type: 'confirmation',
        confirmationContent: {
          title: 'Are you sure you want to delete ' + titleData.value + ' from member titles ?',
          subtitle: ''
        }
      },
    }).afterClosed().subscribe((result: boolean) => {
      console.log(result);

      if(result) {
        this.deleteMemberConfigTitle(titleData._id);
      }
    });
  }
  
}
