import { Component, OnInit } from '@angular/core';
import { AbstractReactive } from '../../../abstract-reactive';

@Component({
  selector: 'app-form-simple-step',
  templateUrl: './form-simple-step.component.html',
  styleUrls: ['./form-simple-step.component.scss']
})
export class FormSimpleStepComponent extends AbstractReactive implements OnInit {

  ngOnInit() {
    console.log(this.placeholder)
  }

}
