import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/helper/modal.service';
import { KIND_STEP } from '../_shared/shared';
import { Select } from '@ngxs/store';
import { StepState } from 'src/app/store/step.action';
import { Observable, Subscription } from 'rxjs';
import { Step } from 'src/app/_models/step.model';

@Component({
  selector: 'app-generals',
  templateUrl: './generals.component.html'
})
export class GeneralsComponent implements OnInit, OnDestroy {

  @Select(StepState.generalSteps) steps$: Observable<Step[]>;
  subscription: Subscription;

  modal = 'form-step-general';
  kind: string = KIND_STEP.GENERAL.CODE;

  constructor(
    public modalService: ModalService
  ) { }

  async ngOnInit() {

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
