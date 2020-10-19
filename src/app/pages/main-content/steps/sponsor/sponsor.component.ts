import { Component, OnInit } from '@angular/core';
import { KIND_STEP } from '../_shared/shared';
import { ModalService } from 'src/app/services/helper/modal.service';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Step } from 'src/app/_models/step.model';
import { StepState } from 'src/app/store/step.action';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
})
export class SponsorComponent implements OnInit {

  @Select(StepState.sponsorSteps) steps$: Observable<Step[]>;
  subscription: Subscription;

  modal = 'form-step-sponsor';
  kind: string = KIND_STEP.SPONSOR.CODE;


  public canCreate = new AuthService().isAllowed( ALL_ACTIONS.STEP_CREATE );
  public canEdit = new AuthService().isAllowed( ALL_ACTIONS.STEP_EDIT );
  public canRemove = new AuthService().isAllowed(ALL_ACTIONS.STEP_DELETE);

  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit() {
  
  }

}
