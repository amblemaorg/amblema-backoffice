import { Component } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Amblema-BackOffice';

  constructor( private iconLibraries: NbIconLibraries ) {
    /**
     * -- NOTE --
     * This code is for changing the icon pack to
     * fontawesome. By default eva icons is installed.
     * Remove or add this code in production
     *
     * this.iconLibraries.registerFontPack('all', { packClass: 'fas', iconClassPrefix: 'fa'});
     * this.iconLibraries.setDefaultPack('all');
     */
  }
}
