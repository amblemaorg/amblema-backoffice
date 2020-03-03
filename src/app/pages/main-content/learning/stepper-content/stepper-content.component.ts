import { Component, OnInit, Output, EventEmitter, HostListener, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Learning } from 'src/app/models/learning.model';
import { Store } from '@ngxs/store';
import { AddLearning, UpdateLearning } from 'src/app/store/learning.action';
import { Router, ActivatedRoute } from '@angular/router';
import { ACTION } from 'src/app/helpers/text-content/text-crud';

declare var $: any;

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
    private routeback: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {

    this.route.paramMap.subscribe( params => {
      this.MODE = params.get('state');
    } );
  }

  ngOnInit() {
    this.adaptStepper(window.innerWidth);

  }

  ngOnChanges(): void {


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

    if ( this.MODE === ACTION.CREATE ) {
      this.store.dispatch(new AddLearning(learning));
    } else {
      this.store.dispatch( new UpdateLearning(learning) );
    }

  }

  onFinalize() {

  }
}
