import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/helper/modal.service';
import { KIND_STEP } from '../_shared/shared';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styles: []
})
export class CoordinatorComponent implements OnInit {

  modal = 'form-step-coordinator';
  kind: string = KIND_STEP.GENERAL.CODE;

  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit() {
  }

}
