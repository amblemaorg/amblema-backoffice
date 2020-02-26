import { Component, OnInit, OnDestroy } from '@angular/core';
import { ACTION } from '../../../../helpers/text-content/text-crud';
import { Post } from 'src/app/models/web/blog.model';
import { Select, Store } from '@ngxs/store';
import { PostsState, SetPost, UpdatePost } from 'src/app/store/blog.action';
import { Observable, Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  // -- State manager --
  @Select( PostsState.posts ) data$: Observable<Post[]>;
  subscription: Subscription;

  posts: Post[ ];

  // -- Form settings --
  ID_FORM = 'modal-form-blog';
  ACTION = ACTION;
  MODE = ACTION.CREATE;
  postSelected: Post;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.subscription = this.data$.subscribe( response => {
      this.posts = response;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // <-- Destroy
  }

  // -- Post actions --

  onRegisterPost( post: Post ) {
    this.store.dispatch( new SetPost(post) );
  }

  // -- Event selected a post --
  onEditPost( post: Post ) {
    this.MODE = ACTION.EDIT; 
    this.postSelected = post;
    $('#modal-form-blog').modal('show')
  }

  onDeletePost( post: Post ) {
   
  }

  // -- Send post edited -- 
  onEditPostForm( post: Post[] ) {
    this.store.dispatch( new UpdatePost( post[0], post[1] ) );
  }
}
