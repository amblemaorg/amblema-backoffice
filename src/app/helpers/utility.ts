import { Inject } from '@angular/core';
import { STATUS } from './text-content/status';

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
}
