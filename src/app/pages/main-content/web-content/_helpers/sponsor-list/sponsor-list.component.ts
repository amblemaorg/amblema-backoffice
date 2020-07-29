import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import {
  WebSponsorState,
  AddSponsor,
  DeleteSponsor,
} from 'src/app/store/web-content/web-sponsor.action';
import { SponsorList } from 'src/app/_models/web/web-sponsor.model';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { SponsorUser } from 'src/app/_models/user/sponsor-user.model';
import { DialogConfirmationComponent } from 'src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.scss'],
})
export class SponsorListComponent implements OnInit, OnDestroy {
  @Select(WebSponsorState.sponsorHave) sponsorHave$: Observable<SponsorList[]>;
  @Select(WebSponsorState.sponsorAvailable) sponsorAvailable$: Observable<
    SponsorUser[]
  >;
  @Select(WebSponsorState.sponsorPositions) sponsorPositions$: Observable<
    any[]
  >;

  subscription: Subscription;
  dataPosition: any[] = []; // <-- Selector position

  // -- Data to set
  dataSponsor: any; // <-- Sponsor selected
  position: any; // <-- Position selected

  allSponsor: any[] = [];
  allHaveSponsor: any[] = [];

  // -- Table set up --
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
        valuePrepareFunction: (cell: any) => {
          return this.sanitizer.bypassSecurityTrustHtml(
            `<img src="${cell}" style="width:100px;">`
          );
        },
      },
      webSite: {
        title: 'Web',
        type: 'html',
        valuePrepareFunction: (cell: any) => {
          return this.sanitizer.bypassSecurityTrustHtml(
            `<a href=${cell} target="_blank" >${cell}</a>`
          );
        },
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

  constructor(
    private toastr: CustomToastrService,
    private sanitizer: DomSanitizer,
    private store: Store,

    protected modalService?: BsModalService,
  ) {}

  ngOnInit() {}

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
    this.dataSponsor = null;
  }

  onDeleteConfirm(event: any): void {
    // -- Instance dialog
    const modal = this.modalService.show(
      DialogConfirmationComponent,
      Object.assign({}, { class: 'modal-dialog-centered' })
    );

    // -- Setup dialog
    (modal.content as DialogConfirmationComponent).showConfirmationModal(
      'Eliminar padrino',
      '¿Desea eliminar el padrino seleccionado?',
      'No se eliminará hasta que guarde los cambios.'
    );


          // -- Listen the action
    this.subscription = (modal.content as DialogConfirmationComponent).onClose.subscribe(
          (result) => {
            // -- Yes then delete it
            if (result === true) {

    this.store.dispatch(new DeleteSponsor(event.data.id)).subscribe(() => {
      event.confirm.resolve();
    });
    (modal.content as DialogConfirmationComponent).hideConfirmationModal();
            }
          },
          (err: any) =>
            (modal.content as DialogConfirmationComponent).errorDelete(err) // <-- Error messages
        );


  }
}
