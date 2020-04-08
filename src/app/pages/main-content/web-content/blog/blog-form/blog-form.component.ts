import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ACTION } from '../../../../../helpers/text-content/text-crud';
import { Store } from '@ngxs/store';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { Post } from 'src/app/models/web/blog.model';
import { Utility } from 'src/app/helpers/utility';
import { BlogService } from 'src/app/services/web-content/blog.service';
import { SetPost, UpdatePost } from 'src/app/store/web-content/blog.action';
import { HttpEvent, HttpEventType } from '@angular/common/http';

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
  showProgress = false;
  oldPost: Post;

  constructor(
    private helper: Utility,
    private blogService: BlogService,
    private toast: CustomToastrService,
    private formBuilder: FormBuilder,
    private store: Store) {
    this.formBlog = this.formBuilder.group({
      title: new FormControl(' ', [Validators.required]),
      tag: new FormControl('Ambiente', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      image2: new FormControl('', [Validators.required]),
      status: new FormControl('Publicado', [Validators.required]),
      text: new FormControl('', [Validators.required])
    }); // <-- Form Blog to create edit
  }

  ngOnInit() { }

  ngOnChanges(): void {
    if (this.MODE === ACTION.EDIT) {
      this.formBlog.patchValue(this.DATA);
    } else {
      this.formBlog.reset();
      this.formBlog.controls.tag.setValue('Ambiente');
      this.formBlog.controls.status.setValue('Publicado');
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

      if (this.MODE === this.ACTION.CREATE) {
        /* To send data */
        let value: Post = this.formBlog.value;

        value = this.helper.convertTagStringToNumber(value);
        value = this.helper.convertStatusPostToNumber(value);

        this.showProgress = true;

        this.blogService.setPost(value).subscribe((response: HttpEvent<any>) => {

          switch (response.type) {
            case HttpEventType.Response:
              setTimeout(() => {
                this.showProgress = false;
              }, 2500);

              let value: any = response.body;

              value = this.helper.convertTagsNumberToString([value])[0];
              value = this.helper.convertStatusPostToString([value])[0];
              this.store.dispatch(new SetPost(value));
              this.toast.registerSuccess('Registro Post', 'Nuevo post registrado');

              this.formBlog.reset();
              this.formBlog.controls.tag.setValue('Ambiente');
              this.formBlog.controls.status.setValue('Publicado');
              this.submitted = false;
              break;
          }
        });

      } else if (this.MODE === this.ACTION.EDIT) {

        let prepareData: Post = {
          id: this.DATA.id,
          title: this.formBlog.controls.title.value,
          tag: this.formBlog.controls.tag.value,
          status: this.formBlog.controls.status.value,
          image: this.formBlog.controls.image.value,
          image2: this.formBlog.controls.image2.value,
          text: this.formBlog.controls.text.value
        };

        prepareData = this.helper.convertTagStringToNumber(prepareData);
        prepareData = this.helper.convertStatusPostToNumber(prepareData);

        this.showProgress = true;

        this.blogService.updatePost(prepareData.id, prepareData).subscribe((response: any) => {

          console.log(response);

          setTimeout(() => {
            this.showProgress = false;
          }, 2500);

          let value: any = response;

          this.toast.updateSuccess('Actualización', 'Post actualizado correctamente');

          value = this.helper.convertTagsNumberToString([value])[0];
          value = this.helper.convertStatusPostToString([value])[0];

          this.store.dispatch(new UpdatePost(this.DATA, value));

        });

        this.submitted = false;
      }
    }
  }
}
