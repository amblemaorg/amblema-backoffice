import { Component, OnInit } from '@angular/core';
import { AbstractModalComponent } from '../abstract.modal.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',  
})
export class ModalComponent extends AbstractModalComponent implements OnInit {

  ngOnInit() { }
}
