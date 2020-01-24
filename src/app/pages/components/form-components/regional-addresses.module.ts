import { NgModule } from '@angular/core';
import { RegionalAddressesComponent } from './form-backup/regional-addresses/regional-addresses.component';
import { CommonModule } from '@angular/common';
import { FormComponentModule } from './form-component.module';
import { NbInputModule } from '@nebular/theme';

@NgModule({
    imports: [
        CommonModule,
        FormComponentModule,
        NbInputModule
    ],
    exports: [
        RegionalAddressesComponent
    ],
    declarations: [
        RegionalAddressesComponent
    ],
    providers: [],
})
export class RegionalAddressesModule { }
