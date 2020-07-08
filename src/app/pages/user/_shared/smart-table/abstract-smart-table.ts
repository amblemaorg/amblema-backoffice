import { SmartTable, SettingSmartTable } from './smart-table-model';
import { LocalDataSource } from 'ng2-smart-table';
import { FORM_MODALITY } from '../abstract-form-mode';

export abstract class AbstractSmartTable implements SmartTable {
  settings: SettingSmartTable = {
    noDataMessage: 'No hay registros',
    mode: 'external',
    actions: {
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        {
          name: FORM_MODALITY.CREATE.value,
          title: '<i class="far fa-eye fa-sm"></i>',
        },
        { name: FORM_MODALITY.EDIT.value, title: `<i class="nb-edit"></i>` },
        { name: FORM_MODALITY.DELETE.value, title: `<i class="nb-edit"></i>` },
      ],
    },
    pager: {
      display: true,
      perPage: 10,
    },
    add: false,
    edit: false,
    delete: false,
  };

  source = new LocalDataSource();

  // -- Event custom
  abstract onCustomAction(): void;

  private readlyStatus(): string {
    return '';
  }

  private encodeStatus(): string {
    return '';
  }
}
