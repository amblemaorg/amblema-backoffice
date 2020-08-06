import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/helper/modal.service';
import { KIND_STEP } from '../_shared/shared';
import { Subscription, Observable } from 'rxjs';
import { Step } from 'src/app/_models/step.model';
import { StepState } from 'src/app/store/step.action';
import { Select } from '@ngxs/store';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styles: []
})
export class CoordinatorComponent implements OnInit {

  @Select(StepState.coordinatorSteps) steps$: Observable<Step[]>;
  subscription: Subscription;

  public canCreate = new AuthService().isAllowed( ALL_ACTIONS.STEP_CREATE );
  public canEdit = new AuthService().isAllowed( ALL_ACTIONS.STEP_EDIT );
  public canRemove = new AuthService().isAllowed(ALL_ACTIONS.STEP_DELETE);

  modal = 'form-step-coordinator';
  kind: string = KIND_STEP.COORDINATOR.CODE;

  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit() {
  }

}
