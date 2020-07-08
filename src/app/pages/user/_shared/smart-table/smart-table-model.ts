import { LocalDataSource } from 'ng2-smart-table';

export interface SmartTable {
  settings: SettingSmartTable; // <-- Should manually actions
  source: LocalDataSource;
}

// -- General Set up --
export interface SettingSmartTable {
  noDataMessage?: string;
  mode?: 'external' | 'internal';
  actions?: ActionsColumns;
  columns?: any;
  pager?: {
    display?: boolean;
    perPage?: number;
  };
  add?: boolean | {
    addButtonContent?: string;
    createButtonContent?: string;
    cancelButtonContent?: string;
    confirmCreate?: boolean;
  };
  edit?: boolean | {
    editButtonContent?: string;
    saveButtonContent?: string;
    cancelButtonContent?: string;
    confirmSave?: boolean;
  };
  delete?: boolean | {
    deleteButtonContent?: string;
    confirmDelete?: boolean;
  };
  attr?: {
    // class: 'table table-striped table-bordered table-hover'
  };
  defaultStyle?: boolean;
}

// -- Actions Set Up --
export interface ActionsColumns {
  columnTitle?: string;
  add?: boolean;
  edit?: boolean;
  delete?: boolean;
  custom?: ActionCustom[];
  position?: 'right' | 'left';
}

export interface ActionCustom {
    name?: string;
    title?: string;
}
