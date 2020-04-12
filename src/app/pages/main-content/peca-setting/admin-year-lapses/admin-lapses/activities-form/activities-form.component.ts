import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { StepsFormComponent } from 'src/app/pages/main-content/steps/steps-form/steps-form.component';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-activities-form',
  templateUrl: './activities-form.component.html',
  styleUrls: ['./activities-form.component.scss']
})
export class ActivitiesFormComponent extends StepsFormComponent implements OnInit {

  //form: FormGroup;

  // For list
  // objectives: string[] = []; 
  // MODE_LIST = ACTION.CREATE;
  // ID_ITEM: number;
  // ACTION = ACTION;

  constructor(
    public store: Store, 
    public toastr: CustomToastrService
    //private toastr: CustomToastrService,
    //private fb: FormBuilder
    ) {
      super( store, toastr);
    // this.form = this.fb.group({
    //   objectives: new FormControl(),
    //   checkedDescription: new FormControl(false),
    //   checkedFileAdmin: new FormControl(false),
    //   checkedVideo: new FormControl(false),
    //   checkedList: new FormControl(false),
    //   checkedFileClient: new FormControl(false),
    //   checkedDate: new FormControl(false)
    // });
  }

  ngOnInit(  ) {

  }

  // addObjective() {
  //   this.objectives = Object.assign([], this.objectives);

  //   if (this.objectives.length < 5) {
  //     this.objectives.push(this.form.controls.objectives.value);
  //     this.form.controls.objectives.reset();
  //   } else { this.toastr.error('Limite de registro', 'Solo se pueden registrar 5 objectivos'); }
  // }

  // onEditObjective(index: number): void {
  //   this.MODE_LIST = ACTION.EDIT;
  //   this.ID_ITEM = index;
  //   this.form.controls.objectives.setValue(this.objectives[index]);
  // }

  // onDeleteObjective(index: number): void {
  //   this.objectives = this.objectives.filter( (value, key) => key !== index );
  //   this.toastr.deleteRegister('Eliminado', 'Se ha eliminado el objetivo de la lista');
  // }

  // confirmAction() {
  //   this.objectives = Object.assign([], this.objectives);
  //   if (this.MODE_LIST === ACTION.EDIT) {
  //     this.objectives[this.ID_ITEM] = this.form.controls.objectives.value;
  //   }
  //   this.MODE_LIST = ACTION.CREATE;
  //   this.form.controls.objectives.reset();
  // }

}
