import { Component, OnInit } from '@angular/core';
import { AbstractReactive } from '../../abstract-reactive';

import * as esLocale from 'date-fns/locale/es';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent extends AbstractReactive implements OnInit {
  
  options; 

  constructor(  ) { super(); }

  ngOnInit(): void {
    const date = new Date();
    date.setDate(date.getDate() - 1); // <-- Today

    this.options = {
      minYear: 1970,
      maxYear: 2030,
      displayFormat: 'DD MMM YYYY',
      barTitleFormat: 'DD MMMM YYYY',
      dayNamesFormat: 'dd',
      firstCalendarDay: 0, // <-- 0 - Sunday, 1 - Monday
      locale: esLocale,
      //minDate: // <-- date, Minimal selectable date
      maxDate: new Date(Date.now()),  // <-- Maximal selectable date
      barTitleIfEmpty: 'Click to select a date',
      placeholder: 'Fecha de nacimiento', // <-- HTML input placeholder attribute (default: '')
      addClass: [''], // <-- Optional, value to pass on to [ngClass] on the input field
      //addStyle: ['', ''], // <-- Optional, value to pass to [ngStyle] on the input field
      fieldId: 'my-date-picker', // <-- ID to assign to the input field. Defaults to datepicker-<counter>
      useEmptyBarTitle: false, // <-- Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown

    };
  }
}
