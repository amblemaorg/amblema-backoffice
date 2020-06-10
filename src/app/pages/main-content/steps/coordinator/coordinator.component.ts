import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/helper/modal.service';
import { KIND_STEP } from '../_shared/shared';
import { Subscription, Observable } from 'rxjs';
import { Step } from 'src/app/models/step.model';
import { StepState } from 'src/app/store/step.action';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styles: []
})
export class CoordinatorComponent implements OnInit {

  @Select(StepState.coordinatorSteps) steps$: Observable<Step[]>;
  subscription: Subscription;


  modal = 'form-step-coordinator';
  kind: string = KIND_STEP.COORDINATOR.CODE;

  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit() {
  }

}
