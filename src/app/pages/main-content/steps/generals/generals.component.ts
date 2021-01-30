import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/helper/modal.service';
import { KIND_STEP } from '../_shared/shared';
import { Select } from '@ngxs/store';
import { StepState } from 'src/app/store/step.action';
import { Observable, Subscription } from 'rxjs';
import { Step } from 'src/app/_models/step.model';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

@Component({
  selector: 'app-generals',
  templateUrl: './generals.component.html',
})
export class GeneralsComponent implements OnInit, OnDestroy {
  @Select(StepState.generalSteps) steps$: Observable<Step[]>;
  subscription: Subscription;

  modal = 'form-step-general';
  kind: string = KIND_STEP.GENERAL.CODE;

  public canCreate = new AuthService().isAllowed(ALL_ACTIONS.STEP_CREATE);
  public canEdit = new AuthService().isAllowed(ALL_ACTIONS.STEP_EDIT);
  public canRemove = new AuthService().isAllowed(ALL_ACTIONS.STEP_DELETE);

  constructor(public modalService: ModalService) {}

  async ngOnInit() {
    this.steps$.subscribe((response) => {
      console.log(response);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
