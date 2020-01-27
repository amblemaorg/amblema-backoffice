import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styles: []
})
export class StepComponent implements OnInit {

  @Input() id: string;
  @Input() label: string;
  @Input() status: boolean; // <-- Content active

  enableTextArea = true;

  constructor() { }

  ngOnInit() {
  }

  onClick() {

    this.enableTextArea = !this.enableTextArea;
    // False save

    //  True edit

  }


}
