import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectRequest } from 'src/app/_models/request/project-request.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectRequestsService {
  private readonly PROJECT_REQUESTS = 'contactrequests';

  /* To approve requests for type of applicant agreement */
  private readonly SCHOOL_REQUESTS = 'schoolscontacts';
  private readonly COORDINATOR_REQUESTS = 'coordinatorscontacts';
  private readonly SPONSOR_REQUESTS = 'sponsorscontacts';

  constructor(private httpClient: HttpClient) {}

  getProjectRequests(only?: string, status?: string): Observable<ProjectRequest[]> {
    let url = `${environment.api}${this.PROJECT_REQUESTS}`;
    const params = [];
    if (only) params.push(`only=${only}`);
    if (status) params.push(`status=${status}`);
    if (params.length > 0) url += `?${params.join('&')}`;

    return this.httpClient
      .get<ProjectRequest[]>(url)
      .pipe(map((data: any) => data.records));
  }

  putProjectRequestSchool(id: string, status: string): Observable<any> {
    return this.httpClient.put<ProjectRequest>(
      `${environment.api}${this.SCHOOL_REQUESTS}/${id}`,
      { status }
    );
  }

  putProjectRequestCoordinator(id: string, status: string): Observable<any> {
    return this.httpClient.put<ProjectRequest>(
      `${environment.api}${this.COORDINATOR_REQUESTS}/${id}`,
      { status }
    );
  }

  putProjectRequestSponsor(id: string, status: string): Observable<any> {
    return this.httpClient.put<ProjectRequest>(
      `${environment.api}${this.SPONSOR_REQUESTS}/${id}`,
      { status }
    );
  }

  deleteProjectRequestSchool(id: string): Observable<any> {
    return this.httpClient.delete<string>(
      `${environment.api}${this.SCHOOL_REQUESTS}/${id}`,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  deleteProjectRequestCoordinator(id: string): Observable<any> {
    return this.httpClient.delete<string>(
      `${environment.api}${this.COORDINATOR_REQUESTS}/${id}`,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  deleteProjectRequestSponsor(id: string): Observable<any> {
    return this.httpClient.delete<string>(
      `${environment.api}${this.SPONSOR_REQUESTS}/${id}`,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }
}
