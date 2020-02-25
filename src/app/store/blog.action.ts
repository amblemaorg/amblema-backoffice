import { Post } from '../models/web/blog.model';
import { NgxsOnInit, StateContext, State } from '@ngxs/store';
import { BlogService } from '../services/web-content/blog.service';

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

// -- Posts Static --

@State<Post[]>({
    name: 'posts',
    defaults: []
})
export class PostsState implements NgxsOnInit {

    ngxsOnInit( ctx : StateContext<Post[]> ) {
    
    }

    constructor(
        private blog: BlogService
    ) {}

    
}