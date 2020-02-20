import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebHome } from '../models/web/web-home.model';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebHomeService {

  private readonly WEB_HOME = 'webcontent?page=homePage';

  constructor( private httpClient: HttpClient ) { }

  getContentWebHome(): Observable<WebHome> {
    return this.httpClient.get<WebHome>(`${environment.api}${this.WEB_HOME}`)
      .pipe(
        map( (data: any) => data.records )
      );
  }

  setContentWebHome( data: WebHome ): Observable<WebHome> {
    return this.httpClient.post<WebHome>(`${environment.api}${this.WEB_HOME}`, data);
  }
}
