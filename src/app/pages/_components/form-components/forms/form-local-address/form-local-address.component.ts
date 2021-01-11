import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-local-address',
  templateUrl: './form-local-address.component.html',
  styleUrls: ['./form-local-address.component.scss']
})
export class FormLocalAddressComponent implements OnInit {

  @Input() state: AbstractControl | null = new FormControl();
  @Input() municipality: AbstractControl | null = new FormControl();

  selectedCar: number;

  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
