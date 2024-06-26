import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebSponsor } from 'src/app/_models/web/web-sponsor.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebSponsorService {

  private readonly WEB_SPONSOR = 'webcontent?page=sponsorPage';

  constructor( private httpClient: HttpClient ) { }

  getContentWebSponsor(): Observable<WebSponsor> {
    return this.httpClient.get<WebSponsor>(`${environment.api}${this.WEB_SPONSOR}`)
    .pipe(
      map( (data: any) => data )
    );
  }

  setContentWebSponsor( data: WebSponsor ): Observable<any> {
    return this.httpClient.post<WebSponsor>(`${environment.api}${this.WEB_SPONSOR}`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
