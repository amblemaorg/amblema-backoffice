import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/helper/modal.service';
import { KIND_STEP } from '../_shared/shared';
import { StepState } from 'src/app/store/step.action';
import { Observable, Subscription } from 'rxjs';
import { Step } from 'src/app/_models/step.model';
import { Select } from '@ngxs/store';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styles: []
})
export class SchoolComponent implements OnInit {

  @Select(StepState.schoolSteps) steps$: Observable<Step[]>;
  subscription: Subscription;

  modal = 'form-step-general';
  kind: string = KIND_STEP.SCHOOL.CODE;

  public canCreate = new AuthService().isAllowed( ALL_ACTIONS.STEP_CREATE );
  public canEdit = new AuthService().isAllowed( ALL_ACTIONS.STEP_EDIT );
  public canRemove = new AuthService().isAllowed(ALL_ACTIONS.STEP_DELETE);


  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit() {
  }

}
