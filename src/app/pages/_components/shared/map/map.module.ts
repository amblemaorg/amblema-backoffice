import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoMapComponent } from './geo-map/geo-map.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [GeoMapComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyCwPUm3Rnxmi3klwT1Qg4Z2AK0dBLG_xxx',
       apiKey: 'AIzaSyCwPUm3Rnxmi3klwT1Qg4Z2AK0dBLG_yrs',
      libraries: ['places'],
    }),
  ],
  exports: [GeoMapComponent],
})
export class MapModule {}
