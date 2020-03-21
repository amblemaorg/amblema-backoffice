import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/helper/modal.service';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styles: []
})
export class CoordinatorComponent implements OnInit {

  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit() {
  }

}
