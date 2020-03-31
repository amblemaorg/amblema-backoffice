import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/helper/modal.service';
import { KIND_STEP } from '../_shared/shared';
import { Select } from '@ngxs/store';
import { StepState } from 'src/app/store/step.action';
import { Observable, Subscription } from 'rxjs';
import { Step } from 'src/app/models/step.model';

@Component({
  selector: 'app-generals',
  templateUrl: './generals.component.html'
})
export class GeneralsComponent implements OnInit, OnDestroy {

  @Select(StepState.generalStandardSteps) steps$: Observable<Step[]>;
  subscription: Subscription;

  modal = 'form-step-general';
  kind: string = KIND_STEP.GENERAL.CODE;

  dataSponsorStep: Step;
  dataSchoolStep: Step;
  dataCoordinatorStep: Step;
  dataConfirmatinStep: Step;
  dataWorkPlanning: Step;

  constructor(
    public modalService: ModalService
  ) { }

  async ngOnInit() {
    
    this.subscription = await this.steps$.subscribe(response => {
      response.forEach((value) => {

        // Get standard forms    
        switch (value.devName) {
          case DEV_NAME.SCHOOL:
            this.dataSchoolStep = value;
            break;
          case DEV_NAME.SPONSOR:
            this.dataSponsorStep = value;
            case DEV_NAME.COORDINATOR:
              this.dataCoordinatorStep = value;
            break;
          case DEV_NAME.CONFIRMATION:
            this.dataConfirmatinStep = value;
            break;
          case DEV_NAME.WORK_PLANNING:
            this.dataWorkPlanning = value;
            break;
        }

      });
    });
    
  }

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }
}

export const DEV_NAME = {
  SCHOOL: 'findSchool',
  SPONSOR: 'findSponsor',
  COORDINATOR: 'findCoordinator',
  CONFIRMATION: 'amblemaConfirmation',
  WORK_PLANNING: 'initialWorkshopPlanning'
};
