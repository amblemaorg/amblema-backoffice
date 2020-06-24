import { STATUS } from '../_helpers/convention/status';

export interface Action {
    name: string;
    label: string;
    sort: string;
    allowed: string;
}

export interface Permission {
    entityId: string;
    entityName: string;
    actions: Action[];
}

export interface Role {
    devName?: string;
    id?: string;
    name: string;
    permissions?: Permission[];
    status?: any;
}


export const DEVNAME_ROLE = {
    ADMIN : 'admin',
    COORDINADOR: 'coordinator',
    SCHOOL: 'school',
    SPONSOR: 'sponsor'
};
