import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-levels-form',
  templateUrl: './levels-form.component.html',
  styleUrls: ['./levels-form.component.scss']
})
export class LevelsFormComponent implements OnInit {

  @Input() indexTopic: number; // <-- Index Topic
  @Input() index: number; // <-- Index level

  options = [
    { value: false, label: 'Preescolar' }, // <-- Prescolar
    { value: false, label: 'Primer grado' }, // <-- Primer grado
    { value: false, label: 'Segundo grado' }, // <-- Segundo grado
    { value: false, label: 'Tercer grado' }, // <-- Tercer grado
    { value: false, label: 'Cuarto grado' }, // <-- Cuarto grado
    { value: false, label: 'Quinto grado' }, // <-- Quinto grado
    { value: false, label: 'Sexto grado' }, // <-- Sexto grado
  ];

  constructor() { }

  ngOnInit() {
  }
}
