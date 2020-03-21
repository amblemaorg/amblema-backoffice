import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-steps-form',
  templateUrl: './steps-form.component.html',
  styles: []
})
export class StepsFormComponent implements OnInit {

  @Input() id:string; 
  @Input() title:string;

  constructor() { }

  ngOnInit() {
  }

}
