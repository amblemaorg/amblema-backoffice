import { Component, OnInit, Input } from '@angular/core';
import { Step } from 'src/app/models/step.model';
import { FormControl, Validators } from '@angular/forms';
import { STATUS } from 'src/app/helpers/text-content/status';
import { StepsFormComponent } from 'src/app/pages/main-content/steps/steps-form/steps-form.component';
import { StepService } from 'src/app/services/step.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { VIDEO_PATTERN } from '../../../shared/constant/validation-patterns-list';

@Component({
  selector: 'app-form-simple-step',
  templateUrl: './form-simple-step.component.html',
  styleUrls: ['./form-simple-step.component.scss']
})
export class FormSimpleStepComponent extends StepsFormComponent implements OnInit {

  @Input() data: Step;

  constructor(
    private toastrService: CustomToastrService,
    private updateStepService: StepService,
  ) {
    super();

    // Add new control status toggle
    this.form.addControl('status', new FormControl(false));
  }

  async ngOnInit() {

    console.log(this.data)

    // Clear validation
    this.form.controls.name.setValidators([]);
    this.form.controls.approvalType.setValidators([]);
    this.form.updateValueAndValidity();

    // Prepare the data in the form
    if (this.data) {
      if (this.data.hasText) {
        this.form.controls.text.setValue(this.data.text);
        this.form.controls.text.setValidators([Validators.required]);
        this.form.updateValueAndValidity()
      }

      if (this.data.hasVideo) {
        this.form.controls.video.setValue(this.data.video.url);
        this.form.controls.video.setValidators([Validators.required, Validators.pattern(VIDEO_PATTERN)]);
        this.form.updateValueAndValidity()
      }

      if( this.data.hasFile ) {
        let isUpload: any = this.data.file;

        if (isUpload.url) {
          this.form.controls.file.setValue( isUpload );
        }
      }

      this.form.controls.approvalType.setValue(this.data.approvalType);
      this.form.controls.status.setValue(this.data.status === STATUS.ACTIVE.CODE ? true : false);
    }
  }

  onSubmit(): void {

    if (this.form.valid) {

      this.data = Object.assign({}, this.data);

      this.data.text = this.form.controls.text.value;
      this.data.status = this.form.controls.status.value ? STATUS.ACTIVE.CODE : STATUS.INACTIVE.CODE;
      this.data.approvalType = this.form.controls.approvalType.value;
      this.data.file = this.form.controls.file.value;

      const formData = new FormData();

      formData.append('name', this.data.name);
      formData.append('approvalType', this.data.approvalType);

      formData.append('tag', this.data.tag);
      formData.append('hasDate', String(this.data.hasDate));
      formData.append('hasText', String(this.data.hasText));
      formData.append('text', this.data.text);

      console.log(this.data);

      // To send file, to be true
      if (this.data.hasFile) {
        let isUpload: any = this.data.file;
        if (isUpload.url) {
          formData.append('file', JSON.stringify(this.data.file));
        } else {
          formData.append('file', this.data.file);
        }
      }

      // To send video, to be true
      if (this.data.hasVideo) {
        formData.append('video', JSON.stringify({ name: Math.random().toString(), url: this.form.controls.video.value }));
      }

      // To send list, to be true
      if (this.data.hasChecklist) {
        formData.append('checklist', JSON.stringify(this.checklist));
      }

      formData.append('hasFile', String(this.data.hasFile));
      formData.append('hasVideo', String(this.data.hasVideo));
      formData.append('hasChecklist', String(this.data.hasChecklist));
      formData.append('hasUpload', String(this.data.hasUpload));
      formData.append('status', String(this.data.status));

      // Update step
      this.updateStepService.updateStep(this.data.id, formData).subscribe(response => {
        this.toastrService.updateSuccess('Actualización', 'Paso actualizado')
      }, (err: any) => {
        console.log(err);
      })
    }

  }

  onDelete() {

    

  }
}
