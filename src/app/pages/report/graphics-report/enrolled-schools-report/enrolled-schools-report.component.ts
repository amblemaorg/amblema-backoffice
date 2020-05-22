import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MathOlympicsReportService } from 'src/app/services/report/math-olympics-report.service';
import { MathOlympicsReportComponent } from '../../math-olympics-report/math-olympics-report.component';
import { ChartAverage } from '../../_shared/_model/average-graph.model';


@Component({
  selector: 'app-enrolled-schools-report',
  templateUrl: './enrolled-schools-report.component.html',
  styleUrls: ['./enrolled-schools-report.component.scss'],

})
export class EnrolledSchoolsReportComponent extends MathOlympicsReportComponent {
  data: ChartAverage[];

  constructor(
    public cd: ChangeDetectorRef,
    public mathOlympicsReportService: MathOlympicsReportService
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
      },
    ];
  }
}
