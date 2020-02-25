import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ACTION } from '../../../../../helpers/text-content/text-crud';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styles: []
})
export class BlogFormComponent implements OnInit {

  @Input() ID: string;
  @Input() MODE: string | null = 'CREATE'; // <-- Create or edit
  @Input() DATA: any = []; // <-- To update blog

  formBlog: FormGroup = new FormGroup({
    mainImage : new FormControl('', [Validators.required]),
    secondaryImage : new FormControl('', [Validators.required])  
  }); // <-- Form Blog to create edit
  
  ACTION = ACTION;
  form: FormGroup; 


  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

    // Valid form
    if (this.formBlog.valid) {

    } else {
    // Show error
    }

  }

}
