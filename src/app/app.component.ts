import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {

  constructor(  ) {
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
