import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressMapComponent } from './address-map/address-map.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [AddressMapComponent],
  exports: [ AddressMapComponent ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDCuVETbjUm2LfzETboUAlEeub2r38f7IM',
      libraries: ['places']
    })
  ]
})
export class MapModule { }
