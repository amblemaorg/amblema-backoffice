import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetEnvironmentalProject } from 'src/app/store/environmental-project.action';

@Component({
  selector: 'app-environmental-project',
  templateUrl: './environmental-project.component.html',
  styleUrls: ['./environmental-project.component.scss']
})
export class EnvironmentalProjectComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetEnvironmentalProject());
  }

}
