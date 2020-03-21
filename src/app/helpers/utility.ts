import { Inject } from '@angular/core';
import { STATUS } from './text-content/status';
import { Post } from '../models/web/blog.model';
import { SliderMedia } from '../models/learning.model';
import { DOCUMENT_TYPE } from './convention/document-type';
import { AdminUser } from '../models/user/admin-user.model';

@Inject('root')
export class Utility {

    /**
     * Status selector
     */

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

    /**
     *  Type document
     */
    public encodeTypeDocument( type: string ): string {
        type = type === DOCUMENT_TYPE.V.VALUE ?  DOCUMENT_TYPE.V.CODE.toString() :
            type === DOCUMENT_TYPE.J.VALUE ? DOCUMENT_TYPE.J.CODE.toString() : DOCUMENT_TYPE.E.CODE.toString();
        return type;
    }

    public readlyTypeDocument( adminUsers: any[] ): any[] {
        adminUsers.forEach( value => {
            value.cardType = value.cardType === DOCUMENT_TYPE.V.CODE.toString() ?  DOCUMENT_TYPE.V.VALUE :
            value.cardType === DOCUMENT_TYPE.J.CODE.toString() ? DOCUMENT_TYPE.J.VALUE : DOCUMENT_TYPE.E.VALUE;
        });

        return adminUsers;
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
     * Convert Tags number to string,
     * aplicate it to blog post, web content.
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
            value.status = value.status === '1' ? 'Publicado' : 'No publicado';

        });
        return data;
    }

    public convertStatusPostToNumber( post: Post ): Post {
        post.status = post.status === 'Publicado' ? '1' : '2';

        return post;
    }

    /**
     *  Media convert, aplicate to learning
     *  module
     */

    public mediaNumberToString( media: SliderMedia[] ): SliderMedia[] {

        media.forEach( (value, key) => {
            value.type = value.type === '1' ? 'Imagen' : 'Video';
        });
        return media;
    }

}