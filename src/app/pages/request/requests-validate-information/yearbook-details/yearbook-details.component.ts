import { Component, OnInit, DoCheck, AfterViewChecked, AfterContentChecked, AfterViewInit, OnChanges } from '@angular/core';
import { InformationDetailsComponent } from '../information-details/information-details.component';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';
import { ChartAverage } from 'src/app/pages/report/_shared/_model/average-graph.model';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-yearbook-details',
  templateUrl: './yearbook-details.component.html',
  styleUrls: [`./yearbook-details.component.scss`],
})
export class YearbookDetailsComponent extends InformationDetailsComponent {
  public canEdit = new AuthService().isAllowed( ALL_ACTIONS.REQUEST_CONTENT_APPROVAL_EDIT );

  // -- For the chart --
  dataLogicLapseOne: ChartDataSets[] = [{
    data: [], label: 'Diagnóstico - Lógica'
  }];
  dataMathLapseOne: ChartDataSets[] = [{
    data: [], label: 'Diagnóstico - Matemáticas'
  }];
  dataReadingLapseOne: ChartDataSets[] = [{
    data: [], label: 'Diagnóstico - Lectura'
  }];
  labelLapseOne: Label[] = [];

  dataLogicLapseTwo: ChartDataSets[] = [{
    data: [], label: 'Diagnóstico - Lógica'
  }];
  dataMathLapseTwo: ChartDataSets[] = [{
    data: [], label: 'Diagnóstico - Matemáticas'
  }];
  dataReadingLapseTwo: ChartDataSets[] = [{
    data: [], label: 'Diagnóstico - Lectura'
  }];

  dataLogicLapseThree: ChartDataSets[] = [{
    data: [], label: 'Diagnóstico - Lógica'
  }];
  dataMathLapseThree: ChartDataSets[] = [{
    data: [], label: 'Diagnóstico - Matemáticas'
  }];
  dataReadingLapseThree: ChartDataSets[] = [{
    data: [], label: 'Diagnóstico - Lectura'
  }];

  constructor() {
    super(null, null, null);

    setTimeout(() => {
      if ( this.data ) {
            this.fillChart(this.data.detail.sections);
      }
      console.log( this.data );
    }, 100);
  }

  private fillChart( dataSections: any[] ) {

    dataSections.forEach( element => {

      this.labelLapseOne.push( `${element.grade} Grado - Sección ${element.name}` );
      this.dataLogicLapseOne[0].data.push(element.diagnostics.lapse1.operationsPerMinIndex);
      this.dataMathLapseOne[0].data.push(element.diagnostics.lapse1.multiplicationsPerMinIndex);
      this.dataReadingLapseOne[0].data.push(element.diagnostics.lapse1.wordsPerMinIndex);

      this.dataLogicLapseTwo[0].data.push(element.diagnostics.lapse2.operationsPerMinIndex);
      this.dataMathLapseTwo[0].data.push(element.diagnostics.lapse2.multiplicationsPerMinIndex);
      this.dataReadingLapseTwo[0].data.push(element.diagnostics.lapse2.wordsPerMinIndex);

      this.dataLogicLapseThree[0].data.push(element.diagnostics.lapse3.operationsPerMinIndex);
      this.dataMathLapseThree[0].data.push(element.diagnostics.lapse3.multiplicationsPerMinIndex);
      this.dataReadingLapseThree[0].data.push(element.diagnostics.lapse3.wordsPerMinIndex);


    } );
  }
}
