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
    id?: string;
    name: string;
    permissions?: Permission[];
}
