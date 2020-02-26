import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/web/blog.model';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styles: []
})
export class BlogCardComponent implements OnInit {

  @Input() data: Post;

  constructor() { }

  ngOnInit() {
  }

}
