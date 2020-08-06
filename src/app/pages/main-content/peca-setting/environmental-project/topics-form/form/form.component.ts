import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Store, Select } from '@ngxs/store';
import {
  AddSchoolLevel,
  DeleteTopic,
  EnvironmentalProjectModel,
  EnvironmentalProjectState,
  UpdateTopic,
} from 'src/app/store/environmental-project.action';
import { Level, Lapse } from 'src/app/_models/environmental-project.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { EnvironmentalProjectService } from 'src/app/services/environmental-project.service';
import { take } from 'rxjs/operators';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { DialogConfirmationComponent } from 'src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  @Select(EnvironmentalProjectState.environmentalProjectStorable)
  storable$: Observable<EnvironmentalProjectModel>;
  @Select(EnvironmentalProjectState.lapseSelected) lapse$: Observable<Lapse>;

  public canEdit = new AuthService().isAllowed( ALL_ACTIONS.ENVIRONMENTAL_PROJECT_EDIT );


  subscription: Subscription;

  @Input() levels: Array<Level>; // <-- Obtain the school levels according to the topic
  @Input() index: number; // <-- This is the topic indexing

  // -- General grades selected --
  options = [
    { label: '0', value: false }, // <-- Prescolar 0
    { label: '1', value: false }, // <-- Primer grado 1
    { label: '2', value: false }, // <-- Segundo grado 2
    { label: '3', value: false }, // <-- Tercer grado 3
    { label: '4', value: false }, // <-- Cuarto grado 4
    { label: '5', value: false }, // <-- Quinto grado 5
    { label: '6', value: false }, // <-- Sexto grado 6
  ];

  // -- Options selected --
  optionsSelected: any[] = [];

  // -- Forms --
  form: FormGroup = new FormGroup({
    name: new FormControl(null),
  });

  EnvironmentalProjectService;
  objectives = new Array<string>();
  strategies = new Array<string>();
  contents = new Array<string>();
  levelsSchool = new Array<any>();

  showProgress = false;

  constructor(
    private modalServicesBs: BsModalService,
    private environmentalProjectService: EnvironmentalProjectService,
    private store: Store
  ) {}

  ngOnInit() {
    this.subscription = this.lapse$.pipe(take(1)).subscribe((response) => {
      // -- Set the values to the form --
      response.topics.forEach((value, key) => {
        if (key === this.index) {
          this.form.patchValue(value);

          this.objectives = value.objectives;
          this.strategies = value.strategies;
          this.contents = value.contents;
          this.levelsSchool = value.levels;

          this.objectives = Object.assign([], this.objectives);
          this.strategies = Object.assign([], this.strategies);
          this.contents = Object.assign([], this.contents);
        }
      });

      // -- Get available degrees --
      if (response.topics[this.index].levels) {
        response.topics[this.index].levels.forEach((level) => {
          level.target.forEach((target) => {
            this.options.forEach((option) => {
              if (target.label === option.label && target.value) {
                option.value = target.value;
              }
            });
          });
        });
      } // <-- End searching grades
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addLevel() {
    // -- Change values to true --
    this.optionsSelected.forEach((option) => {
      option.value = true;
    });

    this.store
      .dispatch(
        new AddSchoolLevel(
          {
            target: this.optionsSelected,
            week: [],
            duration: '',
            techniques: [],
            activities: [],
            resources: [],
            evaluations: [],
            supportMaterial: [],
          },
          this.index
        )
      )
      .subscribe(() => {
        this.optionsSelected = []; // <-- Clear options selected

        this.subscription = this.storable$.subscribe((value) => {
          this.subscription = this.environmentalProjectService
            .updateEnvironmentalProject(value)
            .subscribe(
              (response) => {},
              (err) => {}
            );
        });
      });
  }

  // -- Action to delete topic --
  deleteHimself(): void {
    const modal = this.modalServicesBs.show(
      DialogConfirmationComponent,
      Object.assign({}, { class: 'modal-dialog-centered' })
    );

    // -- Set up modal
    (modal.content as DialogConfirmationComponent).showConfirmationModal(
      'Eliminar tema del proyecto ambiental',
      '¿Desea eliminar el tema de forma permanente?'
    );

    this.subscription = (modal.content as DialogConfirmationComponent).onClose.subscribe(
      (result) => {
        if (result === true) {
          this.subscription = this.store
            .dispatch(new DeleteTopic(this.index))
            .subscribe(() => {
              this.subscription = this.storable$.subscribe((value) => {


                this.subscription = this.environmentalProjectService
                  .updateEnvironmentalProject(value)
                  .subscribe((response) => {
                    (modal.content as DialogConfirmationComponent).hideConfirmationModal();
                    // -- Successfully mock delete topic --
                  },
                  (err: any) => {
                    (modal.content as DialogConfirmationComponent).errorDelete(
                      err
                    );
                  });
              });
            });
        }
      }
    );
  }

  onUpdateTopic(): void {
    this.showProgress = true;

    setTimeout(() => {
      this.store
        .dispatch(
          new UpdateTopic(
            {
              name: this.form.controls.name.value,
              objectives: this.objectives,
              strategies: this.strategies,
              contents: this.contents,
              levels: this.levelsSchool
            },
            this.index
          )
        )
        .toPromise()
        .then()
        .finally(() => {
          this.subscription = this.storable$.subscribe((value) => {

            this.subscription = this.environmentalProjectService
              .updateEnvironmentalProject(value)
              .subscribe((response: HttpEvent<any>) => {
                // -- Successfully mock delete topic --

                switch (response.type) {
                  case HttpEventType.UploadProgress:
                    this.showProgress = true;
                    break;
                  case HttpEventType.Response:
                    setTimeout(() => {
                      this.showProgress = false;
                    }, 2500);
                    break;
                }
              });
          });
        });
    });
  }
}
