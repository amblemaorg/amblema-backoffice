import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() {}

  public open( id: string ): void {
    $(`#${id}`).modal('show');

  }

  public close(id: string): void {
    $(`#${id}`).modal('hide');
  }
}
