import { Component } from '@angular/core';
import { Role } from './models/auth.model';
import { NbIconLibraries } from '@nebular/theme';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Amblema-BackOffice';

  constructor( private iconLibraries: NbIconLibraries ) { 
    //this.iconLibraries.registerFontPack('all', { packClass: 'fas', iconClassPrefix: 'fa'});
    //this.iconLibraries.setDefaultPack('all');
  }
}
