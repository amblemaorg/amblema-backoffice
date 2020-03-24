import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-steps-form',
  templateUrl: './steps-form.component.html',
  styles: []
})
export class StepsFormComponent implements OnInit {

  @Input() id: string;
  @Input() title: string;
  @Input() kind: string;

  form: FormGroup;
  // For list
  objectives: string[] = []; // Objective list
  MODE_LIST = ACTION.CREATE;
  ID_ITEM: number;
  ACTION = ACTION;

  options = [
    { value: true, label: 'Si' },
    { value: false, label: 'No' },
  ];

  constructor(
    private toastr: CustomToastrService,
    private fb: FormBuilder ) {
    this.form = this.fb.group({
      objectives: new FormControl(),
      checkedDescription: new FormControl(false),
      checkedDate: new FormControl(false),
      checkedFile: new FormControl(false),
      checkedVideo: new FormControl(false),
      checkedList: new FormControl(false)
    });
  }

  ngOnInit() {}

  addObjective() {
    this.objectives = Object.assign([], this.objectives);

    if (this.objectives.length < 5) {
      this.objectives.push(this.form.controls.objectives.value);
      this.form.controls.objectives.reset();
    } else { this.toastr.error('Limite de registro', 'Solo se pueden registrar 5 objectivos'); }
  }

  onEditObjective(index: number): void {
    this.MODE_LIST = ACTION.EDIT;
    this.ID_ITEM = index;
    this.form.controls.objectives.setValue(this.objectives[index]);
  }

  onDeleteObjective(index: number): void {
    this.ID_ITEM = index;
    this.objectives = this.objectives.filter(e => e !== this.objectives[this.ID_ITEM]);
    this.toastr.deleteRegister('Eliminado', 'Se ha eliminado el objetivo de la lista');
  }

  confirmAction() {
    this.objectives = Object.assign([], this.objectives);
    if (this.MODE_LIST === ACTION.EDIT) {
      this.objectives[this.ID_ITEM] = this.form.controls.objectives.value;
    }
    this.MODE_LIST = ACTION.CREATE;
    this.form.controls.objectives.reset();
  }


}

export const KIND_STEP = {
  GENERAL: 'General',
  COORDINATOR: 'Coordinator',
  SPONSOR: 'Sponsor',
  SCHOOL: 'School'
};
