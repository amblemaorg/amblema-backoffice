import { Output, Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Post } from 'src/app/_models/web/blog.model';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styles: []
})
export class BlogCardComponent implements OnInit {

  @Input() data: Post;

  @Output() edit = new EventEmitter<Post>();
  @Output() delete = new EventEmitter<Post>();

  constructor() { }

  ngOnInit() {
  }

}
