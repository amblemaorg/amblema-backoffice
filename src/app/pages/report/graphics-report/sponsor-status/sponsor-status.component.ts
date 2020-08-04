import { Component, ChangeDetectorRef } from '@angular/core';
import { MathOlympicsReportComponent } from '../../math-olympics-report/math-olympics-report.component';
import { ChartAverage } from '../../_shared/_model/average-graph.model';
import { GraphPdfService } from '../../_shared/_service/graph-pdf.service';
import { MathOlympicsReportService } from 'src/app/services/report/math-olympics-report.service';
import { SponsorGraphicStatusService } from 'src/app/services/report/sponsor-graphic-status.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-sponsor-status',
  templateUrl: './sponsor-status.component.html',
  styleUrls: ['./sponsor-status.component.scss'],
})
export class SponsorStatusComponent extends MathOlympicsReportComponent {
  public data: ChartAverage[] = [];
  public showGraph = false;
  public showProgress = false;
  public delayGeneratePDF = false;

  status = [
    { label: 'Activo', value: '1' },
    { label: 'Inactivo', value: '2' },
  ];
  statusSelected = '1';

  constructor(
    public cd: ChangeDetectorRef,
    public mathOlympicsReportService: MathOlympicsReportService,
    private sponsorGraphicStatuService: SponsorGraphicStatusService,
    private pdfService: GraphPdfService
  ) {
    super(cd, mathOlympicsReportService);
  }

  // -- Event get data --
  onQueryGraph() {
    this.generateReset();
    // -- Request the data grapch --

    if (this.statusSelected === '1') {
      this.sponsorGraphicStatuService
        .getActiveSponsor(this.dateInitSelected.id, this.dateEndSelected.id)
        .subscribe((request: HttpEvent<any>) => {
          switch (request.type) {
            case HttpEventType.Response:
              this.prepareDataToShow(request.body.records);
              break;
          }
        });
    } else {
      this.sponsorGraphicStatuService
        .getInactiveSponsor(this.dateInitSelected.id, this.dateEndSelected.id)
        .subscribe((request: HttpEvent<any>) => {
          switch (request.type) {
            case HttpEventType.Response:
              this.prepareDataToShow(request.body.records);
              break;
          }
        });
    }
  }



  generateReset() {
    this.data = [];
    this.showProgress = true;
    this.showGraph = false;
    this.delayGeneratePDF = false;

  }

  private prepareDataToShow(records: any[]): void {
    records.forEach((item) => {
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
