import { CoordinatorUser } from 'src/app/models/user/coordinator-user.model';

export interface CoordinatorUserModel {
    coordinatorUser: CoordinatorUser;
    coordinatorUsers: CoordinatorUser[];
}

// -- Actions --

export class GetCoordinatorUsers {
    static readonly type = '[Coordinator User] Get Coordinator Users';
    constructor() {}
}

export class SetCoordinatorUser {
    static readonly type = '[Coordinator User] Set Coordinator User';
    constructor( public payload: CoordinatorUser ) {  }
}

export class UpdateCoordinatorUser {
    static readonly type = '[Coordinator User] Update Coordinator User';
    constructor( public oldCoordinatorUser: CoordinatorUser, public newCoordinatorUser: CoordinatorUser) { }
}

export class DeleteCoordinatorUser {
    static readonly type = '[Coordinator User] Delete Coordinator User';
    constructor( public payload: CoordinatorUser ) { }
}

export class SelectedCoordinatorUser {
    static readonly type = '[Coordinator User] Selected Coordinator User';
    constructor( public payload: CoordinatorUser ) { }
}
