import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authService: NbAuthService) {}
}
