import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-stepper-content',
  templateUrl: './stepper-content.component.html',
  styles: []
})
export class StepperContentComponent implements OnInit {

  @Output() edit = new EventEmitter<any>();
  @Output() create = new EventEmitter<any>();

  titleStep = true; // < -- To show or hide titles
  orientation = 'horizontal';

  constructor() { }

  ngOnInit() {
    this.adaptStepper(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.adaptStepper(event.target.innerWidth);
  }

  private adaptStepper( width ): void {
    if ( width < 992 ) {
      this.titleStep = false;
      this.orientation = 'vertical';
    } else {
      this.titleStep = true;
      this.orientation = 'horizontal';
    }
  }

}
