import { ACTION } from './text-crud';

export class TableBase {

    settings = {
        noDataMessage: 'No hay registros',
        mode: 'external',
        actions: {
            columnTitle: 'Acciones',
            add: false,
            edit: false,
            delete: false,
            custom: [
                { name: ACTION.VIEW, title: '<i class="far fa-eye fa-sm"></i>' },
                { name: ACTION.EDIT, title: `<i class="nb-edit"></i>` },
                { name: ACTION.DELETE, title: '<i class="nb-trash"></i>' }
            ]
        },
        pager: {
            display: true,
            perPage: 10
        },
        columns: {

        }
    };
}

export interface TableActions {
    newData?: (data: any) => void;
    update?: (data: any) => void;
    onAction?: (event: any) => void;
}
