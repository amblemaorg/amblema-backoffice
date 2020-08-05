import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http?: HttpClient) {}

  login(user: { username: string; password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.api}auth/login`, user).pipe(
      tap((tokens) => this.doLoginUser(user.username, tokens)),
      mapTo(true),
      catchError((error) => {
        alert(error.error);
        return of(false);
      })
    );
  }

  logout() {
    return this.http
      .post<any>(`${environment.api}auth/logout`, {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        tap(() => this.doLogoutUser()),
        mapTo(true),
        catchError((error) => {
          alert(error.error);
          return of(false);
        })
      );
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http
      .post<any>(
        `${environment.api}auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.getRefreshToken()}`,
          },
        }
      )
      .pipe(
        tap((tokens: any) => {
          this.storeJwtToken(tokens.jwt);
        })
      );
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: any) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  public getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  public storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  public storeTokens(tokens: any) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  public removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  public getIdUser(): string {
    const user: any = jwt_decode(this.getJwtToken());
    return user.identity.id;
  }

  public getActionsAdmin(): any {
      const actions: any = jwt_decode( this.getJwtToken() );
      return actions.identity.permissions;
  }

  public isAllowed(action: string): boolean {
    const ALL_ACTIONS_LOGGED: any =  this.getActionsAdmin();
    for (const iterator of Object.keys(ALL_ACTIONS_LOGGED)) {

      if (action === ALL_ACTIONS_LOGGED[iterator]) {
        return true;
      }
    }
    return false;
  }
}
