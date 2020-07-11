import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SponsorUserState } from 'src/app/store/user/sponsor-user.action';
import { Observable, Subscription } from 'rxjs';
import { SponsorUser } from 'src/app/_models/user/sponsor-user.model';
import { LocalDataSource } from 'ng2-smart-table';
import {
  WebSponsorState,
  AddSponsor,
} from 'src/app/store/web-content/web-sponsor.action';
import { WebSponsor } from 'src/app/_models/web/web-sponsor.model';

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
      delete: true,
    },
    columns: {
      name: {
        title: 'Nombre',
      },
      username: {
        title: 'Imagen',
      },
      email: {
        title: 'Web',
      },
      position: {
        title: 'Posición',
      },
    },
  };

  source = new LocalDataSource();

  constructor(private store: Store) {}

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
        website: this.dataSponsor.webSite,
        position: this.position.id,
      })
    );
  }
}
