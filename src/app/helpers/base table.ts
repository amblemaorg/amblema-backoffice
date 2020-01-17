import { ACTION } from './text-crud';
import { Action } from 'rxjs/internal/scheduler/Action';

export class TableBase implements Actions {

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

    newData(data: any) { }
}

interface Actions {
    newData(data:any): void;
    
}