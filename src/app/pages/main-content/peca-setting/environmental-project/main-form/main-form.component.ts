import { Component, OnInit, OnDestroy, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import {
  SelectLapse
  , SetNameEnvironmentalProject
  , EnvironmentalProjectModel
  , EnvironmentalProjectState,
  SetGeneralObjective
} from 'src/app/store/environmental-project.action';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { EnvironmentalProjectService } from 'src/app/services/environmental-project.service';
@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent implements OnInit, OnDestroy, AfterViewChecked {

  @Select(EnvironmentalProjectState.environmentalProjectStorable) storable$: Observable<EnvironmentalProjectModel>;
  @Select(EnvironmentalProjectState.environmentalProject) environmentalProjectSelected: Observable<EnvironmentalProjectModel>;
  subscription: Subscription;

  options = [
    { value: '1', label: 'Primer lapso' },
    { value: '2', label: 'Segundo lapso' },
    { value: '3', label: 'Tercer lapso' },
  ];

  option = this.options[0].value;

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required])
  });

  formGeneralObjective: FormGroup = new FormGroup({
    generalObjective: new FormControl(null)
  });

  submitted = false;
  submittedObjective = false;


  constructor(
    private environmentalProjectService: EnvironmentalProjectService,
    private store: Store) {

  }

  ngOnInit() {
    this.subscription = this.environmentalProjectSelected.subscribe(response => {
      this.form.patchValue(response);
      this.formGeneralObjective.patchValue(response.lapseSelected);
    });

  }


  ngAfterViewChecked(): void {
      // -- Previos selection --
      this.onSelectLapse('1');
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

    if (this.form.valid) {


      // -- Set name --
      this.subscription = this.store.dispatch(new SetNameEnvironmentalProject(this.form.controls.name.value)).subscribe(() => {

        // -- Get all data --
        this.subscription = this.storable$.subscribe(value => {

          if (this.submitted) { // <-- Must be submitted

            // -- Send data to the server --
            this.subscription = this.environmentalProjectService.updateEnvironmentalProject(value).subscribe(response => {
            }, (err) => {
            });
          }
        });
      });

      // -- Reset --
      this.submitted = false;
    }
  }

  onUpdateGeneralObjective() {


    // -- Set name --
    this.subscription = this.store.dispatch(new SetGeneralObjective(this.formGeneralObjective.controls.generalObjective.value))
      .subscribe(() => {

        // -- Get all data --
        this.subscription = this.storable$.subscribe(value => {

          if (this.submittedObjective) { // <-- Must be.submittedObjective

            // -- Send data to the server --
            this.subscription = this.environmentalProjectService.updateEnvironmentalProject(value).subscribe(response => {
            }, (err) => {
            });
          }
        });
      });

  }
}
