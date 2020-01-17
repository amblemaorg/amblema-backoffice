import { Component } from '@angular/core';
import { AbstractReactiveComponent } from '../reactive-form-components/abstract-reactive.component';

@Component({
  selector: 'app-role-selector',
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.scss']
})
export class RoleSelectorComponent extends AbstractReactiveComponent {

  roleList: any = [{ name: 'Gerente' }, { name: 'administrador' }];

}

