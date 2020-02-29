import { Inject } from '@angular/core';
import { STATUS } from './text-content/status';
import { Post } from '../models/web/blog.model';

@Inject('root')
export class Utility {

    public readlyStatus(object?: any[]): any[] {
        object.forEach((value, key) => {
            if (value.status === STATUS.ACTIVE.CODE) {
                value.status = STATUS.ACTIVE.MSG as string;
            } else {
                value.status = STATUS.INACTIVE.MSG as string;
            }
        });
        return object;
    }

    public incodeStatus(object: any[]): any[] {
        object.forEach((value, key) => {
            if (String(value.status) === STATUS.ACTIVE.MSG) {
                value.status = STATUS.ACTIVE.CODE;
            } else {
                value.status = STATUS.INACTIVE.CODE;
            }
        });
        return object;
    }

    /** To filter array json by ID, return a value */

    public filter(object: any[], id: string): any {
        return object.filter(value => {
            if (value.id === id) {
                return value;
            }
        });
    }

    /**
     * Convert Tags number to string
     */
    public convertTagsNumberToString(data: any): Post[] {

        data.forEach((value, key) => {
            value.tag = value.tag === '1' ? 'Ambiente' :
                value.tag === '2' ? 'Lectura' :
                    value.tag === '3' ? 'Matemáticas' : 'Otra';
        });
        return data;
    }

    public convertTagStringToNumber(post: Post): Post {
        post.tag = post.tag === 'Ambiente' ? '1' :
            post.tag === 'Lectura' ? '2' :
                post.tag === 'Matemáticas' ? '3' : '4';

        return post;
    }

    public convertStatusPostToString( data: any ): Post[ ] {
        data.forEach( (value, key) => {
            value.status = value.status === '1' ? 'Publicádo' : 'No publicádo';

        });
        return data;
    }

    public convertStatusPostToNumber( post: Post ): Post {
        post.status = post.status === 'Publicádo' ? '1' : '2';

        return post;
    }
}
