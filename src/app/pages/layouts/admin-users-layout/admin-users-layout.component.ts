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
        { name: 'a', title: '<i class="far fa-eye" style="    padding: 0.875rem 1.25rem;"></i>' },

        { name: 'a', title: '<i class="far fa-eye"></i>' },

        { name: 'a', title: '<i class="far fa-eye"></i>' },
       
      ]
    },
     edit: {
       editButtonContent: '<i class="nb-edit"></i>',
       saveButtonContent: '<i class="nb-checkmark"></i>',
       cancelButtonContent: '<i class="nb-close"></i>',
     },
     delete: {
       deleteButtonContent: '<i class="nb-trash"></i>',
       confirmDelete: true,
     },
    pager: {
      display: true,
      perPage: 10
    },
    columns: {
      // more: {
      //   title: '',
      //   type: 'html',
      //   filter: false,
      //   width: '5%',
      //   valuePrepareFunction:(cell,row)=>{
      //     return  this._sanitizer.bypassSecurityTrustHtml(`<i class="far fa-eye fa-2x" (click)='onClean()'></i>`)
      //   },
      // },
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
  ]

  data = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },
    
    // ... list of items
    
    {
      id: 11,
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    }
  ];

  source : LocalDataSource;


  constructor( private _sanitizer: DomSanitizer ) {
    this.source = new LocalDataSource(this.data);

  }


  ngOnInit() {
  }


  onSearch(text: string, column:string) {
    
    //console.log(this.data.some( item => item[column] == text ));

} 

}
