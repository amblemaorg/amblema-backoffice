import { Component, OnInit } from '@angular/core';
import { AbstractReactiveSelect } from '../_shared/abstract-reactive-select';

@Component({
  selector: 'app-select-status',
  templateUrl: './select-status.component.html',
  styleUrls: ['./select-status.component.scss'],
})
export class SelectStatusComponent extends AbstractReactiveSelect {
  options = [
    { label: 'Activo', value: '1' },
    { label: 'Inactivo', value: '2' },
  ];
}
