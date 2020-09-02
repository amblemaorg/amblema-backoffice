import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { Step } from 'src/app/_models/step.model';
import { FormControl, Validators } from '@angular/forms';
import { STATUS } from 'src/app/_helpers/convention/status';
import { StepsFormComponent } from 'src/app/pages/main-content/steps/steps-form/steps-form.component';
import { StepService } from 'src/app/services/step.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { VIDEO_PATTERN } from '../../../shared/constant/validation-patterns-list';
import { Store } from '@ngxs/store';
import { DeleteStep, UpdateStep } from 'src/app/store/step.action';
import { DialogConfirmationComponent } from 'src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';
import { Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-form-simple-step',
  templateUrl: './form-simple-step.component.html',
  styleUrls: ['./form-simple-step.component.scss'],
})
export class FormSimpleStepComponent
  extends StepsFormComponent
  implements OnInit {
  @Input() data: Step;

  @Input() edit: boolean;
  @Input() remove: boolean;

  protected oldData: Step;
  subscription: Subscription;
  showProgress = false;

  constructor(
    public stores: Store,
    public toastrService: CustomToastrService,
    protected updateStepService: StepService,
    public modalServicesBs?: BsModalService
  ) {
    super(stores, toastrService);

    // Add new control status toggle
    this.form.addControl('status', new FormControl(false));
  }

  async ngOnInit() {
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
        if (this.data.video) {
          this.form.controls.video.setValue(this.data.video.url);
        }

        this.form.controls.video.setValidators([
          Validators.required,
          Validators.pattern(VIDEO_PATTERN),
        ]);
        this.form.updateValueAndValidity();
      }

      if (this.data.hasFile) {
        const isUpload: any = this.data.file;

        if (isUpload) {
          this.form.controls.file.setValue(isUpload);
        }
      }

      this.form.controls.approvalType.setValue(this.data.approvalType);

      this.form.controls.status.setValue(
        this.data.status === STATUS.ACTIVE.VALUE ? true : false
      );
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.data = Object.assign({}, this.data);

      this.data.text = this.form.controls.text.value;
      this.data.status = this.form.controls.status.value
        ? STATUS.ACTIVE.VALUE
        : STATUS.INACTIVE.VALUE;
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
        formData.append(
          'video',
          JSON.stringify({
            name: Math.random().toString(),
            url: this.form.controls.video.value,
          })
        );
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

      this.showProgress = true;

      // Update step
      this.updateStepService.updateStep(this.data.id, formData).subscribe(
        (response: any) => {
          this.toastrService.updateSuccess('Actualización', 'Paso actualizado');
          this.stores.dispatch(new UpdateStep(response, this.oldData));
        },
        (err: any) => {
          this.toastrService.error(
            'Problemas al registrar',
            'Las fallas pueden ser la conexión o el nombre del paso esta dúplicado'
          );
        }
      );
    }
  }

  finishRequest() {
    this.showProgress = false;
  }

  confirmAction() {
    if (this.MODE_LIST === this.ACTION.EDIT) {
      this.checklist[this.ID_ITEM] = {
        name: this.form.controls.checklist.value,
        id: this.checklist[this.ID_ITEM].id,
      };
    }
    this.MODE_LIST = this.ACTION.CREATE;
    this.form.controls.checklist.reset();
  }

  onDelete() {
    const modal = this.modalServicesBs.show(
      DialogConfirmationComponent,
      Object.assign({}, { class: 'modal-dialog-centered' })
    );

    // -- Set up modal
    (modal.content as DialogConfirmationComponent).showConfirmationModal(
      'Eliminar paso',
      '¿Desea eliminar el paso seleccionado?'
    );

    this.subscription = (modal.content as DialogConfirmationComponent).onClose.subscribe(
      (result) => {
        if (result === true) {
          this.updateStepService.deleteStep(this.data.id).subscribe(
            (response: any) => {
              (modal.content as DialogConfirmationComponent).hideConfirmationModal();

              this.stores.dispatch(new DeleteStep(this.data.id));
              this.toastrService.deleteRegister(
                'Eliminación',
                'Paso eliminado'
              );
            },
            (err: any) => {
              (modal.content as DialogConfirmationComponent).errorDelete(err);
            }
          );
        }
      }
    );
  }
}
