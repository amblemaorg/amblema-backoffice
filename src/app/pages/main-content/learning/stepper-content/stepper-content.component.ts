import { Component, OnInit, Output, EventEmitter, HostListener, Input, OnChanges } from '@angular/core';
import { Learning } from 'src/app/models/learning.model';
import { Store } from '@ngxs/store';
import { AddLearning } from 'src/app/store/learning.action';

@Component({
  selector: 'app-stepper-content',
  templateUrl: './stepper-content.component.html',
  styles: ['./stepper-content.component.scss']
})
export class StepperContentComponent implements OnInit, OnChanges {

  @Input() MODE: string;

  @Output() edit = new EventEmitter<any>();
  @Output() create = new EventEmitter<any>();

  titleStep = true; // < -- To show or hide titles
  orientation = 'horizontal';

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.adaptStepper(window.innerWidth);
  }

  ngOnChanges(): void {
    // console.log(this.MODE);
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

  onSaveLearning( learning: Learning) {
    this.store.dispatch(new AddLearning(learning));
  }
}
