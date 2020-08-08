import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ACTION } from 'src/app/_helpers/text-content/text-crud';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/_models/project.model';
import { Subscription, Observable } from 'rxjs';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { Store, Select } from '@ngxs/store';
import {
  AddProject,
  ProjectState,
  UpdateProject,
} from 'src/app/store/project.action';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styles: [],
})
export class ProjectFormComponent implements OnChanges, OnInit, OnDestroy {
  @Input() mode: string;
  @Input() MODAL: string;

  @Select(ProjectState.project) project$: Observable<Project>;

  phases: any = [ { label: 'En pasos', value: '1' }, { label: 'En PECA', value: '2' } ];

  title: string;
  form: FormGroup;
  submitted = false;

  oldProject: Project;
  subscription: Subscription;
  ACTION = ACTION;

  progress = 0;

  constructor(
    private store: Store,
    private toastr: CustomToastrService,
    private projectService: ProjectService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      sponsor: new FormControl(null),
      school: new FormControl(null),
      coordinator: new FormControl(null),
      phase: new FormControl('1'),
    });
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.title =
      this.mode === ACTION.CREATE ? 'Registrar proyecto' : 'Editar proyecto';

    if (this.mode === ACTION.EDIT) {
      this.project$.subscribe((response: any) => {

        this.oldProject = response;
        this.form.controls.sponsor.setValue(response.sponsor.id);
        this.form.controls.school.setValue(response.school.id);
        this.form.controls.coordinator.setValue(response.coordinator.id);
        this.form.controls.phase.setValue( response.phase );
      });
    } else {
      this.form.reset();
      this.form.controls.phase.setValue( '1' );
      this.progress = 0;
      this.submitted = false;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      this.progress = 1;
      if (this.mode === ACTION.CREATE) {
        this.projectService.setProject(this.form.value).subscribe(
          (response) => {
            this.reset();
            this.toastr.registerSuccess(
              'Registro proyecto',
              'Proyecto registrado correctamente'
            );
            this.store.dispatch(new AddProject(response));
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;



            if (err.error.school) {

              if ( err.error.school[0].status === '5') {

              this.toastr.error(
                'Escuela dublicada',
                'No se puede realizar el registro. Existe un proyecto con la escuela seleccionada'
              );

              return true;
              }
            }


            if (err.error.sponsor || err.error.school || err.error.coordinator || err.error._schema ) {
              this.toastr.error(
                'Error',
                'Para poder crear un proyecto, debe selecionar las tres entidades.'
              );
            }

          }
        );
      } else if (this.mode === ACTION.EDIT) {

        this.projectService
          .updateProject(this.oldProject.id, this.form.value)
          .subscribe(
            (response) => {

              this.toastr.updateSuccess(
                'Actualización',
                'Actualización de proyecto exitoso'
              );
              this.store.dispatch(new UpdateProject(response, this.oldProject));
              this.progress = 0;
              this.submitted = false;
            },
            (err: any) => {
              console.log( err );
              this.progress = 0;


              if (err.status === 400) {
                this.toastr.error(
                  'Error',
                  'Para poder crear un proyecto, debe selecionar las tres entidades.'
                );
              }

              if (err.error.school[0].status === '5') {
                this.toastr.error(
                  'Escuela dublicada',
                  'No se puede actualizars el proyecto. Ya existe un proyecto con ésta escuela'
                );
              }
            }
          );
      }
    }
  }

  reset(): boolean {
    this.form.reset();
    this.submitted = false;
    this.progress = 0;
    this.form.controls.phase.setValue('1');

    return true;
  }
}
