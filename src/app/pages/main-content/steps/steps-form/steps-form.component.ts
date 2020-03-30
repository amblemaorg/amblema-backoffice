import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { ItemCheck } from 'src/app/models/step.model';
import { APPROVAL_TYPE } from '../../../../models/step.model';
import { StepService } from 'src/app/services/step.service';
import { VIDEO_PATTERN } from 'src/app/pages/components/form-components/shared/constant/validation-patterns-list';

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

  APPROVAL_TYPE = APPROVAL_TYPE;
  submitted = false;

  // For list
  checklist: ItemCheck[] = []; // Objective list
  MODE_LIST = ACTION.CREATE;
  ID_ITEM: number;
  ACTION = ACTION;

  constructor(
    private stepService: StepService,
    private toastr: CustomToastrService,
    private fb: FormBuilder ) {
    this.form = this.fb.group({
      // Optional
      hasText: new FormControl(false),
      hasDate: new FormControl(false),
      hasFile: new FormControl(false),
      hasVideo: new FormControl(false),
      hasChecklist: new FormControl(false),
      hasUpload: new FormControl(false), 
      // ---------------------

      // Optional inputs show
      approvalType: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      
      
      checklist: new FormControl(null),
      text: new FormControl(null),
      file: new FormControl(null),
      video: new FormControl(null),
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

  onSubmit() {

    this.submitted = true;

    // Before config required data
    if( this.form.controls.hasText.value ) {
      this.form.controls.text.setValidators([Validators.required]);
      this.form.controls.text.updateValueAndValidity();
    } else {
       this.form.controls.text.clearValidators();
       this.form.controls.text.updateValueAndValidity();   
    }

    if( this.form.controls.hasChecklist.value ) {
      this.form.controls.checklist.setValidators([Validators.required]);
      this.form.controls.checklist.updateValueAndValidity();
    } else {
       this.form.controls.checklist.clearValidators();
       this.form.controls.checklist.updateValueAndValidity();   
    }

    if( this.form.controls.hasVideo.value ) {
      this.form.controls.video.setValidators([Validators.required, Validators.pattern(VIDEO_PATTERN)]);
      this.form.controls.video.updateValueAndValidity();  
    } else {
      this.form.controls.video.clearValidators();
      this.form.controls.video.updateValueAndValidity();   
   }
    
    // ---------------------------

    if ( this.form.valid ) {

      const data: any = this.form.value;

      data.checklist = this.checklist;
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('approvalType', data.approvalType); 
      formData.append('text', data.text);
    
      formData.append('tag', this.kind); 

      formData.append('hasText', String(data.hasText)); 
      formData.append('hasFile', String(data.hasFile));
      formData.append('hasUpload', String(data.hasUpload));
      formData.append('hasDate', String(data.hasDate));
      formData.append('hasVideo', String(data.hasVideo));
      formData.append('hasChecklist', String(data.hasChecklist));
    
      this.stepService.setStep(formData ).subscribe( response => {

        console.log(response); 
      }, (err: any) => { console.log(err); });
    }

  }
}

export const KIND_STEP = {
  GENERAL: {
    CODE: '1',
    VALUE: 'General'
  },
  COORDINATOR: {
    CODE: '2', 
    VALUE: 'Coordinador'
  },
  SPONSOR: {
    CODE: '3',
    VALUE: 'Padrino'
  },
  SCHOOL: {
    CODE: '4', 
    VALUE: 'Escuela'
  }
};
