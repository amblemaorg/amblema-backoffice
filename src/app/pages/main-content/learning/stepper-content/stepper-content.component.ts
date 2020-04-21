import { Component, OnInit, Output, EventEmitter, HostListener, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Learning } from 'src/app/models/learning.model';
import { Store } from '@ngxs/store';
import { AddLearning, UpdateLearning } from 'src/app/store/learning.action';
import { Router, ActivatedRoute } from '@angular/router';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { LearningService } from 'src/app/services/learning.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

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
  ACTION = ACTION;

  showProgress = false;

  constructor(
    private learningService: LearningService,
    public routeback: Router,
    private toastr: CustomToastrService,
    private route: ActivatedRoute,
    private store: Store
  ) {

    this.route.paramMap.subscribe(params => {
      this.MODE = params.get('state');
    });
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

  private adaptStepper(width): void {
    if (width < 992) {
      this.titleStep = false;
      this.orientation = 'vertical';
    } else {
      this.titleStep = true;
      this.orientation = 'horizontal';
    }
  }

  onSaveLearning(learning: Learning) {
    if (this.MODE === ACTION.CREATE) {
      this.showProgress = true;

      this.learningService.setLearning(learning).subscribe((response: HttpEvent<any>) => {
        switch (response.type) {
          case HttpEventType.Response:
            this.toastr.registerSuccess('Registro', 'Modulo de aprendizaje registrado correctamente.');
            this.store.dispatch(new AddLearning(response.body));
            break;
        }
      });
    } else {
      this.showProgress = true;
      this.learningService.updateLearning( learning.id, learning ).subscribe( response => {
        this.store.dispatch( new UpdateLearning( response ) );
      }, ( err: any ) => {
        console.log(err);
      });
    }
  }

  onFinalize() {

  }
}
