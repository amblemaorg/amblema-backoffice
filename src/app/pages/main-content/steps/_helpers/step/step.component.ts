import { Component, OnInit, Input } from '@angular/core';
import { AbstractStep } from '../abstract-step';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styles: []
})
export class StepComponent extends AbstractStep implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  onClick() {
    this.enableTextArea = !this.enableTextArea;
  }
}
