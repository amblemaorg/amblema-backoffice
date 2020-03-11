import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AbtractStepForm } from '../abstract.step.form';
import { Store, Select } from '@ngxs/store';
import { FormControl, Validators } from '@angular/forms';
import { LearningState, SetLearningOne } from 'src/app/store/learning.action';
import { Observable, Subscription } from 'rxjs';
import { Learning } from 'src/app/models/learning.model';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styles: []
})
export class GeneralFormComponent extends AbtractStepForm implements OnInit, OnDestroy, OnChanges {

  @Select(LearningState.learning) data$: Observable<Learning>;
  subscription: Subscription;

  objectives: string[] = []; // Objective list

  submitted = false;

  // This is for list objectives
  MODE_LIST = ACTION.CREATE;
  ID_ITEM: number;

  constructor(
    public router: Router,
    private toastr: CustomToastrService,
    private store: Store) {
    super();
  }

  ngOnInit(): void {

    // Add new controls
    this.form.addControl('duration', new FormControl('', [Validators.required]));
    this.form.addControl('objectives', new FormControl());

    // Fill data form, register in stage
    this.subscription = this.data$.subscribe(response => {

      if (response !== null) {
        this.form.patchValue(response);
        this.form.controls.objectives.reset(); // <-- Clear form
        this.objectives = response.objectives as string[]; // <-- To print the list
      }
    });
  }

  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe(); // <-- Free memory
    }
  }

  ngOnChanges(): void {

    // Fill data form to update the data
    this.subscription = this.data$.subscribe(response => {
      if (this.MODE === ACTION.CREATE) {
        if (response !== null) {
          this.form.patchValue(response);
        }
      } else {
      }
    });
  }

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

  sendStepOne() {
    const prepareData: Learning = this.form.value;
    prepareData.objectives = this.objectives;
    this.store.dispatch(new SetLearningOne(prepareData));
  }
}
