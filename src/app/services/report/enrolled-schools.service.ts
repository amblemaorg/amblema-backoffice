import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnrolledSchoolsService {
  private readonly NUMBER_ACTIVE_SCHOOLS = `statistics/numberactiveschools/`;

  constructor(private httpClient: HttpClient) {}

  getNumberActiveSchool(
    startPeriodId: string,
    endPeriodId: string
  ): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.api}${this.NUMBER_ACTIVE_SCHOOLS}${startPeriodId}/${endPeriodId}`,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }
}
