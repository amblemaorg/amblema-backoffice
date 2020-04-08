import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_TYPE } from 'src/app/helpers/convention/user-type';
import { Observable } from 'rxjs';
import { CoordinatorUser } from 'src/app/models/user/coordinator-user.model';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoordinatorUserService {

  private readonly USER: string = `users`;
  private readonly COORDINATOR_USER: string = `users?userType=${USER_TYPE.COORDINATOR.CODE}`;
  private readonly USER_TYPE: string = `?userType=${USER_TYPE.COORDINATOR.CODE}`;

  constructor(private httpClient: HttpClient) { }

  getCoordinatorUsers(): Observable<CoordinatorUser[]> {
    return this.httpClient.get<CoordinatorUser[]>(`${environment.api}${this.COORDINATOR_USER}`)
      .pipe(
        map((data: any) => data.records)
      );
  }

  setCoordinatorUser(data: CoordinatorUser): Observable<any> {
    return this.httpClient.post<CoordinatorUser>(`${environment.api}${this.COORDINATOR_USER}`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  updateCoordinatorUser( id: string, data: CoordinatorUser ): Observable<any> {
    return this.httpClient.put<CoordinatorUser>(`${environment.api}${this.USER}/${id}${this.USER_TYPE}`, data, {
      reportProgress: true,
      observe: 'body'
    });
  }

  deleteCoordinatorUser(id: string): Observable<string> {
    return this.httpClient.delete<string>(`${environment.api}${this.USER}/${id}`);
  }
}
