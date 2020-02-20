import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
})
export class GenericFormComponent implements OnInit {

  @Input() testimonials


  submitted = false;

  constructor() { }

  ngOnInit() {
  }

  onRegister() {
    this.submitted = true;
  }


}
