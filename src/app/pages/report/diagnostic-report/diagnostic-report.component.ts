import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagnostic-report',
  templateUrl: './diagnostic-report.component.html',
  styleUrls: ['./diagnostic-report.component.scss']
})
export class DiagnosticReportComponent implements OnInit {

  schools = [
    { id: 1, name: '' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys' },
    { id: 4, name: 'Pabradė' },
    { id: 5, name: 'Klaipėda' }
  ];

  selectedSchool;

  diagnostics = [
    { label: 'Matemática', value : false },
    { label: 'Lectura', value: false },
    { label: 'Lógica', value: false }
  ];

  oneCheck = false;

  year = [
    { id: 1, name: '2020' },
    { id: 2, name: '2021' },
    { id: 3, name: '2023' },
    { id: 4, name: '2025' },
    { id: 5, name: '2029' }
  ];

  selectedYear;


  constructor() { }

  ngOnInit() {
  }

}
