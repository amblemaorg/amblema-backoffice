import { Post } from '../../models/web/blog.model';
import { NgxsOnInit, StateContext, State, Action, Selector } from '@ngxs/store';
import { BlogService } from '../../services/web-content/blog.service';
import { CustomToastrService } from '../../services/helper/custom-toastr.service';
import { append, updateItem, removeItem, patch } from '@ngxs/store/operators';
import { Utility } from '../../helpers/utility';

// -- Post Actions --

export class GetPosts {
    static readonly type = '[Post] Get Post';
}

export class SetPost {
    static readonly type = '[Post] Set Post';
    constructor( public payload: Post ) { }
}

export class UpdatePost {
    static readonly type = '[Post] Update Post';
    constructor( public oldPost: Post, public newPost: Post ) { }
}

export class DeletePost {
    static readonly type = '[Post] Delete Post';
    constructor( public payload: Post ) { }
}

// -- Posts State --

@State<Post[]>({
    name: 'posts',
    defaults: []
})
export class PostsState implements NgxsOnInit {

    @Selector()
    static posts(state: Post[ ]): Post[] | null {
        return state;
    }

    ngxsOnInit( ctx: StateContext<Post[]> ) {
        ctx.dispatch(new GetPosts());
    }

    constructor(
        private helper: Utility,
        private toastr: CustomToastrService,
        private blogService: BlogService

    ) {}

    @Action(GetPosts)
    getPosts(ctx: StateContext<Post[]>) {
        return this.blogService.getPosts()
            .subscribe(response => {
                response = this.helper.convertTagsNumberToString(response);
                response = this.helper.convertStatusPostToString(response);
                ctx.setState( response );
            });


    }

    @Action(SetPost)
    setPost( ctx: StateContext<Post[]>, action: SetPost ) {

        ctx.setState(append([action.payload])); 
    }

    @Action( UpdatePost )
    updatePost(ctx: StateContext<Post[]>, action: UpdatePost) {
        ctx.setState(
            updateItem<Post>(post => post.id === action.oldPost.id, action.newPost)
        );
    }

    @Action( DeletePost )
    deletePost(ctx: StateContext<Post[]>, action: DeletePost ) {
        this.blogService.deletePost( action.payload.id ).subscribe(response => {
            this.toastr.deleteRegister('Eliminación', 'Post eliminado');
            ctx.setState(removeItem<Post>( post => post === action.payload ));
        });
    }

}
