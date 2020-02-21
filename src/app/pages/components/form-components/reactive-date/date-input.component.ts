import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-input',
  template: `
    <input [nbDatepicker]="datepicker">
    <nb-datepicker #datepicker></nb-datepicker>
  `,
  styles: []
})
export class DateInputComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
