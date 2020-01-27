import { Component, OnInit } from '@angular/core';
import { AbstractStep } from '../abstract-step';

@Component({
  selector: 'app-step-file',
  templateUrl: './step-file.component.html',
  styles: []
})
export class StepFileComponent extends AbstractStep implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  onClick() {

  }
}
