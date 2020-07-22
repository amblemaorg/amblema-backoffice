import { Component, OnInit, OnDestroy } from '@angular/core';
import { ACTION } from '../../../../_helpers/text-content/text-crud';
import { Post } from 'src/app/_models/web/blog.model';
import { Select, Store } from '@ngxs/store';
import {
  PostsState,
  SetPost,
  UpdatePost,
  DeletePost,
} from 'src/app/store/web-content/blog.action';
import { Observable, Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DialogConfirmationComponent } from 'src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';
import { BlogService } from 'src/app/services/web-content/blog.service';
declare var $: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  // -- State manager --
  @Select(PostsState.posts) data$: Observable<Post[]>;
  subscription: Subscription;

  posts: Post[];
  query;

  filterPost: any = { tag: '', title: '' };
  // -- Form settings --
  ID_FORM = 'modal-form-blog';
  ACTION = ACTION;
  MODE = ACTION.CREATE;
  postSelected: Post;

  pageOfItems: Array<any>;

  constructor(
    private blogService: BlogService,
    private modalServicesBs: BsModalService,
    private store: Store
  ) {}

  ngOnInit() {
    this.subscription = this.data$.subscribe((response) => {
      this.posts = response;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); // <-- Destroy
    }
  }

  // -- Post actions --

  onRegisterPost(post: Post) {
    this.store.dispatch(new SetPost(post));
  }

  // -- Event selected a post --
  onEditPost(post: Post) {
    this.MODE = ACTION.EDIT;
    this.postSelected = post;
    $('#modal-form-blog').modal('show');
  }

  onDeletePost(post: Post) {
    // -- Instance delete

    const modal = this.modalServicesBs.show(
      DialogConfirmationComponent,
      Object.assign({}, { class: 'modal-dialog-centered' })
    );

    // -- Set up modal
    (modal.content as DialogConfirmationComponent).showConfirmationModal(
      'Eliminar publicación',
      '¿Desea eliminar la publicación seleccionada?'
    );

    this.subscription = (modal.content as DialogConfirmationComponent).onClose.subscribe(
      (result) => {
        if (result === true) {
          this.blogService.deletePost(post.id).subscribe(
            (response) => {
              (modal.content as DialogConfirmationComponent).hideConfirmationModal();

              this.store.dispatch(new DeletePost(post));
            },
            (err: any) => {
              (modal.content as DialogConfirmationComponent).errorDelete(err);
            }
          );
        }
      }
    );
  }

  // -- Send post edited --
  onEditPostForm(post: Post[]) {
    this.store.dispatch(new UpdatePost(post[0], post[1]));
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
