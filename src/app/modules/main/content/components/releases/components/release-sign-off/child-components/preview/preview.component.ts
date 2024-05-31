import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReleasesService } from 'src/app/modules/main/services/releases.service';

@Component({
    selector: 'app-release-sign-off-preview',
    templateUrl: 'preview.component.html',
  })

  export class PreviewReleaseNotesComponent implements OnInit  {
    
    releaseId: string = '';
    generating: boolean = true;

    constructor(
      private _activatedRoute: ActivatedRoute,
      private releasesService: ReleasesService
    ) {}


    ngOnInit(): void {
      this.releaseId = this._activatedRoute.snapshot.params['id'];
    }


    /*
        Generate release notes.
    */
    generateReleaseNotes(): void {
      this.generating = false;
        this.releasesService.generateReleaseNotes(this.releaseId, {}).subscribe((response: any) => {
            console.log(response);
            const blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'sample.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
            this.generating = true;
        })
    }
    
  }