import { LocalDataSource } from 'ng2-smart-table';

export interface SmartTable {
  settings: any; // <-- Should manually actions
  source: LocalDataSource;
  onAction: (event: any) => void; // <-- Custom actions
}
