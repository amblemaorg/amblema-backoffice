import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { NbAuthModule } from '@nebular/auth';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      NbAuthModule.forRoot()
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
