import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomePages } from '../../_models/web/web-home.model';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebHomeService {

  private readonly WEB_HOME = 'webcontent?page=homePage';

  constructor( private httpClient: HttpClient ) { }

  getContentWebHome(): Observable<HomePages> {
    return this.httpClient.get<HomePages>(`${environment.api}${this.WEB_HOME}`)
      .pipe(
        map( (data: any) =>  data.homePage )
      );
  }

  setContentWebHome( data: HomePages ): Observable<any> {
    return this.httpClient.post<HomePages>(`${environment.api}${this.WEB_HOME}`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
