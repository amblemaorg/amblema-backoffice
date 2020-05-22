import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MathOlympicsReportService } from 'src/app/services/report/math-olympics-report.service';
import { MathOlympicsReportComponent } from '../../math-olympics-report/math-olympics-report.component';

@Component({
  selector: 'app-enrolled-schools-report',
  templateUrl: './enrolled-schools-report.component.html',
  styleUrls: ['./enrolled-schools-report.component.scss'],
})
export class EnrolledSchoolsReportComponent extends MathOlympicsReportComponent {
  constructor(
    public cd: ChangeDetectorRef,
    public mathOlympicsReportService: MathOlympicsReportService,
  ) { super(cd, mathOlympicsReportService); }

  // -- Event get data --
  onQueryGraph() {




  }
}
