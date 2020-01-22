import { ACTION } from './text-crud';
import { LocalDataSource } from 'ng2-smart-table';

export class TableBase {

    // Forms attr
    ID_FORM: string;
    ACTION = ACTION;

    // Create or update
    mode;

    // Settings table
    source: LocalDataSource = new LocalDataSource();

    settings = {
        noDataMessage: 'No hay registros',
        mode: 'external',
        actions: {
            columnTitle: 'Acciones',
            add: false,
            edit: false,
            //  Fake column
            delete: true,
            custom: [
                { name: ACTION.VIEW, title: '<i class="far fa-eye fa-sm"></i>' },
                { name: ACTION.EDIT, title: `<i class="nb-edit"></i>` },
                { name: ACTION.DELETE, title: '<i class="nb-trash"></i>' }
            ]
        },
        /**
         * This fake columns is cuz the td footer,
         * not complete the row. Bug s front plugin.
         */
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
    newData?: (data: any) => void;
    updateData?: (data: any) => void;
    onAction?: (event: any) => void;
}
