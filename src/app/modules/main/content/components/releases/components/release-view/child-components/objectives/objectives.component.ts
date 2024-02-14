import { Component, Input, OnInit } from '@angular/core';
import { statusListMockDataMenu } from 'src/app/modules/shared/data/status-list-mock-data';
import { StatusService } from 'src/app/modules/shared/services/status.service';
import { ActivatedRoute } from '@angular/router';
import { ReleasesService } from 'src/app/modules/main/services/releases.service';
import { ClientsService } from 'src/app/modules/main/services/clients.service';
import { MembersService } from 'src/app/modules/main/services/members.service';
import { ProjectsService } from 'src/app/modules/main/services/projects.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-release-view-objectives',
  templateUrl: './objectives.component.html'
})
export class ReleaseObjectivesComponent implements OnInit {

  @Input() title?: string;
  @Input() description?: string;
  releaseId: string = '';
  releaseObjectivesForm: UntypedFormGroup;

  constructor(
    private statusService: StatusService,
    private _activatedRoute: ActivatedRoute,
    private releasesService: ReleasesService,
    private clientsService: ClientsService,
    private membersService: MembersService,
    private projectsService: ProjectsService,
    private fb: UntypedFormBuilder
  ) {
    // Prepare Objectives Form
    this.releaseObjectivesForm = this.fb.group({
      title: [''],
      description: [''],
      status: ['']
    });
  }

  ngOnInit(): void {
    console.log('Inside ReleaseObjectivesComponent');

    this.releaseId = this._activatedRoute.snapshot.params['id'];
  }
}
