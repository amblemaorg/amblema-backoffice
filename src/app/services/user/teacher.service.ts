import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private readonly TEACHER: string = `pecaproject/annualpresentation`;

  constructor( private httpClient: HttpClient ) { }

  updateTeacherStatus( pecaId: string, teacherId: string, status: any ): Observable<any> {
    return this.httpClient.put<any>(`${environment.api}${this.TEACHER}/${pecaId}/${teacherId}`, status);
  }
}
