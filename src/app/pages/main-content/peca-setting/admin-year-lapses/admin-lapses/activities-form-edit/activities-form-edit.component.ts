import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { StepsFormComponent } from 'src/app/pages/main-content/steps/steps-form/steps-form.component';
import { Select, Store } from '@ngxs/store';
import { LapseActivitiesService } from 'src/app/services/lapse-activities.service';
import { AddLapseActivity, LapseActivityState, UpdateStatusLapseActivity } from 'src/app/store/lapse-activities.action';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { Activity } from 'src/app/_models/lapse-activities.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-activities-form-edit',
  templateUrl: './activities-form-edit.component.html',
  styleUrls: ['./activities-form-edit.component.scss'],
})
export class ActivitiesFormEditComponent
  extends StepsFormComponent
  implements OnInit {
  @Input() lapse: string;
  @Select(LapseActivityState.selectedActivity) activity$: Observable<Activity>;
  showProgress = false;
  oldActivity: Activity;
  progress: number;
  constructor(
    public store: Store,
    private lapseActivityService: LapseActivitiesService,
    public toastr: CustomToastrService,
  ) {
    super(store, toastr);
    /*this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      order: new FormControl(null)
    })*/
  }

  ngOnInit(): void {
    console.log('Formulario para editar una actividad generica');
    this.activity$.subscribe((response: any) => {
      this.oldActivity = response;
      this.form.controls.name.setValue(response.name);
      this.form.controls.order.setValue(response.order);
      this.form.controls.approvalType.setValue(response.approvalType);
      this.form.controls.hasText.setValue(response.hasText);
      this.form.controls.text.setValue(response.text);
      this.form.controls.hasDate.setValue(response.hasDate);
      this.form.controls.hasFile.setValue(response.hasFile);
      this.form.controls.file.setValue(response.file);
      this.form.controls.hasVideo.setValue(response.hasVideo);
      this.form.controls.video.setValue(response.video);
      this.form.controls.hasChecklist.setValue(response.hasChecklist);
      this.form.controls.hasUpload.setValue(response.hasUpload);
      this.form.controls.checklist.setValue(response.checklist);
      
    });
  }

  onSubmit(): void {
    // This is to valid the check list if has a check
    this.submitted = true;

    console.log("dasda");
    console.log(this.oldActivity.id);
    console.log(this.form.valid);
    if ((!this.oldActivity.isStandard && this.form.valid) || this.oldActivity.isStandard) {
      this.showProgress = true;
      const formData = new FormData();
      formData.append("id", this.oldActivity.id);
      formData.append("devName", this.oldActivity.devName);
      formData.append('name', this.form.controls.name.value);
      formData.append('order', this.form.controls.order.value);
      formData.append('status', this.oldActivity.status);
        if(!this.oldActivity.isStandard){
        formData.append('approvalType', this.form.controls.approvalType.value);
        formData.append('hasText', this.form.controls.hasText.value);
        formData.append('hasDate', this.form.controls.hasDate.value);
        formData.append('hasFile', this.form.controls.hasFile.value);
        formData.append('hasVideo', this.form.controls.hasVideo.value);
        formData.append('hasChecklist', this.form.controls.hasChecklist.value);
        formData.append('hasUpload', this.form.controls.hasUpload.value);
        if(this.form.controls.hasChecklist.value){
          formData.append('checklist', JSON.stringify(this.oldActivity.checklist));
        }
        if(this.form.controls.hasText.value){
          formData.append('text', this.oldActivity.text);
        }
        if(this.form.controls.hasVideo.value){
          formData.append('video',JSON.stringify(this.oldActivity.video));
        }
        if (this.form.controls.hasFile.value) {
          formData.append('file', JSON.stringify(this.oldActivity.file));
        }

      }
      /*formData.append('text', this.form.controls.text.value);
      formData.append('file', this.form.controls.file.value);
      formData.append('video', this.form.controls.video.value);
      formData.append('checklist', this.form.controls.checklist.value);
      */
      this.showProgress = true;

      this.lapseActivityService.updateActivity(this.oldActivity.id,this.lapse, formData).subscribe(
        (response: HttpEvent<any>) => {
          console.log("dddddddddddddd");
          console.log(response.type);
          if (HttpEventType.Response === response.type) {

            this.toastr.updateSuccess(
                'Actualización',
                'Actualización de actividad exitoso'
              );
              this.submitted = false;
              this.resetForm();
          
              this.store.dispatch(
                new UpdateStatusLapseActivity(response.body, this.lapse)
              );
              this.progress = 0;
              }
        },
        (err: any) => {
          this.toastr.error(
            'Problemas al editar',
            'Las fallas pueden ser la conexión o el nombre del paso esta dúplicado'
          );
          this.showProgress = false;
        }
      );
    }
  }
  onClean(): void{
    this.resetForm();
  }
}
