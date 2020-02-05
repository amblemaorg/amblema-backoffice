import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-special-toggle',
  templateUrl: './special-toggle.component.html',
  styleUrls: ['./special-toggle.component.scss']
})
export class SpecialToggleComponent implements OnInit {

  @Input() value: any;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  onclick() {
    alert('Hizo click')
  }

}
