import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagnostic-report',
  templateUrl: './diagnostic-report.component.html',
  styleUrls: ['./diagnostic-report.component.scss']
})
export class DiagnosticReportComponent implements OnInit {

  schools: any = [
    { name: 'Escuela patricio', value: 'any' },
    { name: 'Escuela Mayorca', value: 'any' }
  ]

  constructor() { }

  ngOnInit() {
  }

}
