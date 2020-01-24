import { Component, OnInit } from '@angular/core';
import { AbstractReactiveComponent } from '../reactive-form-components/abstract-reactive.component';
import { STATUS } from 'src/app/helpers/status';

@Component({
  selector: 'app-status-selector',
  templateUrl: './status-selector.component.html',
  styleUrls: ['./status-selector.component.scss']
})
export class StatusSelectorComponent extends AbstractReactiveComponent {

  statusList = [{ value: STATUS.ACTIVE }, { value: STATUS.INACTIVE }];

}
