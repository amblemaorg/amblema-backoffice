import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/helper/modal.service';
import { KIND_STEP } from '../steps-form/steps-form.component';

@Component({
  selector: 'app-generals',
  templateUrl: './generals.component.html'
})
export class GeneralsComponent implements OnInit {

  modal = 'form-step-general';
  kind: string = KIND_STEP.GENERAL.CODE;
  
  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit() {
  }

}
