export interface Role {
    id: string;
    name: string; 
    status: boolean; 
    state: number; 
    createdAt: Date; 
    updateAt: Date;
    actions?: Action[];
}

export interface Action {
    id: string; 
    name: string; 
    status: boolean;
    sort: number; 
}