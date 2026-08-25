import { Component, ElementRef } from '@angular/core';
import { InformationDetailsComponent } from '../information-details/information-details.component';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { InformationRequestService } from 'src/app/services/request/information-request.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Store } from '@ngxs/store';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-yearbook-details',
  templateUrl: './yearbook-details.component.html',
  styleUrls: [`./yearbook-details.component.scss`],
})
export class YearbookDetailsComponent extends InformationDetailsComponent {
  public canEdit = new AuthService().isAllowed(
    ALL_ACTIONS.REQUEST_CONTENT_APPROVAL_EDIT
  );

  // -- For the chart --
  dataLogicLapseOne: ChartDataSets[] = [
    {
      data: [],
      label: 'Diagnóstico - Lógica',
    },
  ];
  dataMathLapseOne: ChartDataSets[] = [
    {
      data: [],
      label: 'Diagnóstico - Matemáticas',
    },
  ];
  dataReadingLapseOne: ChartDataSets[] = [
    {
      data: [],
      label: 'Diagnóstico - Lectura',
    },
  ];
  labelLapseOne: Label[] = [];

  dataLogicLapseTwo: ChartDataSets[] = [
    {
      data: [],
      label: 'Diagnóstico - Lógica',
    },
  ];
  dataMathLapseTwo: ChartDataSets[] = [
    {
      data: [],
      label: 'Diagnóstico - Matemáticas',
    },
  ];
  dataReadingLapseTwo: ChartDataSets[] = [
    {
      data: [],
      label: 'Diagnóstico - Lectura',
    },
  ];

  dataLogicLapseThree: ChartDataSets[] = [
    {
      data: [],
      label: 'Diagnóstico - Lógica',
    },
  ];
  dataMathLapseThree: ChartDataSets[] = [
    {
      data: [],
      label: 'Diagnóstico - Matemáticas',
    },
  ];
  dataReadingLapseThree: ChartDataSets[] = [
    {
      data: [],
      label: 'Diagnóstico - Lectura',
    },
  ];

  constructor(
    public bsModalRef?: BsModalRef,
    public modalService?: BsModalService,
    public elem?: ElementRef,
    public serviceRequestStepApproval?: InformationRequestService,
    public store?: Store,
    public toastr?: CustomToastrService
  ) {
    super();
    setTimeout(() => {
      if (this.data && this.data.detail) {
        this.fillChart(this.data.detail);
      }
    }, 100);
  }

  getLapseSummary(detail: any, lapseKey: string): any[] {
    if (!detail) return [];
    if (detail[lapseKey]?.diagnosticSummary?.length) {
      return detail[lapseKey].diagnosticSummary;
    }
    return detail.sections || [];
  }

  private fillChart(detail: any) {
    if (!detail) return;

    this.labelLapseOne = [];
    this.dataLogicLapseOne[0].data = [];
    this.dataMathLapseOne[0].data = [];
    this.dataReadingLapseOne[0].data = [];

    this.dataLogicLapseTwo[0].data = [];
    this.dataMathLapseTwo[0].data = [];
    this.dataReadingLapseTwo[0].data = [];

    this.dataLogicLapseThree[0].data = [];
    this.dataMathLapseThree[0].data = [];
    this.dataReadingLapseThree[0].data = [];

    const lapse1Summary = detail.lapse1?.diagnosticSummary || [];
    const lapse2Summary = detail.lapse2?.diagnosticSummary || [];
    const lapse3Summary = detail.lapse3?.diagnosticSummary || [];

    if (lapse1Summary.length > 0) {
      lapse1Summary.forEach((item) => {
        const gradeStr = item.grade === '0' ? 'Preescolar' : `${item.grade} Grado`;
        this.labelLapseOne.push(`${gradeStr} - Sección ${item.name}`);
        this.dataLogicLapseOne[0].data.push(item.operationsPerMinIndex ?? 0);
        this.dataMathLapseOne[0].data.push(item.multiplicationsPerMinIndex ?? 0);
        this.dataReadingLapseOne[0].data.push(item.wordsPerMinIndex ?? 0);
      });
    } else if (detail.sections && Array.isArray(detail.sections)) {
      detail.sections.forEach((element) => {
        const gradeStr = element.grade === '0' ? 'Preescolar' : `${element.grade} Grado`;
        this.labelLapseOne.push(`${gradeStr} - Sección ${element.name}`);
        this.dataLogicLapseOne[0].data.push(
          element.diagnostics?.lapse1?.operationsPerMinIndex ?? 0
        );
        this.dataMathLapseOne[0].data.push(
          element.diagnostics?.lapse1?.multiplicationsPerMinIndex ?? 0
        );
        this.dataReadingLapseOne[0].data.push(
          element.diagnostics?.lapse1?.wordsPerMinIndex ?? 0
        );
      });
    }

    if (lapse2Summary.length > 0) {
      lapse2Summary.forEach((item) => {
        this.dataLogicLapseTwo[0].data.push(item.operationsPerMinIndex ?? 0);
        this.dataMathLapseTwo[0].data.push(item.multiplicationsPerMinIndex ?? 0);
        this.dataReadingLapseTwo[0].data.push(item.wordsPerMinIndex ?? 0);
      });
    } else if (detail.sections && Array.isArray(detail.sections)) {
      detail.sections.forEach((element) => {
        this.dataLogicLapseTwo[0].data.push(
          element.diagnostics?.lapse2?.operationsPerMinIndex ?? 0
        );
        this.dataMathLapseTwo[0].data.push(
          element.diagnostics?.lapse2?.multiplicationsPerMinIndex ?? 0
        );
        this.dataReadingLapseTwo[0].data.push(
          element.diagnostics?.lapse2?.wordsPerMinIndex ?? 0
        );
      });
    }

    if (lapse3Summary.length > 0) {
      lapse3Summary.forEach((item) => {
        this.dataLogicLapseThree[0].data.push(item.operationsPerMinIndex ?? 0);
        this.dataMathLapseThree[0].data.push(item.multiplicationsPerMinIndex ?? 0);
        this.dataReadingLapseThree[0].data.push(item.wordsPerMinIndex ?? 0);
      });
    } else if (detail.sections && Array.isArray(detail.sections)) {
      detail.sections.forEach((element) => {
        this.dataLogicLapseThree[0].data.push(
          element.diagnostics?.lapse3?.operationsPerMinIndex ?? 0
        );
        this.dataMathLapseThree[0].data.push(
          element.diagnostics?.lapse3?.multiplicationsPerMinIndex ?? 0
        );
        this.dataReadingLapseThree[0].data.push(
          element.diagnostics?.lapse3?.wordsPerMinIndex ?? 0
        );
      });
    }
  }
}
