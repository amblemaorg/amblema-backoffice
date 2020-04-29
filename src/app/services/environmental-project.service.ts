import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentalProject } from '../models/environmental-project.model';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentalProjectService {

  private readonly ENVIRONMENTAL_PROJECT: string = 'pecasetting/environmentalproject';

  constructor(private httpClient: HttpClient) { }

  getEnvironmentalProject(): Observable<any> {
    return this.httpClient.get<EnvironmentalProject>(`${environment.api}${this.ENVIRONMENTAL_PROJECT}`)
      .pipe(
        map((data: any) => data)
      );
  }

  updateEnvironmentalProject( data: EnvironmentalProject ): Observable<any> {
    return this.httpClient.post<EnvironmentalProject>(`${environment.api}${this.ENVIRONMENTAL_PROJECT}`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
