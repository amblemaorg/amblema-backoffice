import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() index: number;

  levels = [{ name: 'Grados'  }];

  constructor( ) { }

  ngOnInit() {}

  addLevel() {
    this.levels.push({ name: 'Grados' }); }
}
