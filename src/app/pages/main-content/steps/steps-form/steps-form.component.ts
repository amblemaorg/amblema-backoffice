import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { ItemCheck } from 'src/app/models/step.model';
import { APPROVAL_TYPE } from '../../../../models/step.model';
import { StepService } from 'src/app/services/step.service';
import { VIDEO_PATTERN } from 'src/app/pages/components/form-components/shared/constant/validation-patterns-list';
import { FileValidator, EXTENSIONS } from 'src/app/pages/components/shared/file-validator';

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
  submitted = false;

  APPROVAL_TYPE = APPROVAL_TYPE;

  // Conf checklist
  checklist: ItemCheck[] = []; // Objective list
  MODE_LIST = ACTION.CREATE;
  ID_ITEM: number;
  ACTION = ACTION;

  constructor(
    private toastr: CustomToastrService,
    private stepService: StepService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      approvalType: new FormControl(null, [Validators.required]),
      hasText: new FormControl(false),
      text: new FormControl(null),
      hasDate: new FormControl(false),
      hasFile: new FormControl(false),
      file: new FormControl(null),
      hasVideo: new FormControl(false),
      video: new FormControl(null),
      hasChecklist: new FormControl(false),
      checklist: new FormControl(null),
      hasUpload: new FormControl(false),
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const checkListValid = this.form.controls.hasChecklist.value && this.checklist.length > 0 ?
      true : this.form.controls.hasChecklist.value && this.checklist.length === 0 ? false : true;

    this.submitted = true;

    if (this.form.valid && checkListValid) {

      const formData = new FormData();

      formData.append('name', this.form.controls.name.value);
      formData.append('approvalType', this.form.controls.approvalType.value);

      formData.append('tag', this.kind);
      formData.append('hasDate', this.form.controls.hasDate.value);
      formData.append('hasText', this.form.controls.hasText.value);
      formData.append('text', this.form.controls.text.value);

      // To send file, to be true
      if (this.form.controls.hasFile.value) {
        formData.append('file', this.form.controls.file.value);
      }

      // To send video, to be true
      if (this.form.controls.hasVideo.value) {
        formData.append('video', JSON.stringify({ name: Math.random().toString(), url: this.form.controls.video.value }));
      }

      // To send list, to be true
      if (this.form.controls.hasChecklist.value) {
        formData.append('checklist', JSON.stringify(this.checklist));
      }

      formData.append('hasFile', this.form.controls.hasFile.value);
      formData.append('hasVideo', this.form.controls.hasVideo.value);
      formData.append('hasChecklist', this.form.controls.hasChecklist.value);
      formData.append('hasUpload', this.form.controls.hasUpload.value);

      this.stepService.setStep(formData).subscribe(response => {
        this.resetForm();
      });
    }
  }

  /**
   * Enable / Disabled inputs
   */

  changeText(): void {
    if (this.form.controls.hasText.value) {
      this.form.controls.text.setValidators([Validators.required]);
    } else {
      this.form.controls.text.clearValidators();
    }
    this.form.controls.text.updateValueAndValidity();
  }

  changeFile(): void {
    if (this.form.controls.hasFile.value) {
      this.form.controls.file.setValidators([Validators.required, FileValidator.fileExtensions(EXTENSIONS)]);
    } else {
      this.form.controls.file.clearValidators();
    }
    this.form.controls.file.updateValueAndValidity();
  }

  changeVideo(): void {
    if (this.form.controls.hasVideo.value) {
      this.form.controls.video.setValidators([Validators.required, Validators.pattern(VIDEO_PATTERN)]);
    } else {
      this.form.controls.video.clearValidators();
    }
    this.form.controls.video.updateValueAndValidity();

  }

  resetForm() {
    this.form.reset();
    this.submitted = false;
    this.checklist = [];
  }

  /**
   * CRUD CheckList
   */

  addObjective() {
    this.checklist = Object.assign([], this.checklist);

    if (this.checklist.length < 5) {
      this.checklist.push({ name: this.form.controls.checklist.value });
      this.form.controls.checklist.reset();

    } else { this.toastr.error('Limite de registro', 'Solo se pueden registrar 5 objectivos'); }
  }

  onEditObjective(index: number): void {
    this.MODE_LIST = ACTION.EDIT;
    this.ID_ITEM = index;
    this.form.controls.checklist.setValue(this.checklist[index].name);
  }

  onDeleteObjective(index: number): void {
    this.checklist = this.checklist.filter((value, key) => key !== index);
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

