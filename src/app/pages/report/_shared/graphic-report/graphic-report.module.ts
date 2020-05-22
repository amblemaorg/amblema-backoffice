import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuarterlyGraphComponent } from './quarterly-graph/quarterly-graph.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [QuarterlyGraphComponent],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [QuarterlyGraphComponent]
})
export class GraphicReportModule { }
