import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_TYPE } from 'src/app/helpers/convention/user-type';
import { Observable } from 'rxjs';
import { SchoolUser } from 'src/app/models/user/school.model';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchoolUserService {

  private readonly USER: string = `users`;
  private readonly SCHOOL_USER: string = `users?userType=${USER_TYPE.SCHOOL.CODE}`;
  private readonly USER_TYPE: string = `?userType=${USER_TYPE.SCHOOL.CODE}`;  

  constructor( private  httpClient: HttpClient ) { }

  getSchoolUsers(): Observable<SchoolUser[]> {
    return this.httpClient.get<SchoolUser[]>(`${environment.api}${this.SCHOOL_USER}`)
      .pipe(
        map((data: any) => data.records)
      );
  }

  setSchoolUser( data: SchoolUser ): Observable<any> {
    return this.httpClient.post<SchoolUser>(`${environment.api}${this.SCHOOL_USER}`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  updateSchoolUser( id: string, data: SchoolUser ): Observable<any> {
    return this.httpClient.put<SchoolUser>(`${environment.api}${this.USER}/${id}${this.USER_TYPE}`, data);
  }

  deleteSchoolUser(id: string): Observable<string> {
    return this.httpClient.delete<string>(`${environment.api}${this.USER}/${id}`);
  }
}
