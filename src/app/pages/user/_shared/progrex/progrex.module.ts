import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgrexBarComponent } from './progrex-bar/progrex-bar.component';
import { NbProgressBarModule } from '@nebular/theme';



@NgModule({
  declarations: [ProgrexBarComponent],
  imports: [
    CommonModule,
    NbProgressBarModule,
  ]
})
export class ProgrexModule { }
