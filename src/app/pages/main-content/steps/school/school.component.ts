import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/helper/modal.service';
import { KIND_STEP } from '../_shared/shared';
import { StepState } from 'src/app/store/step.action';
import { Observable, Subscription } from 'rxjs';
import { Step } from 'src/app/_models/step.model';
import { Select } from '@ngxs/store';

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


  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit() {
  }

}
