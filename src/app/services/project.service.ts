import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly PROJECT = 'projects'; 

  constructor( private httpClient: HttpClient ) { }

  getProjects() :Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${environment.api}${this.PROJECT}`)
      .pipe(
        map((data: any) => data.records)
      );
  }

  setProject( data: Project ) : Observable<Project> {
     return this.httpClient.post<Project>(`${environment.api}${this.PROJECT}`, data);
  }

  deleteProject(id: string): Observable<string> { 
    return this.httpClient.delete<string>(`${environment.api}${this.PROJECT}/${id}`);
  }

  updateProject( id:string,  data: Project) : Observable<Project> {
    return this.httpClient.put<Project>(`${environment.api}${this.PROJECT}/${id}`, data);
  }
}
