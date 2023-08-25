import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserReportService {
  private readonly USER_REPORT = 'statistics/usersreport/';

  constructor(private httpClient: HttpClient) {}
  url_prepare: string;

  getUserReport(
    typeUser: string,
    status: string,
    instructed?: boolean,
    areEnrolled?: string,
    workPosition?: string,
    state?: string,
  ): Observable<any> {
     this.url_prepare =
      instructed !== null && instructed !== undefined
        ? `${environment.api}${this.USER_REPORT}${typeUser}?status=${status}&instructed=${instructed}`
        : areEnrolled !== null && areEnrolled !== undefined
        ? `${environment.api}${this.USER_REPORT}${typeUser}?status=${status}&annualPreparationStatus=${areEnrolled}`
        : `${environment.api}${this.USER_REPORT}${typeUser}?status=${status}`;
      
    this.url_prepare = workPosition != "" && workPosition != null && workPosition != undefined ? `${this.url_prepare}&workPosition=${workPosition}` : this.url_prepare
    this.url_prepare = state != "" && state != null && state != undefined ? `${this.url_prepare}&state=${state}` : this.url_prepare

    return this.httpClient.get<any>(this.url_prepare).pipe(map((data: any) => data));
  }
}
