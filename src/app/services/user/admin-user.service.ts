import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { USER_TYPE } from 'src/app/helpers/user-type';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { map, catchError } from 'rxjs/operators';
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

  setAdminUser( data: AdminUser ): Observable<any>  {
    return this.httpClient.post(`${environment.api}${this.ADMIN_USER}`, data, {
      reportProgress: true,
      observe: 'events',
     }).pipe(catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


  updateAdminUser( id: string, data: AdminUser ): Observable<AdminUser> {
    return this.httpClient.put<AdminUser>(`${environment.api}/${id}${this.USER_TYPE}/`, data);
  }

  deleteAdminUser(id: string): Observable<string> {
    return this.httpClient.delete<string>(`${environment.api}${this.USER}/${id}`);
  }
}
