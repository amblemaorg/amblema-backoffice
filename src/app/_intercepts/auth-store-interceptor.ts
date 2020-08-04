import { Injectable, ɵConsole } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../services/user/auth.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthStoreInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    /**
     * when session is started the refresh token must be stored
     */

    const url = req.url.replace(`${environment.api}`, '');

    return next.handle(req).pipe(
      tap((response: HttpEvent<any>) => {
        // -- Success response, then save refresh token --
        if (url === 'auth/login') {
          switch (response.type) {
            case HttpEventType.Response:

              // -- Save it --
              this.authService.storeTokens({
                jwt: response.body.access_token,
                refreshToken: response.body.refresh_token,
              });

              break;
          }
        }
      })
    );
  }
}
