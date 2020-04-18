import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagnostic-radio',
  templateUrl: './diagnostic-radio.component.html',
  styleUrls: ['./diagnostic-radio.component.scss']
})
export class DiagnosticRadioComponent implements OnInit {

  options = [
    { value: '1', label: 'Diagnóstico de lectura' },
    { value: '2', label: 'Diagnóstico de multiplicación' },
    { value: '3', label: 'Diagnósticos de razonamiento Lógico - Matemático' },
  ];
  option = this.options[0].value;

  constructor() { }

  ngOnInit() {
  }

}
