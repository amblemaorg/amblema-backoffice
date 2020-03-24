import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-activities-form',
  templateUrl: './activities-form.component.html',
  styleUrls: ['./activities-form.component.scss']
})
export class ActivitiesFormComponent implements OnInit {

  form: FormGroup;

  constructor( private fb : FormBuilder ) {
    this.form = this.fb.group({
      checkedDescription: new FormControl(false), 
      checkedFileAdmin: new FormControl(false), 
      checkedVideo: new FormControl(false),
      checkedList: new FormControl(false),
      checkedFileClient: new FormControl(false)
    });
  }

  ngOnInit() {
  }

}
