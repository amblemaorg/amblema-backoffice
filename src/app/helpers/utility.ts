import { Inject } from '@angular/core';
import { STATUS } from './status';

@Inject('root')
export class Utility {

    public readlyStatus(object?: any[]): any[]  {
        object.forEach((value, key) => {

            if (Number(value.status) === 1) {
                value.status = STATUS.ACTIVE as string;
            } else {
                value.status = STATUS.INACTIVE;
            }

        });
        return object;
    }

    public incodeStatus(object: any[]): any[] {
        object.forEach((value, key) => {

            if (String(value.status) === STATUS.ACTIVE) {
                value.status = 1;
            } else {
                value.status = 2;
            }

        });
        return object;
    }
}
