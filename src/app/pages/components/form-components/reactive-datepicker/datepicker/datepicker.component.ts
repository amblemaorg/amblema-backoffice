import { Component, OnInit } from '@angular/core';
import { AbstractReactive } from '../../abstract-reactive';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent extends AbstractReactive implements OnInit {

  maxDate = new Date();


  constructor( private localService: BsLocaleService ) {
    super();
  }


  ngOnInit(): void {
    defineLocale('es', esLocale);
    this.localService.use('es');
  }

}
