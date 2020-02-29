import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ACTION } from '../../../../../helpers/text-content/text-crud';
import { Store } from '@ngxs/store';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { Post } from 'src/app/models/web/blog.model';
import { Utility } from 'src/app/helpers/utility';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styles: []
})
export class BlogFormComponent implements OnInit, OnChanges {

  @Input() ID: string;
  @Input() MODE: string | null = 'CREATE'; // <-- Create or edit
  @Input() DATA: Post; // <-- To update blog

  @Output() register = new EventEmitter<Post>();
  @Output() edit = new EventEmitter<Post[]>();

  ACTION = ACTION;

  submitted = false;
  formBlog: FormGroup;
  oldPost: Post;

  constructor(
    private helper: Utility,
    private toast: CustomToastrService,
    private formBuilder: FormBuilder,
    private store: Store ) {
      this.formBlog = this.formBuilder.group({
        title: new FormControl(' ', [Validators.required]),
        tag: new FormControl('Ambiente', [Validators.required]),
        image : new FormControl('', [Validators.required]),
        image2 : new FormControl('', [Validators.required]),
        status: new FormControl('Publicádo', [Validators.required]),
        text : new FormControl('', [Validators.required])
      }); // <-- Form Blog to create edit
  }

  ngOnInit() {}

  ngOnChanges(): void {
    if ( this.MODE === ACTION.EDIT ) {
      this.formBlog.patchValue( this.DATA );
    } else {
      this.formBlog.reset();
      this.formBlog.controls.tag.setValue('Ambiente');
      this.formBlog.controls.status.setValue('Publicádo');
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.formBlog.controls.image.invalid || this.formBlog.controls.image2.invalid) {
      if (this.MODE === this.ACTION.CREATE) {
        this.toast.error('Campo requerido', 'Debe cargar un imagen para completar el registro de premios y reconocimientos');
      } else if (this.MODE === this.ACTION.EDIT) {
        this.toast.error('Campo requerido', 'Debe cargar un imagen para actualizar el registro de premios y reconocimientos');
      }
    }

    // Valid form
    if (this.formBlog.valid) {

      if ( this.MODE === this.ACTION.CREATE ) {
        this.register.emit( this.formBlog.value );
        this.formBlog.reset();
        this.formBlog.controls.tag.setValue('Ambiente');
        this.formBlog.controls.status.setValue('Publicádo');
        this.submitted = false;
      } else if ( this.MODE === this.ACTION.EDIT ) {

        const prepareData: Post = {
          id: this.DATA.id,
          title: this.formBlog.controls.title.value,
          tag: this.formBlog.controls.tag.value,
          status: this.formBlog.controls.status.value,
          image: this.formBlog.controls.image.value,
          image2: this.formBlog.controls.image2.value,
          text: this.formBlog.controls.text.value
        };

        this.edit.emit( [ this.DATA, prepareData ] );
        this.submitted = false;
      }
    }
  }
}
