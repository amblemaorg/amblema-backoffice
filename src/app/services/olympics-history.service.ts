import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OlympicsHistoryService {

  private readonly OLYMPICS_HISTORY: string = 'pecasetting/olympicshistory';

  constructor( private httpClient: HttpClient ) { }

  getOlympicsHistory(): Observable<any> {
    return this.httpClient.get<any>(`${environment.api}${this.OLYMPICS_HISTORY}`);
  }

  saveOlympicsHistory(data: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.api}${this.OLYMPICS_HISTORY}`, data);
  }
}
