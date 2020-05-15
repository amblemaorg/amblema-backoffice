import { Component, OnInit, OnDestroy } from "@angular/core";
import { PDFReportMath } from "./pdf-report-math.service";
import { DatePipe } from "@angular/common";
import { MathOlympicsReportService } from "src/app/services/report/math-olympics-report.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-math-olympics-report",
  templateUrl: "./math-olympics-report.component.html",
  styleUrls: ["./math-olympics-report.component.scss"],
  providers: [PDFReportMath, DatePipe],
})
export class MathOlympicsReportComponent implements OnInit, OnDestroy {
  dateInitSelected: any = null;
  dateEndSelected: any = null;

  datesInit = new Array<any>();
  datesEnd = new Array<any>();

  subscriptionService: Subscription;

  constructor(
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
    this.generateReporte.generateMathOlympics();
  }

  onChangeDateInit(event: any) {
    let position: any;

    this.datesInit.forEach((value, index) => {
      if (value.id === event) {
        position = index;
      }
    });

    this.datesEnd = this.datesInit.filter( (value, index) => position < index );  

    if( !this.datesEnd.length ) this.dateEndSelected = null;
  }
}
