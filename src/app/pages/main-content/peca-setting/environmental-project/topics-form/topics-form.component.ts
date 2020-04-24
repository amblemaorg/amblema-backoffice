import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Topic } from 'src/app/models/environmental-project.model';
import { AddTopic, EnvironmentalProjectState } from 'src/app/store/environmental-project.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-topics-form',
  templateUrl: './topics-form.component.html',
  styleUrls: ['./topics-form.component.scss']
})
export class TopicsFormComponent implements OnInit {

  @Select( EnvironmentalProjectState.topics ) topics$: Observable<Topic[]>;

  value: Topic;

  constructor( private store: Store ) { }

  ngOnInit() {}

  addTopic() {

    this.store.dispatch( new AddTopic({
      name: '',
      objectives: [],
      strategies: [],
      contents: []
    }));
  }
}
