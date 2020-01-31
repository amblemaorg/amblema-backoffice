import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
})
export class GenericFormComponent implements OnInit {

  submitted = false;

  constructor() { }

  ngOnInit() {
  }

  onRegister() {
    this.submitted = true;
  }
}
