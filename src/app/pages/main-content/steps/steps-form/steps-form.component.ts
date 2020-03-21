import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-steps-form',
  templateUrl: './steps-form.component.html',
  styles: []
})
export class StepsFormComponent implements OnInit {

  @Input() id: string;
  @Input() title: string;
  @Input() kind: string;

  options = [
    { value: true, label: 'Si' },
    { value: false, label: 'No' },
  ];

  constructor() { }

  ngOnInit() {}

}

export const KIND_STEP = {
  GENERAL: 'General',
  COORDINATOR: 'Coordinator',
  SPONSOR: 'Sponsor',
  SCHOOL: 'School'
};
