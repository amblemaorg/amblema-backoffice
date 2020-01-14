import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgTableComponent } from 'ng2-table';

@Component({
  selector: 'app-table-base',
  templateUrl: './table-base.component.html',
  styleUrls: ['./table-base.component.scss'],
})
export class TableBaseComponent extends NgTableComponent implements OnInit {

  @Output() edit = new EventEmitter();
  @Output() selectRow = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() view = new EventEmitter();

  @Input() columns: any = [];
  @Input() source: any = [];

  sort = false;
  pageOfItems: Array<any>;

  column  = [
    { name: 'id', title: 'ID', order: null, selected: false },
    { name: 'name', title: 'Nombre', order: null, selected: false },
    { name: 'lastName', title: 'Apellido', order: null, selected: false },
  ];

  data = [
    { id: 1, name: 'oran', lastName: 'cooler' },
    { id: 2, name: 'kreib', lastName: 'Olaf' },
    { id: 3, name: 'fedora', lastName: 'debian' },

    { id: 4, name: 'fedora', lastName: 'debian' },

    { id: 5, name: 'fedora', lastName: 'debian' },

    { id: 6, name: 'fedora', lastName: 'debian' },

    { id: 7, name: 'fedora', lastName: 'debian' },

    { id: 8, name: 'fedora', lastName: 'debian' },
    { id: 9, name: 'fedora', lastName: 'debian' },
    { id: 10, name: 'fedora', lastName: 'debian' },

    { id: 11, name: 'fedora', lastName: 'debian' },
  ];

  backUpData: any = [];
  pageData: any = [];

  ngOnInit() {
    this.backUpData = this.data;
    this.pageData = this.backUpData;
  }

  onSearch(value: string, attr: string) {

    const replace: any = [];
    for (const item of this.backUpData) {
      if ( item[attr].toString().toUpperCase().indexOf(value.toUpperCase()) > -1) {
        replace.push(item);
      }
    }
    this.data = replace;
    this.pageData = this.data; 
  }

  orderBy(text: any, position: string) {

    this.column[position].order = this.column[position].order === 'asc' ? 'desc' : 'asc';
    this.column[position].selected = true;

    for (let index = 0; index < this.column.length; index++) {
      if (this.column[position].order === 'asc' && parseInt(position) !== index ) {
        this.column[index].order = 'desc';
        this.column[index].selected = false;

      } else if (parseInt(position) !== index) {
        this.column[index].order = 'asc';
        this.column[index].selected = false;
      }
    }
    this.data = this.data.sort(this.compareValues(text, this.column[position].order)); 
  }

  compareValues(key, order) {
    return (a, b) => {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  /**
   * Events
   */

  onRow(element: any) { this.selectRow.emit(element); }
  onDelete(element: any) { this.delete.emit(element); }
  onEdit(element: any) { this.edit.emit(element); }
  onView(element: any) { this.view.emit(element); }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.data = pageOfItems;
  }

}
