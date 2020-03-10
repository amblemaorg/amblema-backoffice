import { Component, Input, AfterViewInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-type-company',
  templateUrl: './type-company.component.html',
  styles: []
})
export class TypeCompanyComponent implements AfterViewInit {

  @Input() typeCompany: AbstractControl | null = new FormControl();
  @Input() otherCompany: AbstractControl | null = new FormControl();
  
  @Input() submitted: boolean; 

  option: any = [
    { value: '1', label: 'Fabrica' },
    { value: '2', label: 'Tienda' },
    { value: '3', label: 'Negocio personal'  },
    { value: '4', label: 'Otro' }
  ]

  ngAfterViewInit(): void {
    this.typeCompany.setValue(null, [Validators.required])    
  }

  onSelectTypeCompany() {
    if ( this.typeCompany.value === this.option[3].value ) {
      this.otherCompany.setValidators([Validators.required]);
    } else { this.otherCompany.clearValidators(); }

    this.otherCompany.updateValueAndValidity();
  }

}
