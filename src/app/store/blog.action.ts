import { Post } from '../models/web/blog.model';
import { NgxsOnInit, StateContext, State, Action, Selector } from '@ngxs/store';
import { BlogService } from '../services/web-content/blog.service';
import { CustomToastrService } from '../services/custom-toastr.service';
import { append, updateItem, removeItem, patch } from '@ngxs/store/operators';
import { Utility } from '../helpers/utility';

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

        let data: Post = action.payload;

        data = this.helper.convertTagStringToNumber(data);
        data = this.helper.convertStatusPostToNumber(data);

        this.blogService.setPost(  data ).subscribe(  response => {
            response = this.helper.convertTagsNumberToString([response])[0];
            response = this.helper.convertStatusPostToString([response])[0];
            ctx.setState(append([response]));
            this.toastr.registerSuccess('Registro Post', 'Nuevo post registrado');
        }, (err: any) => {
            this.toastr.error('Error', 'No se ha completado el registro.');
        });
    }

    @Action( UpdatePost )
    updatePost(ctx: StateContext<Post[]>, action: UpdatePost) {
        let data: Post = action.newPost;

        data = this.helper.convertTagStringToNumber(data);
        data = this.helper.convertStatusPostToNumber(data);

        this.blogService.updatePost( action.newPost.id, data ).subscribe( response => {
            this.toastr.updateSuccess('Actualización', 'Post actualizado correctamente');

            response = this.helper.convertTagsNumberToString([response])[0];
            response = this.helper.convertStatusPostToString([response])[0];

            ctx.setState(
                updateItem<Post>(post => post.id === action.oldPost.id, response)
            );

        }, (err: any) => console.log(err));
    }

    @Action( DeletePost )
    deletePost(ctx: StateContext<Post[]>, action: DeletePost ) {
        this.blogService.deletePost( action.payload.id ).subscribe(response => {
            this.toastr.deleteRegister('Eliminación', 'Post eliminado');
            ctx.setState(removeItem<Post>( post => post === action.payload ));
        });
    }

}
