import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { NbAuthModule } from '@nebular/auth';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NbAuthModule.forRoot(),
        RouterTestingModule
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
