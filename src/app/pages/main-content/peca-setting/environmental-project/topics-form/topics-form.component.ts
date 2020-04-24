import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-topics-form',
  templateUrl: './topics-form.component.html',
  styleUrls: ['./topics-form.component.scss']
})
export class TopicsFormComponent implements OnInit {

  topics = [{ name: 'Proyecto ambienta' }];

  constructor() { }

  ngOnInit() {
  }

  addTopics() {
    this.topics.push({ name: 'Nuevo tema' });
  }

}
