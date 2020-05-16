import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-report',
  templateUrl: './teacher-report.component.html',
  styleUrls: ['./teacher-report.component.scss']
})
export class TeacherReportComponent implements OnInit {

  status = [
    { label: 'Activo', value: '1' },
    { label: 'Inactivo', value: '0' },
  ];

  disabledBtn = false;

  statusSelected = '1';
  selectedAnnualConvention = null;

  constructor() { }

  ngOnInit() {
  }

}
