import { ACTION } from './text-crud';
import { LocalDataSource } from 'ng2-smart-table';

export class BaseTable {

    ID_FORM: string; // <-- To relate it to some form
    ACTION = ACTION; // <-- Attr: CREATE, EDIT, VIEW and EDIT

    MODE; // <-- Create or update mode

    // Settings table
    source: LocalDataSource = new LocalDataSource();

    settings = {
        noDataMessage: 'No hay registros',
        mode: 'external',
        actions: {
            columnTitle: 'Acciones',
            add: false,
            edit: false,
            //  Fake action
            delete: true,
            custom: [
                { name: ACTION.VIEW, title: '<i class="far fa-eye fa-sm"></i>' },
                { name: ACTION.EDIT, title: `<i class="nb-edit"></i>` },
                { name: ACTION.DELETE, title: '<i class="nb-trash"></i>' }
            ]
        },
        // Fake column cuz a bug
        delete: {
            deleteButtonContent: '<i class="ion-trash-a"></i>',
            confirmDelete: true
        },
        pager: {
            display: true,
            perPage: 10
        },
        columns: {

        }
    };

    constructor(ID_FORM?: string) {
        this.ID_FORM = ID_FORM;
    }
}

// Normal actions CRUD users
export interface TableActions {
    deleteData?: (data: any) => void;
    newData?: (data: any) => void;
    updateData?: (data: any) => void;
    onAction?: (event: any) => void;
}
