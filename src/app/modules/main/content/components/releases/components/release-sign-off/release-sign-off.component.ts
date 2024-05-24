import {Component, Inject, OnInit} from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/modules/main/services/clients.service';
import { MembersService } from 'src/app/modules/main/services/members.service';
import { ProjectsService } from 'src/app/modules/main/services/projects.service';
import { ReleasesService } from 'src/app/modules/main/services/releases.service';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { signOffProcessMenu } from './data/sign-off-process-menu';

@Component({
    selector: 'app-release-sign-off',
    templateUrl: 'release-sign-off.component.html',
  })
  export class ReleaseSignOffComponent implements OnInit  {

    statusListMenu: any;
    tempStatusValue: string = '';
    releaseId: string = '';
    releaseDetails: any;
    clientsList: any;
    releaseConfigDetails: any;
    membersList: any;
    projectDetails: any;
    activeComponent: any = '';
    activeComponentInputs: any;
    signOffProcessMenu = signOffProcessMenu;
    
    constructor(
        private statusService: StatusService,
        private _activatedRoute: ActivatedRoute,
        private releasesService: ReleasesService,
        private clientsService: ClientsService,
        private membersService: MembersService,
        private projectsService: ProjectsService,
        private fb: UntypedFormBuilder
    ) {
      this.activeComponent = signOffProcessMenu[0].component;
    }

    ngOnInit(): void {
        this.releaseId = this._activatedRoute.snapshot.params['id'];

        // Get release config.
        this.getReleaseConfigDetails();

        // Get members list.
        this.getMembersList();
    }


    /*
        Get Status Style
    */
    getStatusStyle(statusValue: string): any {
        return this.statusService.getStatusStyle(statusValue);
    }


      /*
    Get release config details.
  */
  getReleaseConfigDetails(): any {
    this.releasesService.getReleasesConfig().subscribe((releaseConfig: any) => {
      console.log(releaseConfig);

      this.releaseConfigDetails = releaseConfig;
      
      // Get Clients list.
      this.getClientsList();
    });
  }


  /*
    Get Clients List.
  */
  getClientsList(): void {
    this.clientsService.getClientsList().subscribe((response: any[]) => {
      console.log(response);
      
      this.clientsList = response;

      // Get Releases details.
      this.getReleasesDetails();
    });
  }


  /*
    Get Members List.
  */
  getMembersList(): void {
    this.membersService.getMembersListByType('Internal').subscribe((response: any[]) => {
      console.log(response);
      
      this.membersList = response;
    });
  }


  /*
    Get Releases details.
  */
  getReleasesDetails(): any {
    this.releasesService.getReleaseDetails(this.releaseId).subscribe((releaseDetails: any) => {
      console.log(releaseDetails);
      
      setTimeout(() => {
        this.releaseDetails = releaseDetails;

        // Set Status
        this.tempStatusValue = this.releaseDetails.releaseStatusId;

        // Get Project Details by project Id.
        this.getProjectDetailsByProjectId(this.releaseDetails.projectId);
      }, 500);
    });
  }


    /*
    Get project details by project Id.
  */
  getProjectDetailsByProjectId(projectId: string): void {
    this.projectsService.getProjectDetailsByProjectId(projectId).subscribe((response: any) => {
      console.log(response);

      this.projectDetails = response;
    })
  }
    
  }