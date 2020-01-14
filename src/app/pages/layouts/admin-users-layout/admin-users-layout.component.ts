import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-users-layout',
  templateUrl: './admin-users-layout.component.html',
  styleUrls: ['./admin-users-layout.component.scss']
})
export class AdminUsersLayoutComponent implements OnInit {

  settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'view', title: '<i class="far fa-eye fa-sm"></i>' },
        { name: 'edit', title: '<i class="nb-edit"></i>' }, 
        { name: 'trash', title: '<i class="nb-trash"></i>' }
      ]
    },
    pager: {
      display: true,
      perPage: 10
    },
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      }
    }
  };

  headers = [
    { name: 'id' },
    { name: 'name' },
    { name: 'username' },
    { name: 'email' }
  ];

  data = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    },

    // ... list of items

    {
      id: 11,
      name: 'Nicholas DuBuque',
      username: 'Nicholas.Stanton',
      email: 'Rey.Padberg@rosamond.biz'
    },
    {
      id: 11,
      name: 'Nicholas DuBuque',
      username: 'Nicholas.Stanton',
      email: 'Rey.Padberg@rosamond.biz'
    }
  ];

  source: LocalDataSource;


  constructor(private sanitizer: DomSanitizer) {
    this.source = new LocalDataSource(this.data);

  }


  ngOnInit() {
  }


  onSearch(text: string, column: string) {
    // console.log(this.data.some( item => item[column] == text ));
  }

  onAction( event: any ) {
 
    switch(event.action) {
      case '' : 
        break;
      case '' :
        break; 
      case '' :
        break;
    }  
  }
}