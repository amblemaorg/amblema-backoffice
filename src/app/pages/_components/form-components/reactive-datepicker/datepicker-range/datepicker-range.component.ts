import { Component, OnInit, Input } from '@angular/core';
import { AbstractReactive } from '../../abstract-reactive';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-datepicker-range',
  templateUrl: './datepicker-range.component.html',
  styleUrls: ['./datepicker-range.component.scss']
})
export class DatepickerRangeComponent extends AbstractReactive implements OnInit {


  @Input() today: boolean | null = true;
  maxDate = new Date();

  constructor( private localService: BsLocaleService ) {
    super();
  }

  ngOnInit(): void {
    defineLocale('es', esLocale);
    this.localService.use('es');
  }

}
