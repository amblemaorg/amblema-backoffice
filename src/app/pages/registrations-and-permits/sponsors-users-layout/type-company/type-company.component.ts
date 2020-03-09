import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-type-company',
  templateUrl: './type-company.component.html',
  styles: []
})
export class TypeCompanyComponent implements OnInit {

  @Input() typeCompany: AbstractControl | null = new FormControl();
  @Input() otherCompany: AbstractControl | null = new FormControl();
  
  option: any = [
    { }
  ]

  ngOnInit() {
    this.typeCompany.setValue(null, [Validators.required])
  }

}
