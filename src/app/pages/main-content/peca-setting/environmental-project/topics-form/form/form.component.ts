import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddSchoolLevel } from 'src/app/store/environmental-project.action';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {


  @Input() index: number; // <-- This is the topic indexing

  levels = [{ name: 'Grados'  }];

  constructor(  private store: Store ) { }

  ngOnInit() {}

  addLevel() {
    this.store.dispatch( new AddSchoolLevel( null, 0 ) );
  }
}