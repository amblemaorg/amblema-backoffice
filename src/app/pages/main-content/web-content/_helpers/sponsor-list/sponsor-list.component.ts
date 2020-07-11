import { Component, OnInit, OnDestroy, Sanitizer } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SponsorUserState } from 'src/app/store/user/sponsor-user.action';
import { Observable, Subscription } from 'rxjs';
import { SponsorUser } from 'src/app/_models/user/sponsor-user.model';
import { LocalDataSource } from 'ng2-smart-table';
import {
  WebSponsorState,
  AddSponsor,
  DeleteSponsor,
} from 'src/app/store/web-content/web-sponsor.action';
import { WebSponsor } from 'src/app/_models/web/web-sponsor.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.scss'],
})
export class SponsorListComponent implements OnInit, OnDestroy {
  @Select(SponsorUserState.sponsorUsers) users$: Observable<SponsorUser[]>;
  @Select(WebSponsorState.webSponsor) web$: Observable<WebSponsor>;
  subscription: Subscription;
  dataPosition: any[] = [];

  // -- Data to set
  dataSponsor: any;
  position: any;

  settings = {
    noDataMessage: 'No hay registros',
    actions: {
      columnTitle: 'Acciones',

      add: false,
      edit: false,
    },
    columns: {
      name: {
        title: 'Nombre',
      },
      image: {
        title: 'Imagen',
        type: 'html',
        filter: false,
        valuePrepareFunction: ( cell: any ) => {
          return this.sanitizer.bypassSecurityTrustHtml(`<img src="${cell}" style="width:100px;">`);
        }
      },
      webSite: {
        title: 'Web',
        type: 'html',
        valuePrepareFunction: ( cell: any ) => {
          return this.sanitizer.bypassSecurityTrustHtml(`<a href=${cell} target="_blank" >${cell}</a>`);
        }
      },
      position: {
        title: 'Posición',
      },
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
  };

  source = new LocalDataSource();

  constructor( private sanitizer: DomSanitizer, private store: Store) {}

  ngOnInit() {
    this.subscription = this.users$.subscribe((response) => {
      response.forEach((value, key) => {
        this.dataPosition.push({ id: key + 1, name: (key + 1).toString() });
      });
      this.dataPosition.push({
        id: response.length + 1,
        name: 'Ultima posición',
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSelectSponsor(value: any): void {
    this.dataSponsor = value;
  }

  onSelectPosition(value: any): void {
    this.position = value;
  }

  addSponsor(): void {
    this.store.dispatch(
      new AddSponsor({
        id: this.dataSponsor.id,
        name: this.dataSponsor.name,
        image: this.dataSponsor.image,
        webSite: this.dataSponsor.webSite,
        position: this.position.id,
      })
    );


  }

  onDeleteConfirm(event: any): void {
    this.store.dispatch(new DeleteSponsor(event.data.id)).subscribe(() => {
      event.confirm.resolve();
    });
  }
}
