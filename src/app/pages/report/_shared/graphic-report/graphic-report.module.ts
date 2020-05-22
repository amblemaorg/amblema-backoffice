import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuarterlyGraphComponent } from './quarterly-graph/quarterly-graph.component';

@NgModule({
  declarations: [QuarterlyGraphComponent],
  imports: [
    CommonModule
  ],
  exports: [QuarterlyGraphComponent]
})
export class GraphicReportModule { }
