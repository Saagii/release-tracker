import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReleasesService } from 'src/app/modules/main/services/releases.service';
import { releaseAdvancedDetailsMenu } from '../../../../data/release-advanced-details-menu';

@Component({
    selector: 'app-release-sign-off-examine',
    templateUrl: 'examine.component.html',
  })

  export class ExamineComponent implements OnInit  {
    
    releaseId: string = '';
    releaseDetails: any;
    advancedDetailsMenu;
    releaseAspectCount = {
      total: 0,
      completed: 0,
      pending: 0
    };

    constructor(
      private _activatedRoute: ActivatedRoute,
      private releasesService: ReleasesService,) {
        let activeReleaseAdvancedDetailsMenu = [];

        for(const advancedDetailsMenu of releaseAdvancedDetailsMenu) {
          if(advancedDetailsMenu.isActive) {
            activeReleaseAdvancedDetailsMenu.push(advancedDetailsMenu);
          }
        }

        this.advancedDetailsMenu = activeReleaseAdvancedDetailsMenu;
      }


    ngOnInit(): void {
      this.releaseId = this._activatedRoute.snapshot.params['id'];

      // Get Release details.
      this.getReleasesDetails();
    }


    /*
      Get Releases details.
    */
    getReleasesDetails(): any {
      this.releasesService.getReleaseDetails(this.releaseId).subscribe((releaseDetails: any) => {
        console.log(releaseDetails);
        
        this.releaseDetails = releaseDetails;

        for(const menu of releaseAdvancedDetailsMenu) {
          if(menu.isActive) {
            if(Array.isArray(this.releaseDetails[menu.identifierName]) && this.releaseDetails[menu.identifierName].length) {
              this.releaseAspectCount.completed++;
            } else {
              this.releaseAspectCount.pending++;
            }
            this.releaseAspectCount.total++;
          }
        }
      });
    }


    /*
      Validate release aspects.
    */
    validateReleaseAspects(releaseAspect: string): boolean {
      return this.releaseDetails[releaseAspect].length ? true : false;
    }
    
  }