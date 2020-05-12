import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserReportService {

  private readonly USER_REPORT = 'statistics/usersreport/';

  constructor( private httpClient: HttpClient ) { }

  getUserReport( typeUser: string, status: string): Observable<any> {

    return this.httpClient.get<any>(`${environment.api}${this.USER_REPORT}${typeUser}?status=${status}`)
      .pipe(
        map( (data: any) => data )
      );
  }
}
