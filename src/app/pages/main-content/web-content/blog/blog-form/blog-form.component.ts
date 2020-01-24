import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ACTION } from '../../../../../helpers/text-crud';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styles: []
})
export class BlogFormComponent implements OnInit {

  ACTION = ACTION;

  @Input() ID: string;
  @Input() MODE: string | null = 'CREATE'; // <-- Create or edit
  @Input() DATA: any = []; // <-- To update blog

  formBlog: FormGroup; // <-- Form Blog to create edit

  constructor() { }

  ngOnInit() {
  }

  onSubmit(data: any) {

    // Valid form
    if (this.formBlog.valid) {

    } else {
    // Show error
    }

  }

}
