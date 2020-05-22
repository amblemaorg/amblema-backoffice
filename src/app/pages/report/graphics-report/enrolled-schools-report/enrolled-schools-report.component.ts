import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MathOlympicsReportService } from 'src/app/services/report/math-olympics-report.service';
import { MathOlympicsReportComponent } from '../../math-olympics-report/math-olympics-report.component';
import { ChartAverage } from '../../_shared/_model/average-graph.model';
import { GraphPdfService } from '../../_shared/_service/graph-pdf.service';


@Component({
  selector: 'app-enrolled-schools-report',
  templateUrl: './enrolled-schools-report.component.html',
  styleUrls: ['./enrolled-schools-report.component.scss'],
  providers: [ GraphPdfService ]
})
export class EnrolledSchoolsReportComponent extends MathOlympicsReportComponent {
  data: ChartAverage[];
  @ViewChild('graphic', { static: false }) htmlData:ElementRef;

  constructor(
    public cd: ChangeDetectorRef,
    public mathOlympicsReportService: MathOlympicsReportService,
    private pdfService: GraphPdfService
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

  onGenerateDocument() {
    console.log( this.htmlData )
    this.pdfService.pdfOpen(this.htmlData);

  }
}
