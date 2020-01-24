import { NgModule } from '@angular/core';
import { RegionalAddressesComponent } from './regional-addresses/regional-addresses.component';
import { CommonModule } from '@angular/common';
import { SharedFormsModule } from './shared-forms.module';
import { NbInputModule } from '@nebular/theme';

@NgModule({
    imports: [
        CommonModule,
        SharedFormsModule,
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
