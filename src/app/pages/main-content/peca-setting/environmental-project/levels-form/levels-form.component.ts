import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-levels-form',
  templateUrl: './levels-form.component.html',
  styleUrls: ['./levels-form.component.scss']
})
export class LevelsFormComponent implements OnInit {

  @Input() index: number;

  options = [

    { value: '1', label: 'Preescolar' },
    { value: '2', label: 'Primer grado' },
    { value: '3', label: 'Segundo grado' },
    { value: '4', label: 'Tercer grado' },
    { value: '5', label: 'Cuarto grado' },

    { value: '6', label: 'Quinto grado' },
    { value: '7', label: 'Sexto grado' },

  ];


  constructor() { }

  ngOnInit() {
  }

}
