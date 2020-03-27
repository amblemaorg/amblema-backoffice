import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { ItemCheck } from 'src/app/models/step.model';

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
  checklist: ItemCheck[] = []; // Objective list
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
      // Optional
      hasText: new FormControl(false),
      hasDate: new FormControl(false),
      hasFile: new FormControl(false),
      hasVideo: new FormControl(false),
      hasChecklist: new FormControl(false),
      // ---------------------
      
      // Optional inputs show
      checklist: new FormControl(),
      
    });
  }

  ngOnInit() {}

  addObjective() {
    this.checklist = Object.assign([], this.checklist);

    if (this.checklist.length < 5) {
      this.checklist.push({name: this.form.controls.checklist.value });
      this.form.controls.checklist.reset();
    } else { this.toastr.error('Limite de registro', 'Solo se pueden registrar 5 objectivos'); }
  }

  onEditObjective(index: number): void {
    this.MODE_LIST = ACTION.EDIT;
    this.ID_ITEM = index;
    this.form.controls.checklist.setValue(this.checklist[index].name);
  }

  onDeleteObjective(index: number): void {
    this.ID_ITEM = index;
    this.checklist = this.checklist.filter(e => e.name !== this.checklist[this.ID_ITEM].name);
    this.toastr.deleteRegister('Eliminado', 'Se ha eliminado el objetivo de la lista');
  }

  confirmAction() {
    this.checklist = Object.assign([], this.checklist);
    if (this.MODE_LIST === ACTION.EDIT) {
      this.checklist[this.ID_ITEM].name = this.form.controls.checklist.value;
    }
    this.MODE_LIST = ACTION.CREATE;
    this.form.controls.checklist.reset();
  }
}

export const KIND_STEP = {
  GENERAL: 'General',
  COORDINATOR: 'Coordinator',
  SPONSOR: 'Sponsor',
  SCHOOL: 'School'
};
