import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectorRef,
} from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { Store, Select } from "@ngxs/store";
import { EnvironmentalProjectService } from "src/app/services/environmental-project.service";
import {
  EnvironmentalProjectState,
  EnvironmentalProjectModel,
  DeleteSchoolLevel,
  UpdateSchoolLevel,
} from "src/app/store/environmental-project.action";
import { FormGroup, FormControl } from "@angular/forms";
import { DialogConfirmationComponent } from "src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component";
import { BsModalService } from "ngx-bootstrap/modal";
import { AuthService } from "src/app/services/user/auth.service";
import { ALL_ACTIONS } from "src/app/store/_shader/all-actions";

@Component({
  selector: "app-levels-form",
  templateUrl: "./levels-form.component.html",
  styleUrls: ["./levels-form.component.scss"],
})
export class LevelsFormComponent implements OnInit, OnDestroy {
  @Select(EnvironmentalProjectState.environmentalProjectStorable)
  storable$: Observable<EnvironmentalProjectModel>;
  @Select(EnvironmentalProjectState.environmentalProject)
  environmentalProjectSelected: Observable<EnvironmentalProjectModel>;
  subscription: Subscription;

  @Input() indexTopic: number; // <-- Index Topic
  @Input() index: number; // <-- Index level
  @Input() options: any[];

  form: FormGroup;

  public canEdit = new AuthService().isAllowed(
    ALL_ACTIONS.ENVIRONMENTAL_PROJECT_EDIT
  );

  target = new Array<string>();
  techniques = new Array<string>();
  activities = new Array<any>();
  resources = new Array<string>();
  evaluations = new Array<string>();
  supportMaterial = new Array<string>();
  showProgress = false;

  constructor(
    private modalServicesBs: BsModalService,
    private cd: ChangeDetectorRef,
    private environmentalProjectService: EnvironmentalProjectService,
    private store: Store
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      week: new FormControl(),
      duration: new FormControl(),
    });

    // -- Set the value to the form --
    this.subscription = this.environmentalProjectSelected.subscribe(
      (response) => {
        response.lapseSelected.topics.forEach((topic, index) => {
          if (this.indexTopic === index) {
            if (topic.levels.length >= 0) {
              topic.levels.forEach((value, key) => {
                if (key === this.index) {
                  this.form.patchValue(value);

                  this.options =
                    value.target.length > 0
                      ? JSON.parse(JSON.stringify(value.target))
                      : this.options;

                  this.techniques = Object.assign([], value.techniques);
                  this.activities = Object.assign([], value.activities);
                  this.resources = Object.assign([], value.resources);
                  this.evaluations = Object.assign([], value.evaluations);
                  this.supportMaterial = Object.assign(
                    [],
                    value.supportMaterial
                  );
                }
              });
            }
          }
        });
      }
    );

    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // -- Action to delete level --
  deleteHimself(): void {
    const modal = this.modalServicesBs.show(
      DialogConfirmationComponent,
      Object.assign({}, { class: "modal-dialog-centered" })
    );

    // -- Set up modal
    (modal.content as DialogConfirmationComponent).showConfirmationModal(
      "Eliminar nivel escolar",
      "¿Desea eliminar nivel escolar seleccionado?",
      "Verificar el tema asociado antes de eliminar"
    );

    this.subscription = (modal.content as DialogConfirmationComponent).onClose.subscribe(
      (result) => {
        if (result === true) {
          this.subscription = this.store
            .dispatch(new DeleteSchoolLevel(this.indexTopic, this.index))
            .subscribe(() => {
              this.subscription = this.storable$.subscribe((value) => {
                this.subscription = this.environmentalProjectService
                  .updateEnvironmentalProject(value)
                  .subscribe((response) => {
                    // -- Successfully mock delete topic --
                    (modal.content as DialogConfirmationComponent).hideConfirmationModal();
                  });
              });
            });
        }
      }
    );
  }

  async onUpdateLevel() {
    this.showProgress = true;
    
    setTimeout(() => {
      this.subscription = this.store
        .dispatch(
          new UpdateSchoolLevel(
            {
              target: this.options,
              week: this.form.controls.week.value,
              duration: this.form.controls.duration.value,
              techniques: this.techniques,
              activities: this.activities,
              resources: this.resources,
              evaluations: this.evaluations,
              supportMaterial: this.supportMaterial,
            },
            this.indexTopic,
            this.index
          )
        )
        .subscribe(() => {
          this.subscription = this.storable$.subscribe((value) => {
            this.subscription = this.environmentalProjectService
              .updateEnvironmentalProject(value)
              .subscribe((response) => {});
          });
        });
    });
  }
}
