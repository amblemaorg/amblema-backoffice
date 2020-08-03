import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectAcademicPeriodComponent } from './select-academic-period/select-academic-period.component';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [SelectAcademicPeriodComponent],
  imports: [
    CommonModule,
    NgSelectModule,
  ],
  exports: [ SelectAcademicPeriodComponent ]
})
export class AcademicPeriodHelperModule { }
