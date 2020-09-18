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

  getUserReport(
    typeUser: string,
    status: string,
    instructed?: boolean,
    areEnrolled?: string
  ): Observable<any> {

    const URL_PREPARE: string =
      instructed !== null && instructed !== undefined
        ? `${environment.api}${this.USER_REPORT}${typeUser}?status=${status}&instructed=${instructed}`
        : areEnrolled !== null && areEnrolled !== undefined
        ? `${environment.api}${this.USER_REPORT}${typeUser}?status=${status}&annualPreparationStatus=${areEnrolled}`
        : `${environment.api}${this.USER_REPORT}${typeUser}?status=${status}`;

    return this.httpClient.get<any>(URL_PREPARE).pipe(map((data: any) => data));
  }
}
