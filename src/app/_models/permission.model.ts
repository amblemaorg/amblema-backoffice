export interface ActionRole {
    name: string;
    label: string;
    sort: string;
    allowed: boolean;
}

export interface Permission {
    entityId: string;
    entityName: string;
    actions: ActionRole[];
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
