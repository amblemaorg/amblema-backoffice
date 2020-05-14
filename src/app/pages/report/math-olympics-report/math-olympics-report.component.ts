import { Component, OnInit, OnDestroy } from '@angular/core';
import { PDFReportMath } from './pdf-report-math.service';
import { DatePipe } from '@angular/common';
import { MathOlympicsReportService } from 'src/app/services/report/math-olympics-report.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-math-olympics-report',
  templateUrl: './math-olympics-report.component.html',
  styleUrls: ['./math-olympics-report.component.scss'],
  providers: [ PDFReportMath, DatePipe ]
})
export class MathOlympicsReportComponent implements OnInit, OnDestroy {

  subscriptionService: Subscription;

  constructor(
    private mathOlympicsReportService: MathOlympicsReportService,
    private generateReporte: PDFReportMath ) { }

  ngOnInit() {
    this.subscriptionService = this.mathOlympicsReportService.getSchoolYears().subscribe( response => {
      console.log( response );
    }, (err) => console.log(err));
  }

  ngOnDestroy(): void {
    if ( this.subscriptionService ) { this.subscriptionService.unsubscribe(); }
  }

  onGenerateReport() {

    this.generateReporte.generateMathOlympics();

  }
}
