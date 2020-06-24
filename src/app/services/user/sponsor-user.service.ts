import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_TYPE } from 'src/app/_helpers/convention/user-type';
import { Observable } from 'rxjs';
import { SponsorUser } from 'src/app/_models/user/sponsor-user.model';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SponsorUserService {

  private readonly USER: string = `users`;
  private readonly SPONSOR_USER: string = `users?userType=${USER_TYPE.SPONSOR.VALUE}`;
  private readonly USER_TYPE: string = `?userType=${USER_TYPE.SPONSOR.VALUE}`;

  constructor( private httpClient: HttpClient ) { }

  getSponsorUsers(): Observable<SponsorUser[]> {
    return this.httpClient.get<SponsorUser[]>(`${environment.api}${this.SPONSOR_USER}`)
      .pipe(
        map((data: any) => data.records)
      );
  }

  setSponsorUser( data: SponsorUser ): Observable<any> {
    return this.httpClient.post<SponsorUser>(`${environment.api}${this.SPONSOR_USER}`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  updateSponsorUser( id: string, data: SponsorUser ): Observable<any> {
    return this.httpClient.put<SponsorUser>(`${environment.api}${this.USER}/${id}${this.USER_TYPE}`, data, {
      reportProgress: true,
      observe: 'body'
    });
  }

  deleteSponsorUser(id: string): Observable<string> {
    return this.httpClient.delete<string>(`${environment.api}${this.USER}/${id}`);
  }
}
