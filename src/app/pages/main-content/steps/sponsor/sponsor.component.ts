import { Component, OnInit } from '@angular/core';
import { KIND_STEP } from '../steps-form/steps-form.component';
import { ModalService } from 'src/app/services/helper/modal.service';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
})
export class SponsorComponent implements OnInit {

  modal = 'form-step-sponsor';
  kind: any = KIND_STEP;

  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit() {
  }

}
