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

  @Select(StepState.sponsorStandardSteps) steps$: Observable<Step[]>;
  subscription: Subscription;

  modal = 'form-step-sponsor';
  kind: string = KIND_STEP.GENERAL.CODE;

  // sponsorKnowAmblemaMethod: Step;
  // sponsorFillSchoolForm: Step;
  // sponsorFillCoordinatorForm: Step;
  // sponsorPresentationSchool: Step;
  // sponsorAgreementSchool: Step;
  // sponsorAgreementSchoolFoundation: Step;


  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit() {
    this.steps$.subscribe( response => {
      
      response.forEach((value) => {

        // Get standard forms
        // switch (value.devName) {
        //   case DEV_NAME.SCHOOL:
        //     this.dataSchoolStep = value;
        //     break;
        //   case DEV_NAME.SPONSOR:
        //     this.dataSponsorStep = value;
        //     break;
        //   case DEV_NAME.COORDINATOR:
        //     this.dataCoordinatorStep = value;
        //     break;
        //   case DEV_NAME.CONFIRMATION:
        //     this.dataConfirmatinStep = value;
        //     break;
        //   case DEV_NAME.WORK_PLANNING:
        //     this.dataWorkPlanning = value;
        //     break;
        // }

      });

    } )
    
  }

}

const DEV_NAME = {
  SPONSOR_KNOW: 'sponsorKnowAmblemaMethod', 
  SPONSOR_FILL_SCHOOL_FORM: 'sponsorFillSchoolForm',
  SPONSOR_FILL_COORDINATOR_FORM: 'sponsorFillCoordinatorForm',
  SPONSOR_PRESENTATION_SCHOOL: 'sponsorPresentationSchool',
  SPONSOR_AGREEMENT_SCHOOL: 'sponsorAgreementSchool',
  SPONSOR_AGREEMENT_SCHOOL_FOUNDATION: 'sponsorAgreementSchoolFoundation',
}
