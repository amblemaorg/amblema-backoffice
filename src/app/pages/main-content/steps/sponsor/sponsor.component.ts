import { Component, OnInit } from '@angular/core';
import { KIND_STEP } from '../_shared/shared';
import { ModalService } from 'src/app/services/helper/modal.service';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Step } from 'src/app/models/step.model';
import { StepState } from 'src/app/store/step.action';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
})
export class SponsorComponent implements OnInit {

  @Select(StepState.sponsorSteps) steps$: Observable<Step[]>;
  subscription: Subscription;

  modal = 'form-step-sponsor';
  kind: string = KIND_STEP.SPONSOR.CODE;


  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit() {
    
  }

}