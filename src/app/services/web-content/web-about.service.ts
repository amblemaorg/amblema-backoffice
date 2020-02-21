import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AboutUsPage, WebAbout } from 'src/app/models/web/web-about.model';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebAboutService {

  private readonly WEB_ABOUT = 'webcontent?page=aboutUsPage';

  constructor( private httpClient: HttpClient ) { }

  getContentWebAbout(): Observable<WebAbout> {
    return this.httpClient.get<WebAbout>(`${environment.api}${this.WEB_ABOUT}`)
      .pipe(
        map( ( data: any) => data )
      );
  }

  setContentWebAbout( data: WebAbout ): Observable<WebAbout> {
    return this.httpClient.post<WebAbout>(`${environment.api}${this.WEB_ABOUT}`, data);
  }
}
