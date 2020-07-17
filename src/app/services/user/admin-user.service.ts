import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_TYPE } from 'src/app/_helpers/convention/user-type';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { AdminUser } from 'src/app/_models/user/admin-user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  private readonly USER: string = `users`;
  private readonly ADMIN_USER: string = `users?userType=${USER_TYPE.ADMIN.VALUE}`;
  private readonly USER_TYPE: string = `?userType=${USER_TYPE.ADMIN.VALUE}`;

  constructor(private httpClient: HttpClient) { }

  getAdminUsers(): Observable<AdminUser[]> {
    return this.httpClient.get<AdminUser[]>(`${environment.api}${this.ADMIN_USER}`)
      .pipe(
        map((data: any) => data.records)
      );
  }

  setAdminUser(data: AdminUser): Observable<any> {
    return this.httpClient.post<AdminUser>(`${environment.api}${this.ADMIN_USER}`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  updateAdminUser(id: string, data: AdminUser): Observable<any> {
    return this.httpClient.put<AdminUser>(`${environment.api}${this.USER}/${id}${this.USER_TYPE}`, data, {
      reportProgress: true,
      observe: 'response'
    });
  }

  deleteAdminUser(id: string): Observable<string> {
    return this.httpClient.delete<string>(`${environment.api}${this.USER}/${id}`);
  }
}
