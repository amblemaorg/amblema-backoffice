import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Role } from '../_models/permission.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private readonly ROLE: string = 'roles';

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${environment.api}${this.ROLE}`)
      .pipe(
        map((data: any) => data.records)
      );
  }

  setRole( data: Role ): Observable<any> {
    return this.httpClient.post<any>(`${environment.api}${this.ROLE}/`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  updateRole(id: string, data: Role ): Observable<any> {
    return this.httpClient.put<any>(`${environment.api}${this.ROLE}/${id}`, data, {
      reportProgress: true,
      observe: 'body'
    });
  }

  deleteRole( id: string ): Observable<string> {
    return this.httpClient.delete<string>( `${environment.api}${this.ROLE}/${id}` );
  }
}
