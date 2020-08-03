import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MathOlympicsReportService } from 'src/app/services/report/math-olympics-report.service';
import { MathOlympicsReportComponent } from '../../math-olympics-report/math-olympics-report.component';
import { ChartAverage } from '../../_shared/_model/average-graph.model';
import { GraphPdfService } from '../../_shared/_service/graph-pdf.service';
import { Select } from '@ngxs/store';
import { SchoolYearEnrolledState } from 'src/app/store/_enrolled/school-year-enrolled.action';
import { Observable } from 'rxjs';
import { EnrolledSchoolsService } from 'src/app/services/report/enrolled-schools.service';

@Component({
  selector: 'app-enrolled-schools-report',
  templateUrl: './enrolled-schools-report.component.html',
  styleUrls: ['./enrolled-schools-report.component.scss'],
  providers: [GraphPdfService],
})
export class EnrolledSchoolsReportComponent extends MathOlympicsReportComponent {
  data: ChartAverage[];

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
    // -- Request the data grapch --

    this.data = [
      {
        academicPeriod: ['2020', '2021'],
        coordinates: [
          {
            x: 2,
            y: 0,
          },
          {
            x: 8,
            y: 10,
          },
        ],
        total: 20
      },
      {
        academicPeriod: ['2021', '2022'],
        coordinates: [
          {
            x: 9,
            y: 17,
          },
          {
            x: 30,
            y: 2,
          },
        ],
        total: 20
      },
    ];

    this.enrolledSchoolService.getNumberActiveSchool( this.dateInitSelected.id ,  this.dateEndSelected.id ).subscribe( response => {

      console.log( response );
    } );
  }

  onGenerateDocument() {
    const data = document.getElementById('graphic'); // <-- Get html id
    this.pdfService.pdfOpen(data); // <-- Open in the browser
  }


  onSelectInitDate( event: any ) {
    this.dateEndSelected = null;
    if (event) {
      this.onChangeDateInit( event.id );
    }

  }
}
