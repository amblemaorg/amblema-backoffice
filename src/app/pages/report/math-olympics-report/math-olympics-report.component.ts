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
  public dateInitSelected: any = null;
  public dateEndSelected: any = null;

  public datesInit = new Array<any>();
  public datesEnd = new Array<any>();

  subscriptionService: Subscription;

  disabledBtn = false;


  constructor(
    public cd: ChangeDetectorRef,
    public mathOlympicsReportService: MathOlympicsReportService,
    private generateReporte?: PDFReportMath
  ) {}

  public ngOnInit() {
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

  public onChangeDateInit(event: any) {

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
