import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/helper/modal.service';
import { KIND_STEP } from '../_shared/shared';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styles: []
})
export class SchoolComponent implements OnInit {

  modal = 'form-step-school';
  kind: any = KIND_STEP;

  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit() {
  }

}
