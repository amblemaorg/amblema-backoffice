import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  AfterViewChecked,
  AfterContentChecked,
  DoCheck,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { StepsFormComponent } from 'src/app/pages/main-content/steps/steps-form/steps-form.component';
import { Store } from '@ngxs/store';
import { LapseActivitiesService } from 'src/app/services/lapse-activities.service';
import { AddLapseActivity } from 'src/app/store/lapse-activities.action';
import { HttpEventType, HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-activities-form',
  templateUrl: './activities-form.component.html',
  styleUrls: ['./activities-form.component.scss'],
})
export class ActivitiesFormComponent extends StepsFormComponent
  implements OnInit {
  @Input() lapse: string;

  showProgress = false;

  constructor(
    public store: Store,
    private lapseActivityService: LapseActivitiesService,
    public toastr: CustomToastrService,

  ) {
    super(store, toastr);
  }

  ngOnInit(): void {
    console.log("Formulario para crear una actividad generica")

    this.form.addControl('hasDate', new FormControl(false));
    this.APPROVAL_TYPE = [
      ...this.APPROVAL_TYPE,
      { CODE: '5', VALUE: 'No requiere aprobación' }
    ];
  }

  onSubmit(): void {

    // This is to valid the check list if has a check
    const checkListValid =
      this.form.controls.hasChecklist.value && this.checklist.length > 0
        ? true
        : this.form.controls.hasChecklist.value && this.checklist.length === 0
        ? false
        : true;

    this.submitted = true;


    if (this.form.valid && checkListValid) {
      

      this.showProgress = true;
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
        formData.append(
          'video',
          JSON.stringify({
            name: Math.random().toString(),
            url: this.form.controls.video.value,
          })
        );
      }

      // To send list, to be true
      if (this.form.controls.hasChecklist.value) {
        formData.append('checklist', JSON.stringify(this.checklist));
      }

      formData.append('hasFile', this.form.controls.hasFile.value);
      formData.append('hasVideo', this.form.controls.hasVideo.value);
      formData.append('hasChecklist', this.form.controls.hasChecklist.value);
      formData.append('hasUpload', this.form.controls.hasUpload.value);
      formData.append('hasDate', this.form.controls.hasDate.value);
      formData.append('status', '1');
      this.showProgress = true;

      this.lapseActivityService.createActivity(this.lapse, formData).subscribe(
      
        (response: HttpEvent<any>) => {

          console.log("respuesta del registro"); 
          console.log(response);

          if (HttpEventType.Response === response.type) {
            
            this.store.dispatch(
              new AddLapseActivity(response.body, this.lapse)
            );
            this.resetForm();
            this.form.controls.hasFile.setValue(false);
            this.form.controls.hasUpload.setValue(false);
            this.form.controls.hasDate.setValue(false);
            this.form.controls.hasVideo.setValue(false);
            this.form.controls.hasChecklist.setValue(false);
            this.toastr.registerSuccess('Registro', 'Actividad registrada');
          }
        },
        (err: any) => {

          console.log( err )

          this.toastr.error(
            'Problemas al registrar',
            'Las fallas pueden ser la conexión o el nombre del paso esta dúplicado'
          );
          this.showProgress = false;
        }
      );
    }
  }


}
