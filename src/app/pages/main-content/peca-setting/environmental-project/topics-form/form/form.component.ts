import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddSchoolLevel } from 'src/app/store/environmental-project.action';
import { Level } from 'src/app/models/environmental-project.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() levels: Array<Level>; // <-- Obtain the school levels according to the topic
  @Input() index: number; // <-- This is the topic indexing

  constructor(private store: Store) { }

  ngOnInit() {}

  addLevel() {

    this.store.dispatch(new AddSchoolLevel({
      target: [],
      week: [],
      duration: '',
      techniques: [],
      activities: [],
      resources: [],
      evaluations: [],
      supportMaterial: [],
    }, this.index));
  }
}
