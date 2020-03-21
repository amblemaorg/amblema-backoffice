import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/helper/modal.service';
import { KIND_STEP } from '../steps-form/steps-form.component';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styles: []
})
export class CoordinatorComponent implements OnInit {

  modal = 'form-step-coordinator';
  kind: any = KIND_STEP;

  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit() {
  }

}