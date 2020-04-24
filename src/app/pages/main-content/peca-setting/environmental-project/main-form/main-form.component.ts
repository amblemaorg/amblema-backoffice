import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SelectLapse } from 'src/app/store/environmental-project.action';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent implements OnInit {

  options = [
    { value: '1', label: 'Primer lapso' },
    { value: '2', label: 'Segundo lapso' },
    { value: '3', label: 'Tercer lapso' },
  ];

  option = this.options[0].value;

  
  constructor( private store: Store ) { }

  ngOnInit() {}

  onSelectLapse(item: string) {
    this.store.dispatch( new SelectLapse(item) );
  }
}
