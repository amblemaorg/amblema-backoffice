import { Component, OnInit } from '@angular/core';
import { PDFReportMath } from './pdf-report-math.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-math-olympics-report',
  templateUrl: './math-olympics-report.component.html',
  styleUrls: ['./math-olympics-report.component.scss'],
  providers: [ PDFReportMath, DatePipe ]
})
export class MathOlympicsReportComponent implements OnInit {

  constructor( private generateReporte: PDFReportMath ) { }

  ngOnInit() {
  }

  onGenerateReport() {

    this.generateReporte.generateMathOlympics();

  }
}
