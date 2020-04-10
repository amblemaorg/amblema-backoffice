import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { LapseActivitiesService } from 'src/app/services/lapse-activities.service';

@Component({
  selector: 'app-special-toggle',
  templateUrl: './special-toggle.component.html',
  styleUrls: ['./special-toggle.component.scss']
})
export class SpecialToggleComponent implements OnInit {

  @Input() value: any;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  control: AbstractControl | null = new FormControl();

  constructor(
    private lapseActivityService: LapseActivitiesService
  ) {}

  ngOnInit() {

  }

  onclick() {
    console.log( this.value );
    console.log( this.rowData )
  }
}
