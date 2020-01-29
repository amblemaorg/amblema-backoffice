import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stepper-content',
  templateUrl: './stepper-content.component.html',
  styles: []
})
export class StepperContentComponent implements OnInit {

  @Output() edit = new EventEmitter<any>();
  @Output() create = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
