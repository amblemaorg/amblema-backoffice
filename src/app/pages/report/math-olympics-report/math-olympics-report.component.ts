import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PDFReportMath } from './pdf-report-math.service';
import { DatePipe } from '@angular/common';
import { MathOlympicsReportService } from 'src/app/services/report/math-olympics-report.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-math-olympics-report',
  templateUrl: './math-olympics-report.component.html',
  styleUrls: ['./math-olympics-report.component.scss'],
  providers: [PDFReportMath, DatePipe],
})
export class MathOlympicsReportComponent implements OnInit, OnDestroy {
  dateInitSelected: any = null;
  dateEndSelected: any = null;

  datesInit = new Array<any>();
  datesEnd = new Array<any>();

  subscriptionService: Subscription;

  disabledBtn = false;


  constructor(
    private cd: ChangeDetectorRef,
    private mathOlympicsReportService: MathOlympicsReportService,
    private generateReporte: PDFReportMath
  ) {}

  async ngOnInit() {
    this.subscriptionService = this.mathOlympicsReportService
      .getSchoolYears()
      .subscribe((response) => {
        this.datesInit = response;
        this.datesEnd = response;
      });
  }

  async ngOnDestroy() {
    if (this.subscriptionService) {
      this.subscriptionService.unsubscribe();
    }
  }

  onGenerateReport() {
    this.disabledBtn = true;

    this.subscriptionService = this.mathOlympicsReportService
      .getMathOlympicsReport(this.dateInitSelected, this.dateEndSelected)
      .subscribe((response) => {

        this.generateReporte.generateMathOlympics(response);

        setTimeout(() => {
          this.disabledBtn = false;
          this.cd.detectChanges();
        }, 3500);
      }, () => this.disabledBtn = false);

  }

  onChangeDateInit(event: any) {
    let position: any;

    this.datesInit.forEach((value, index) => {
      if (value.id === event) {
        position = index;
      }
    });

    this.datesEnd = this.datesInit.filter((value, index) => position < index);

    if (!this.datesEnd.length) { this.dateEndSelected = null; }
  }
}
