import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ACTION } from '../../../../../helpers/text-content/text-crud';
import { Store } from '@ngxs/store';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { Post } from 'src/app/models/web/blog.model';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styles: []
})
export class BlogFormComponent implements OnInit {

  @Input() ID: string;
  @Input() MODE: string | null = 'CREATE'; // <-- Create or edit
  @Input() DATA: any = []; // <-- To update blog

  @Output() register = new EventEmitter<Post>();
  @Output() edit = new EventEmitter<Post[]>();

  ACTION = ACTION;

  submitted = false;
  formBlog: FormGroup;
  oldPost: Post;

  constructor(
    private toast: CustomToastrService,
    private formBuilder: FormBuilder,
    private store: Store ) {
      this.formBlog = this.formBuilder.group({
        image : new FormControl('', [Validators.required]),
        image2 : new FormControl('', [Validators.required]),
        text : new FormControl('', [Validators.required])
      }); // <-- Form Blog to create edit
  }

  ngOnInit() {
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
        this.submitted = false;
      } else if ( this.MODE === this.ACTION.EDIT ) {

      }
    } else {
      // Show error
    }
  }
}
