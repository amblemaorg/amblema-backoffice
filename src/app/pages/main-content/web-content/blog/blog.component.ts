import { Component, OnInit } from '@angular/core';
import { ACTION } from '../../../../helpers/text-content/text-crud';
import { Post } from 'src/app/models/web/blog.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  // -- Form settings --
  ID_FORM = 'modal-form-blog';
  ACTION = ACTION;
  MODE;

  constructor() { }

  ngOnInit() {
  }

  // -- Post actions --

  onRegisterPost( post: Post ) {

  }

  onEditPost( post: Post[] ) {

  }
}
