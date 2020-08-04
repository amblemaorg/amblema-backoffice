import { Component, ChangeDetectorRef } from '@angular/core';
import { MathOlympicsReportService } from 'src/app/services/report/math-olympics-report.service';
import { MathOlympicsReportComponent } from '../../math-olympics-report/math-olympics-report.component';
import { ChartAverage } from '../../_shared/_model/average-graph.model';
import { GraphPdfService } from '../../_shared/_service/graph-pdf.service';
import { Select } from '@ngxs/store';
import { SchoolYearEnrolledState } from 'src/app/store/_enrolled/school-year-enrolled.action';
import { Observable } from 'rxjs';
import { EnrolledSchoolsService } from 'src/app/services/report/enrolled-schools.service';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { SchoolYearEnrolled } from 'src/app/_models/_enrolled/school-year.model';

@Component({
  selector: 'app-enrolled-schools-report',
  templateUrl: './enrolled-schools-report.component.html',
  styleUrls: ['./enrolled-schools-report.component.scss'],
  providers: [GraphPdfService],
})
export class EnrolledSchoolsReportComponent extends MathOlympicsReportComponent {
  public data: ChartAverage[] = [];
  public showGraph = false;
  public showProgress = false;
  public delayGeneratePDF = false;

  @Select(SchoolYearEnrolledState.schoolYearsEnrolled)
  data$: Observable<SchoolYearEnrolled[]>;

  constructor(
    public cd: ChangeDetectorRef,
    public mathOlympicsReportService: MathOlympicsReportService,
    private pdfService: GraphPdfService,
    private enrolledSchoolService: EnrolledSchoolsService
  ) {
    super(cd, mathOlympicsReportService);
  }

  // -- Event get data --
  onQueryGraph() {
    this.showProgress = true;

    // -- Request the data grapch --

    this.enrolledSchoolService
      .getNumberActiveSchool(this.dateInitSelected.id, this.dateEndSelected.id)
      .subscribe(
        (request: HttpEvent<any>) => {
          switch (request.type) {
            case HttpEventType.Response:
              request.body.records.forEach((item) => {
                this.data.push({
                  academicPeriod: [
                    item.academicPeriodYears[0],
                    item.academicPeriodYears[1],
                  ],
                  coordinates: [
                    {
                      x: 0,
                      y: item.trimesterOne,
                    },
                    {
                      x: 1,
                      y: item.trimesterTwo,
                    },
                    {
                      x: 2,
                      y: item.trimesterThree,
                    },
                    {
                      x: 3,
                      y: item.trimesterFour,
                    },
                  ],
                });
              });

              setTimeout(() => {
                this.showGraph = true;
                this.showProgress = false;
              }, 2500);
              break;
          }
        },
        () => {
          this.showProgress = false;
          this.showGraph = false;
        }
      );
  }

  onGenerateDocument() {
    this.delayGeneratePDF = true;

    const data = document.getElementById('graphic'); // <-- Get html id
    this.pdfService.pdfOpen(data); // <-- Open in the browser

    setTimeout(() => {

      this.delayGeneratePDF = false;
      this.cd.detectChanges();
    }, 3000);
  }

  onSelectInitDate(event: any) {
    this.dateEndSelected = null;
    if (event) {
      this.onChangeDateInit(event.id);
    }
  }
}
