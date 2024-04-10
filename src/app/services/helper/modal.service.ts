import { Injectable } from '@angular/core';
import {
  FormGroup,
} from '@angular/forms';

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
  public open2( id: string, form:FormGroup): void {
    $(`#${id}`).modal('show');

  }
}
