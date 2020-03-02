import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_TYPE } from 'src/app/helpers/user-type';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { AdminUser } from 'src/app/models/user/admin-user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  private readonly USER: string = `users`;
  private readonly ADMIN_USER: string = `users?userType=${USER_TYPE.ADMIN.CODE}`;
  private readonly USER_TYPE: string = `?userType=${USER_TYPE.ADMIN.CODE}`;

  constructor(private httpClient: HttpClient) { }

  getAdminUsers(): Observable<AdminUser[]> {
    return this.httpClient.get<AdminUser[]>(`${environment.api}${this.ADMIN_USER}`)
      .pipe(
        map((data: any) => data.records)
      );
  }

  setAdminUser( data: AdminUser ): Observable<AdminUser>  {
    return this.httpClient.post<AdminUser>(`${environment.api}${this.ADMIN_USER}`, data);
  }

  updateAdminUser( id: string, data: AdminUser ): Observable<AdminUser> {
    return this.httpClient.put<AdminUser>(`${environment.api}/${id}${this.USER_TYPE}/`, data);
  }

  deleteAdminUser(id: string): Observable<string> {
    return this.httpClient.delete<string>(`${environment.api}${this.USER}/${id}`);
  }
}
