import { Component } from '@angular/core';
import { Role } from './models/auth.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Amblema-BackOffice';

  role: Role; 

  constructor() {  }

}
