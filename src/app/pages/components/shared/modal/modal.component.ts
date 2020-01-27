import { Component, OnInit, Input } from '@angular/core';
import { AbstractModalComponent } from './abstract.modal.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent extends AbstractModalComponent implements OnInit {

  ngOnInit() { }
}
