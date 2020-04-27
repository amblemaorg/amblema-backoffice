import { Component, OnInit, Input } from '@angular/core';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { AbstractControl, FormControl } from '@angular/forms';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {

  @Input() title: string;
  @Input()list = new Array<any>();

  MODE_LIST;
  ACTION = ACTION;
  ID_ITEM: number;
  
  control: AbstractControl | null = new FormControl();

  constructor( private toastr: CustomToastrService ) { }

  ngOnInit() {
    // Init mode create
    this.MODE_LIST = this.ACTION.CREATE;
  }


  addItem() {
    this.list.push({ name: this.control.value });
    this.control.reset();
  }

  public onEditItem(index: number): void {
    this.MODE_LIST = ACTION.EDIT;
    this.ID_ITEM = index;
    this.control.setValue(this.list[index].name);
  }

  public onDeleteItem(index: number): void {
    this.list = this.list.filter((value, key) => key !== index);
    this.toastr.deleteRegister('Eliminado', 'Se ha eliminado una opción de la lista');
  }

  confirmAction() {
    this.list = Object.assign([], this.list);
    if (this.MODE_LIST === ACTION.EDIT) {
      this.list[this.ID_ITEM].name = this.control.value;
    }
    this.MODE_LIST = ACTION.CREATE;
    this.control.reset();
  }

  onEnter() {  if ( this.control.value ) { this.addItem(); } }
}
