import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { StepsFormComponent } from '../../../steps/steps-form/steps-form.component';
import { Store, Select } from '@ngxs/store';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { LapseActivityState } from 'src/app/store/lapse-activities.action';
import { Observable, Subscription } from 'rxjs';
import { Activity } from 'src/app/models/lapse-activities.model';
import { FormControl, Validators } from '@angular/forms';
import { STATUS } from 'src/app/helpers/text-content/status';
import { VIDEO_PATTERN } from 'src/app/pages/components/form-components/shared/constant/validation-patterns-list';
import { LapseActivitiesService } from 'src/app/services/lapse-activities.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent extends StepsFormComponent implements OnInit {

  @Select(LapseActivityState.selectedActivity) activity$: Observable<Activity>;
  subscription: Subscription;

  @Input() lapse: string;
  @Input() id: string;

  data: any;
  oldData: any;

  constructor(
    private lapseActivityService: LapseActivitiesService,
    public store: Store,
    public toastr: CustomToastrService,
  ) {
    super(store, toastr);

    // Toggles
    this.form.addControl('status', new FormControl(false));
  }

  ngOnInit() {
    this.subscription = this.activity$.subscribe(response => {
      this.data = response;
      console.log( this.data );
      this.basicValidation();
    });
  }



  onSubmitGeneric(): void {

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

      // To send file, to be true
      if (this.data.hasFile) {
        const isUpload: any = this.data.file;
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

      // Update activity

      this.lapseActivityService.updateActivity(this.id, this.lapse, formData).subscribe(response => {
        console.log( response );
        this.toastr.updateSuccess('Actualización', 'Paso actualizado');
      }, (err: any) => {
        console.log(err);
        this.toastr.error('Problemas al registrar', 'Las fallas pueden ser la conexión o el nombre del paso esta dúplicado');
      });
    }

  }

  // Basic
  basicValidation() {
    this.checklist = this.data.checklist;
    this.checklist = Object.assign([], this.checklist);

    // To update the store
    this.oldData = this.data;

    // Clear validation
    this.form.controls.name.setValidators([]);
    this.form.controls.approvalType.setValidators([]);
    this.form.updateValueAndValidity();

    // Prepare the data in the form
    if (this.data) {
      if (this.data.hasText) {
        this.form.controls.text.setValue(this.data.text);
        this.form.controls.text.setValidators([Validators.required]);
        this.form.updateValueAndValidity();
      }

      if (this.data.hasVideo) {
        this.form.controls.video.setValue(this.data.video.url);
        this.form.controls.video.setValidators([Validators.required, Validators.pattern(VIDEO_PATTERN)]);
        this.form.updateValueAndValidity();
      }

      if (this.data.hasFile) {
        const isUpload: any = this.data.file;

        if (isUpload.url) {
          this.form.controls.file.setValue(isUpload);
        }
      }

      this.form.controls.approvalType.setValue(this.data.approvalType);
      this.form.controls.status.setValue(this.data.status === STATUS.ACTIVE.CODE ? true : false);
    }
  }
}
