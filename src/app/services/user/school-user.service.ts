import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_TYPE } from 'src/app/_helpers/convention/user-type';
import { Observable } from 'rxjs';
import { SchoolUser } from 'src/app/_models/user/school.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchoolUserService {

  private readonly USER: string = `users`;
  private readonly SCHOOL_USER: string = `users?userType=${USER_TYPE.SCHOOL.VALUE}`;
  private readonly USER_TYPE: string = `?userType=${USER_TYPE.SCHOOL.VALUE}`;

  constructor(private httpClient: HttpClient) { }

  getSchoolUsers(only?: string): Observable<SchoolUser[]> {
    const url = only
      ? `${environment.api}${this.SCHOOL_USER}&only=${only}`
      : `${environment.api}${this.SCHOOL_USER}`;

    return this.httpClient.get<SchoolUser[]>(url)
      .pipe(
        map((data: any) => data.records)
      );
  }

  setSchoolUser(data: SchoolUser): Observable<any> {
    return this.httpClient.post<SchoolUser>(`${environment.api}${this.SCHOOL_USER}`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  updateSchoolUser(id: string, data: SchoolUser): Observable<any> {
    return this.httpClient.put<SchoolUser>(`${environment.api}${this.USER}/${id}${this.USER_TYPE}`, data, {
      reportProgress: true,
      observe: 'body'
    });
  }

  deleteSchoolUser(id: string): Observable<string> {
    return this.httpClient.delete<string>(`${environment.api}${this.USER}/${id}${this.USER_TYPE}`);
  }
}
