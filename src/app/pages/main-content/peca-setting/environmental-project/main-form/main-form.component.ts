import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewChecked,
  ChangeDetectorRef,
  AfterViewInit,
  DoCheck,
} from '@angular/core';
import { Store, Select } from '@ngxs/store';
import {
  SelectLapse,
  SetNameEnvironmentalProject,
  EnvironmentalProjectModel,
  EnvironmentalProjectState,
  SetGeneralObjective,
} from 'src/app/store/environmental-project.action';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { EnvironmentalProjectService } from 'src/app/services/environmental-project.service';
@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
})
export class MainFormComponent implements OnInit, OnDestroy, AfterViewInit {
  @Select(EnvironmentalProjectState.environmentalProjectStorable)
  storable$: Observable<EnvironmentalProjectModel>;
  @Select(EnvironmentalProjectState.environmentalProject)
  environmentalProjectSelected: Observable<EnvironmentalProjectModel>;
  subscription: Subscription;

  showProgress = false;

  options = [
    { value: '1', label: 'Primer lapso' },
    { value: '2', label: 'Segundo lapso' },
    { value: '3', label: 'Tercer lapso' },
  ];

  option = this.options[0].value;

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  formGeneralObjective: FormGroup = new FormGroup({
    generalObjective: new FormControl(null),
  });

  submitted = false;
  submittedObjective = false;

  constructor(
    private cd: ChangeDetectorRef,
    private environmentalProjectService: EnvironmentalProjectService,
    private store: Store
  ) {}

  ngOnInit() {
    this.subscription = this.environmentalProjectSelected.subscribe(
      (response) => {
        this.form.patchValue(response);
        this.formGeneralObjective.patchValue(response.lapseSelected);

      }
    );
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSelectLapse(item: string) {
    this.store.dispatch(new SelectLapse(item));
  }

  onSubmit(): void {
    this.submitted = true;
    this.showProgress = true;

    if (this.form.valid) {
      // -- Set name --
      this.subscription = this.store
        .dispatch(
          new SetNameEnvironmentalProject(this.form.controls.name.value)
        )
        .subscribe(() => {
          // -- Get all data --
          this.subscription = this.storable$.subscribe((value) => {
            if (this.submitted) {
              // <-- Must be submitted

              // -- Send data to the server --
              this.subscription = this.environmentalProjectService
                .updateEnvironmentalProject(value)
                .subscribe(
                  (response) => {

                  },
                  (err) => {}
                );
            }
          });
        });

      // -- Reset --
      this.submitted = false;
    }
  }

  onUpdateGeneralObjective() {

    this.submittedObjective = true;

    // -- Set name --
    this.subscription = this.store
      .dispatch(
        new SetGeneralObjective(
          this.formGeneralObjective.controls.generalObjective.value
        )
      )
      .subscribe(() => {
        // -- Get all data --
        this.subscription = this.storable$.subscribe((value) => {
          if (this.submittedObjective) {
            // <-- Must be.submittedObjective

            // -- Send data to the server --
            this.subscription = this.environmentalProjectService
              .updateEnvironmentalProject(value)
              .subscribe(
                (response) => {},
                (err) => this.showProgress = false
              );
          }
        });
      });
  }
}
