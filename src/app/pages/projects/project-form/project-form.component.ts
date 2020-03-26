import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { Subscription } from 'rxjs';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { Store } from '@ngxs/store';
import { AddProject } from 'src/app/store/project.action';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styles: []
})
export class ProjectFormComponent implements OnChanges, OnInit, OnDestroy {

  @Input() mode: string;
  @Input() MODAL: string;

  title: string;
  form: FormGroup;
  submitted = false;

  oldProject: Project;
  subscription: Subscription;

  progress = false;

  constructor(
    private store: Store,
    private toastr: CustomToastrService,
    private projectService: ProjectService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      sponsor: new FormControl(null, [Validators.required]),
      school: new FormControl(null, [Validators.required]),
      coordinator: new FormControl(null, [Validators.required])
    });
  }

  ngOnChanges(): void {
    this.title = this.mode === ACTION.CREATE ? 'Registrar proyecto' : 'Editar proyecto';
  }

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit(): void {
    this.submitted = true;


    if ( this.form.valid ) {
      this.progress = true;
      if ( this.mode === ACTION.CREATE ) {
        this.projectService.setProject( this.form.value ).subscribe( response => {
          this.reset();
          this.toastr.registerSuccess('Registro proyecto', 'Proyecto registrado correctamente');
          this.store.dispatch( new AddProject(response) );

        }, (err: any) => {


          this.progress = false;

        });
      } else if ( this.mode === ACTION.EDIT ) {
        this.projectService.updateProject( this.oldProject.id, this.form.value ).subscribe( response => {

        } );
      }
    }
  }

  private reset() {
    this.form.reset();
    this.submitted = false;
    this.progress = false;
  }
}
