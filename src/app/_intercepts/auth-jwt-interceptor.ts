import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

import { Router } from '@angular/router';
import { AuthService } from '../services/user/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthJWTInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(public authService: AuthService, private route: Router) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = request.url.replace(`${environment.api}`, '');


    if (this.authService.getJwtToken()) {
      if (url === 'auth/refresh') {
        request = this.addToken(request, this.authService.getRefreshToken());
      } else {

        request = this.addToken(request, this.authService.getJwtToken());
      }
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      
      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;

          this.authService.storeJwtToken(token.access_token); // <-- Save new token
          this.refreshTokenSubject.next(token.access_token);

          return next.handle(this.addToken(request, token.access_token));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }
}
