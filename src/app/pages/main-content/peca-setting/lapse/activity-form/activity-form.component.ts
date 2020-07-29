import {
  Component,
  Input,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { StepsFormComponent } from '../../../steps/steps-form/steps-form.component';
import { Store, Select } from '@ngxs/store';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { LapseActivityState } from 'src/app/store/lapse-activities.action';
import { Observable, Subscription } from 'rxjs';
import { Activity } from 'src/app/_models/lapse-activities.model';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { STATUS } from 'src/app/_helpers/convention/status';
import { VIDEO_PATTERN } from 'src/app/pages/_components/form-components/shared/constant/validation-patterns-list';
import { LapseActivitiesService } from 'src/app/services/lapse-activities.service';
import { Slider } from 'src/app/_models/web/slider.model';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { APPROVAL_TYPE } from '../../../../../_models/step.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DialogConfirmationComponent } from 'src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss'],
  providers: [BsModalService]
})
export class ActivityFormComponent extends StepsFormComponent
  implements AfterViewInit {
  @Select(LapseActivityState.selectedActivity) activity$: Observable<Activity>;
  subscription: Subscription;

  @Input() lapse: string;
  @Input() id: string;

  formStandard: FormGroup;
  formCoin: FormGroup;

  readonly DEVNAME_STANDARD = {
    INITIAL_WORKSHOP: 'initialworkshop',
    AMBLE_COINS: 'amblecoins',
    LAPSE_PLANNING: 'lapseplanning',
    ANNUAL_PREPARATION: 'annualpreparation',
    ANNUAL_CONVENTION: 'annualconvention',
    MATH_OLYMPIC: 'matholympic',
    SPECIAL_SPAN_ACTIVITY: 'speciallapseactivity'
  };

  data: any;
  sliders: Slider[] = [];
  showSlider = false;
  showProgress = false;

  public APPROVAL_TYPE = APPROVAL_TYPE;

  oldData: any;

  constructor(
    private cd: ChangeDetectorRef,
    private lapseActivityService: LapseActivitiesService,
    public store: Store,
    public toastr: CustomToastrService ,
    public modalX: BsModalService
  ) {
    super(store, toastr);



    // Toggles
    this.form.addControl('status', new FormControl(false));
    this.form.addControl('description', new FormControl(null));


    this.subscription = this.activity$.subscribe((response: any) => {
      this.data = response;

      if (this.data.isStandard) {
        this.createForm(this.id);

        if (this.formStandard) {

          this.formStandard.patchValue(this.data);


          if (this.id === this.DEVNAME_STANDARD.MATH_OLYMPIC ) {
            console.log( this.data );
            this.formStandard.controls.date.setValue(new Date(this.data.date as string ));
          }


        }
        if (this.id === this.DEVNAME_STANDARD.AMBLE_COINS) {
          const value: any = JSON.stringify(
            this.formStandard.controls.piggyBankSlider.value
          );
          this.sliders = JSON.parse(value);
          this.sliders = Object.assign([], this.sliders);
        }

        if (this.id === this.DEVNAME_STANDARD.ANNUAL_CONVENTION) {
          // console.log( this.formStandard.value )
          const value: any = JSON.stringify(this.data.checklist);

          this.checklist = JSON.parse(value);
        }
      } else {
        if (this.form) {
          this.form.patchValue(response);
          this.basicValidation();
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  onSubmitGeneric(): void {
    if (this.form.valid) {

      this.data = Object.assign({}, this.data);

      this.data.text = this.form.controls.text.value;
      this.data.status = this.form.controls.status.value
        ? STATUS.ACTIVE.VALUE
        : STATUS.INACTIVE.VALUE;
      this.data.approvalType = this.form.controls.approvalType.value;
      this.data.file = this.form.controls.file.value;

      const formData = new FormData();

      console.log( this.data );

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
      formData.append('description', String(this.form.controls.description.value));

      this.showProgress = true;

      // Update activity
      this.lapseActivityService
        .updateActivity(this.id, this.lapse, formData)
        .subscribe(
          (response: HttpEvent<any>) => {
            if (HttpEventType.Response === response.type) {
              this.toastr.updateSuccess(
                'Actualización',
                'Actividad actualizada'
              );
            }
          },
          (err: any) => {
            this.toastr.error(
              'Problemas al registrar',
              'Las fallas pueden ser la conexión o el nombre del paso esta dúplicado'
            );
          }
        );
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
        this.form.controls.video.setValidators([
          Validators.required,
          Validators.pattern(VIDEO_PATTERN),
        ]);
        this.form.updateValueAndValidity();
      }

      if (this.data.hasFile) {
        const isUpload: any = this.data.file;

        if (isUpload.url) {
          this.form.controls.file.setValue(isUpload);
        }
      }

      this.form.controls.approvalType.setValue(this.data.approvalType);
      this.form.controls.status.setValue(
        this.data.status === STATUS.ACTIVE.VALUE ? true : false
      );
    }
  }

  createForm(id: string) {
    if (id === this.DEVNAME_STANDARD.INITIAL_WORKSHOP) {
      this.formStandard = new FormGroup({
        agreementFile: new FormControl(null, [Validators.required]),
        teachersMeetingFile: new FormControl(null, [Validators.required]),
        agreementDescription: new FormControl(null, [Validators.required]),
        planningMeetingFile: new FormControl(null, [Validators.required]),
        planningMeetingDescription: new FormControl(null, [
          Validators.required,
        ]),
        teachersMeetingDescription: new FormControl(null, [
          Validators.required,
        ]),
        description: new FormControl(null, Validators.required)
      });
    } else if (id === this.DEVNAME_STANDARD.AMBLE_COINS) {
      this.formStandard = new FormGroup({
        teachersMeetingDescription: new FormControl(null, [
          Validators.required,
        ]),
        teachersMeetingFile: new FormControl(null, [Validators.required]),
        piggyBankSlider: new FormControl([], [Validators.required]),
        piggyBankDescription: new FormControl(null, [Validators.required]),
        description: new FormControl(null, Validators.required)
      });
    } else if (id === this.DEVNAME_STANDARD.LAPSE_PLANNING) {
      this.formStandard = new FormGroup({
        proposalFundationDescription: new FormControl(null, [
          Validators.required,
        ]),
        proposalFundationFile: new FormControl(null, [Validators.required]),
        meetingDescription: new FormControl(null, [Validators.required]),
      });
    } else if (id === this.DEVNAME_STANDARD.ANNUAL_PREPARATION) {
      this.formStandard = new FormGroup({
        step4Description: new FormControl(null, [Validators.required]),
        step3Description: new FormControl(null, [Validators.required]),
        step2Description: new FormControl(null, [Validators.required]),
        step1Description: new FormControl(null, [Validators.required]),
      });
    } else if (id === this.DEVNAME_STANDARD.ANNUAL_CONVENTION) {
      this.formStandard = new FormGroup({
        checklist: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required])
      });
    } else if (id === this.DEVNAME_STANDARD.MATH_OLYMPIC) {
      this.formStandard = new FormGroup({
        date: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        file: new FormControl(null, [Validators.required]),

      });
    } else if ( id === this.DEVNAME_STANDARD.SPECIAL_SPAN_ACTIVITY ) {

      this.formStandard = new FormGroup({
        description: new FormControl(null, [Validators.required])
      });

    }
  }

  onSubmitInitialWorkshop(): void {
    const prepareData: any = this.formStandard.value;

    const formData = new FormData();

    formData.append(
      'agreementFile',
      prepareData.agreementFile.url
        ? JSON.stringify(prepareData.agreementFile)
        : prepareData.agreementFile
    );
    formData.append(
      'teachersMeetingFile',
      prepareData.teachersMeetingFile.url
        ? JSON.stringify(prepareData.teachersMeetingFile)
        : prepareData.teachersMeetingFile
    );
    formData.append(
      'planningMeetingFile',
      prepareData.planningMeetingFile.url
        ? JSON.stringify(prepareData.planningMeetingFile)
        : prepareData.planningMeetingFile
    );
    formData.append('agreementDescription', prepareData.agreementDescription);

    formData.append(
      'planningMeetingDescription',
      prepareData.planningMeetingDescription
    );
    formData.append(
      'teachersMeetingDescription',
      prepareData.teachersMeetingDescription
    );


    formData.append(
      'description',
      prepareData.description
    );

    this.showProgress = true;
    this.lapseActivityService
      .updateActivity(this.id, this.lapse, formData)
      .subscribe(
        (response) => {
          this.toastr.updateSuccess(
            'Actualización',
            'Taller inicial actualizado'
          );
        },
        (err: any) => {
          this.toastr.error(
            'Problemas al registrar',
            'Las fallas pueden ser la conexión o el nombre del paso esta dúplicado'
          );
        }
      );
  }

  onSubmitAblemaCoins() {
    const prepareData: any = this.formStandard.value;

    const formData = new FormData();

    formData.append(
      'teachersMeetingFile',
      prepareData.teachersMeetingFile.url
        ? JSON.stringify(prepareData.teachersMeetingFile)
        : prepareData.teachersMeetingFile
    );

    formData.append(
      'teachersMeetingDescription',
      prepareData.teachersMeetingDescription
    );
    formData.append(
      'piggyBankDescription',
      prepareData.teachersMeetingDescription
    );


    formData.append(
      'description',
      prepareData.description
    );
    formData.append('piggyBankSlider', JSON.stringify(this.sliders));

    this.showProgress = true;
    this.lapseActivityService
      .updateActivity(this.id, this.lapse, formData)
      .subscribe(
        (response) => {
          this.toastr.updateSuccess('Actualización', 'AbLeCoins actualizado');
        },
        (err: any) => {
          this.toastr.error(
            'Problemas al registrar',
            'Las fallas pueden ser la conexión o el nombre del paso esta dúplicado'
          );
        }
      );
  }

  onSubmitLapsePlanning() {
    const prepareData: any = this.formStandard.value;

    const formData = new FormData();

    formData.append(
      'proposalFundationFile',
      prepareData.proposalFundationFile.url
        ? JSON.stringify(prepareData.proposalFundationFile)
        : prepareData.proposalFundationFile
    );

    formData.append(
      'proposalFundationDescription',
      prepareData.proposalFundationDescription
    );
    formData.append('meetingDescription', prepareData.meetingDescription);

    this.showProgress = true;
    this.lapseActivityService
      .updateActivity(this.id, this.lapse, formData)
      .subscribe(
        (response) => {
          this.toastr.updateSuccess(
            'Actualización',
            'Planificación inicial actualizado'
          );
        },
        (err: any) => {
          this.toastr.error(
            'Problemas al registrar',
            'Las fallas pueden ser la conexión o el nombre del paso esta dúplicado'
          );
        }
      );
  }

  onSubmitAnualPreparation() {
    const prepareData: any = this.formStandard.value;

    const formData = new FormData();

    formData.append('step4Description', prepareData.step4Description);
    formData.append('step3Description', prepareData.step3Description);
    formData.append('step2Description', prepareData.step2Description);
    formData.append('step1Description', prepareData.step1Description);

    this.showProgress = true;
    this.lapseActivityService
      .updateActivity(this.id, this.lapse, formData)
      .subscribe(
        (response) => {
          this.toastr.updateSuccess(
            'Actualización',
            'Preparación anual actualizado'
          );

          setTimeout(() => {
            this.showProgress = false;
          }, 2000);
        },
        (err: any) => {
          this.showProgress = false;
          this.toastr.error(
            'Problemas al registrar',
            'Las fallas pueden ser la conexión o el nombre del paso esta dúplicado'
          );
        }
      );
  }

  onSubmitAnualConvention() {

    const formData = new FormData();


    this.data = Object.assign({}, this.data);

    formData.append(
      'description',
      this.formStandard.controls.description.value
    );

    formData.append('checklist', JSON.stringify(this.checklist));

    this.showProgress = true;

    this.lapseActivityService
      .updateActivity(this.id, this.lapse, formData)
      .subscribe(
        (response) => {
          this.toastr.updateSuccess(
            'Actualización',
            'Convención anual actualizado'
          );

          setTimeout(() => {
            this.showProgress = false;
          }, 2000);
        },
        (err) => (this.showProgress = false)
      );
  }

  onSubmitMathOlympic() {
    const prepareData: any = this.formStandard.value;

    prepareData.date = prepareData.date.toISOString();

    const formData = new FormData();

    formData.append(
      'file',
      prepareData.file.url ? JSON.stringify(prepareData.file) : prepareData.file
    );

    this.showProgress = true;

    formData.append('description', prepareData.description);
    formData.append('date', prepareData.date);

    this.lapseActivityService
      .updateActivity(this.id, this.lapse, formData)
      .subscribe(
        (response) => {
          this.toastr.updateSuccess(
            'Actualización',
            'Olimpíadas matemáticas actualizado'
          );

          setTimeout(() => {
            this.showProgress = false;
          }, 2500);
        },
        () => (this.showProgress = false)
      );
  }

  onSubmitSpecialSpanActivity() {
    const formData = new FormData();

    this.showProgress = true;
    formData.append('description', this.formStandard.controls.description.value);


    this.lapseActivityService
      .updateActivity(this.id, this.lapse, formData)
      .subscribe(
        (response) => {
          this.toastr.updateSuccess(
            'Actualización',
            'Actividad especia de lapso'
          );

          setTimeout(() => {
            this.showProgress = false;
          }, 2500);
        },
        () => (this.showProgress = false)
      );
  }

  onCheckList() {
    if (this.form.controls.hasChecklist.value) {
      this.APPROVAL_TYPE.push({
        CODE: '2',
        VALUE: 'Se apueba al completar los campos',
      });
    } else {
      this.APPROVAL_TYPE = this.APPROVAL_TYPE.filter(
        (item) => item.CODE !== '2'
      );
    }
  }

  public onDeleteObjectiveX(index: number): void {
    const modal = this.modalX.show(
      DialogConfirmationComponent,
      Object.assign({}, { class: 'modal-dialog-centered' })
    );

    // -- Set up modal
    (modal.content as DialogConfirmationComponent).showConfirmationModal(
      'Eliminar objectivo',
      '¿Desea eliminar el objectivo seleccionado?'
    );

    this.subscription = (modal.content as DialogConfirmationComponent).onClose.subscribe(
      (result) => {
        if (result === true) {
          this.checklist = this.checklist.filter((value, key) => key !== index);
          this.toastr.deleteRegister(
            'Eliminado',
            'Se ha eliminado el objetivo de la lista'
          );

          (modal.content as DialogConfirmationComponent).hideConfirmationModal();
        }
      }
    );
  }
}
