import { Post } from '../models/web/blog.model';
import { NgxsOnInit, StateContext, State, Action, Selector } from '@ngxs/store';
import { BlogService } from '../services/web-content/blog.service';
import { CustomToastrService } from '../services/custom-toastr.service';
import { patch } from '@nebular/theme';
import { append } from '@ngxs/store/operators';

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
    constructor( public payload: string ) { }
}

export class DeletePost {
    static readonly type = '[Post] Delete Post';
    constructor( public payload: string ) { }
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
        private toastr: CustomToastrService,
        private blogService: BlogService
    ) {}

    @Action(GetPosts)
    getPosts(ctx: StateContext<Post[]>) {
        return this.blogService.getPosts()
            .subscribe(response => {
                ctx.setState( response );
            });
    }

    @Action(SetPost)
    setPost( ctx: StateContext<Post[]>, action: SetPost ) {
        const value = ctx.getState();

        this.blogService.setPost(  action.payload ).subscribe(  response => {
            ctx.setState(append([action.payload]));
            this.toastr.registerSuccess('Registro Post', 'Nuevo post registrado');
        }, (err: any) => {
            this.toastr.error('Error', 'No se ha completado el registro.');
        });
    }

    @Action( UpdatePost )
    updatePost(ctx: StateContext<Post[]> ) {

    }

    @Action( DeletePost )
    deletePost(ctx: StateContext<Post[]> ) {

    }

}
