import { Component, ChangeDetectorRef } from '@angular/core';
import { MathOlympicsReportComponent } from '../../math-olympics-report/math-olympics-report.component';
import { ChartAverage } from '../../_shared/_model/average-graph.model';
import { GraphPdfService } from '../../_shared/_service/graph-pdf.service';
import { MathOlympicsReportService } from 'src/app/services/report/math-olympics-report.service';

@Component({
  selector: 'app-sponsor-status',
  templateUrl: './sponsor-status.component.html',
  styleUrls: ['./sponsor-status.component.scss']
})
export class SponsorStatusComponent extends MathOlympicsReportComponent {

  data: ChartAverage[];

  status = [{ label: 'Activo', value: '1' }, { label: 'Inactivo', value: '2' }];
  statusSelected = '1';

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
  }

  onGenerateDocument() {
    const data = document.getElementById('graphic'); // <-- Get html id
    this.pdfService.pdfOpen(data); // <-- Open in the browser
  }
}
