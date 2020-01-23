import { TableBase } from 'src/app/helpers/base-table';


export abstract class AbstractPageTable extends TableBase {

    constructor() {
        super();

        // Chage button actions
        this.settings.actions.custom = [
            { name: this.ACTION.EDIT, title: `<i class="nb-edit"></i>` },
            { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' }
        ];

        // Max display
        this.settings.pager.perPage = 5;
    }
}
