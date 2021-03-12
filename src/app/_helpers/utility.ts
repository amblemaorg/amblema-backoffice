import { Inject, Injectable } from '@angular/core';
import { STATUS } from './convention/status';
import { Post } from '../_models/web/blog.model';
import { SliderMedia } from '../_models/learning.model';
import { DOCUMENT_TYPE } from './convention/document-type';
import { REQUEST_STATUS } from './convention/request-status';

@Injectable()
export class Utility {
  /* Convert the request status */

  public readlyRequestStatus(value: string): string {
    return (value =
      value === REQUEST_STATUS.PENDING.CODE
        ? REQUEST_STATUS.PENDING.VALUE
        : value === REQUEST_STATUS.ACCEPTED.CODE
        ? REQUEST_STATUS.ACCEPTED.VALUE
        : REQUEST_STATUS.REJECTED.VALUE);
  }

  /* Status selector */

  public readlyStatus(object?: any[]): any[] {
    object.forEach((value, key) => {
      if (value.status === STATUS.ACTIVE.VALUE) {
        value.status = STATUS.ACTIVE.LABEL as string;
      } else {
        value.status = STATUS.INACTIVE.LABEL as string;
      }
    });
    return object;
  }

  public incodeStatus(object: any[]): any[] {
    object.forEach((value, key) => {
      if (String(value.status) === STATUS.ACTIVE.LABEL) {
        value.status = STATUS.ACTIVE.LABEL;
      } else {
        value.status = STATUS.INACTIVE.LABEL;
      }
    });
    return object;
  }

  /**
   *  Type document
   */
  public encodeTypeDocument(type: string): string {
    type =
      type === DOCUMENT_TYPE.V.VALUE
        ? DOCUMENT_TYPE.V.CODE.toString()
        : type === DOCUMENT_TYPE.J.VALUE
        ? DOCUMENT_TYPE.J.CODE.toString()
        : DOCUMENT_TYPE.E.CODE.toString();
    return type;
  }

  public readlyTypeDocument(adminUsers: any[]): any[] {
    adminUsers.forEach((value) => {
      value.cardType =
        value.cardType === DOCUMENT_TYPE.V.CODE.toString()
          ? DOCUMENT_TYPE.V.VALUE
          : value.cardType === DOCUMENT_TYPE.J.CODE.toString()
          ? DOCUMENT_TYPE.J.VALUE
          : DOCUMENT_TYPE.E.VALUE;
    });

    return adminUsers;
  }

  /** To filter array json by ID, return a value */

  public filter(object: any[], id: string): any {
    return object.filter((value) => {
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
      value.tag =
        value.tag === '1'
          ? 'Ambiente'
          : value.tag === '2'
          ? 'Lectura'
          : value.tag === '3'
          ? 'Matemáticas'
          : 'Otra';
    });
    return data;
  }

  public convertTagStringToNumber(post: Post): Post {
    post.tag =
      post.tag === 'Ambiente'
        ? '1'
        : post.tag === 'Lectura'
        ? '2'
        : post.tag === 'Matemáticas'
        ? '3'
        : '4';

    return post;
  }

  public convertStatusPostToString(data: any): Post[] {
    data.forEach((value, key) => {
      value.status = value.status === '1' ? 'Publicado' : 'No publicado';
    });
    return data;
  }

  public convertStatusPostToNumber(post: Post): Post {
    post.status = post.status === 'Publicado' ? '1' : '2';

    return post;
  }

  /**
   *  Media convert, aplicate to learning
   *  module
   */

  public mediaNumberToString(media: SliderMedia[]): SliderMedia[] {
    media.forEach((value, key) => {
      value.type = value.type === '1' ? 'Imagen' : 'Video';
    });
    return media;
  }
}

export const ReadlyStatusConvert = (object?: any[]): any[] => {
  object.forEach((value, key) => {
    if (value.status === STATUS.ACTIVE.VALUE) {
      value.status = STATUS.ACTIVE.LABEL as string;
    } else {
      value.status = STATUS.INACTIVE.LABEL as string;
    }
  });
  return object;
};

export const FilterStatus = (cell?: any, search?: string): boolean => {
  let value: string = cell === '1' ? 'Activo' : 'Inactivo';

  value = value.toUpperCase();

  if (value.includes(search.toUpperCase()) || search === '') {
    return true;
  } else {
    return false;
  }
};

export const FilterAmblemPensum = (cell?: any, search?: string): boolean => {
  let value: string = cell ? 'Completado' : 'No completado';

  value = value.toUpperCase();

  if (value.includes(search.toUpperCase()) || search === '') {
    return true;
  } else {
    return false;
  }
};

export const ReadlyGender = (value: string): string =>
  value === '1' ? 'Femenino' : 'Masculino';
export const FilterGender = (cell?: any, search?: string): boolean => {
  let value: string = cell ? 'Femenino' : 'Masculino';

  value = value.toUpperCase();

  if (value.includes(search.toUpperCase()) || search === '') {
    return true;
  } else {
    return false;
  }
};
