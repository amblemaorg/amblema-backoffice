import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-type-company',
  templateUrl: './type-company.component.html',
  styles: []
})
export class TypeCompanyComponent implements AfterViewInit, OnInit {

  @Input() companyType: AbstractControl | null = new FormControl();
  @Input() companyOtherType: AbstractControl | null = new FormControl();

  @Input() submitted: boolean;

  option: any = [
    { value: '1', label: 'Fabrica' },
    { value: '2', label: 'Tienda' },
    { value: '3', label: 'Negocio personal' },
    { value: '4', label: 'Hacienda' },
    { value: '5', label: 'Otro' }
  ];

  ngOnInit(): void {
    this.companyType.setValidators([Validators.required]);
    this.companyType.updateValueAndValidity();

  }

  ngAfterViewInit(): void {

  }

  onSelectTypeCompany() {

    if (this.companyType.value === this.option[4].value) {
      this.companyOtherType.setValidators([Validators.required]);
    } else {
      this.companyOtherType.setValue('');
      this.companyOtherType.setValidators([]); }
    this.companyOtherType.updateValueAndValidity();
  }
}
