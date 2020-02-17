import { Component, OnInit } from '@angular/core';
import { ACTION } from '../../../../helpers/text-content/text-crud';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  // Form settings
  ID_FORM = 'modal-form-blog';
  ACTION = ACTION;
  MODE;

  constructor() { }

  ngOnInit() {
  }
}
