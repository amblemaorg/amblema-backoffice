import { Component, OnInit } from '@angular/core';
import { NgTableComponent } from 'ng2-table';

@Component({
  selector: 'app-table-base',
  templateUrl: './table-base.component.html',
  styleUrls: ['./table-base.component.scss'],
})
export class TableBaseComponent extends NgTableComponent implements OnInit {


  ngOnInit() {
  }

}
