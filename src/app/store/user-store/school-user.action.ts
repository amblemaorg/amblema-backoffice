import { SchoolUser } from 'src/app/models/user/school.model';
import { State, NgxsOnInit } from '@ngxs/store';

export interface SchoolUserModel {
    schoolUser: SchoolUser;
    schoolUsers: SchoolUser[]; 
}

// -- Actions -- 

export class GetSchoolUsers {
    static readonly type = '[School User] Get School Users';
    constructor() { }
}

export class SetSchoolUser {
    static readonly type = '[School User] Set School User';
    constructor(public payload: SchoolUser) { }
}

export class UpdateSchoolUser {
    static readonly type = '[School User] Update School User';
    constructor(public oldSchoolUser: SchoolUser, public newSchoolUser: SchoolUser) { }
}

export class DeleteSchoolUser {
    static readonly type = '[School User] Delete School User';
    constructor(public payload: SchoolUser) { }
}

export class SelectedSchoolUser {
    static readonly type = '[School User] Selected School User';
    constructor(public payload: SchoolUser) { }
}

@State<SchoolUserModel>({
    name: 'schooluser',
    defaults: {
        schoolUser: {
            
        },
        schoolUsers: []
    }
})
export class SchoolUserState implements NgxsOnInit {
    
    ngxsOnInit() {

    }
}