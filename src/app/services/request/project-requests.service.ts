import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectRequest } from 'src/app/models/request/project-requests.model';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectRequestsService {

  private readonly PROJECT_REQUESTS = 'contactrequests';

  /* To approve requests for type of applicant agreement */
  private readonly SCHOOL_REQUESTS = 'schoolscontacts';
  private readonly COORDINATOR_REQUESTS = 'coordinatorscontacts';
  private readonly SPONSOR_REQUESTS = 'sponsorscontacts';

  constructor( private httpClient: HttpClient ) { }

  getProjectRequests() : Observable<ProjectRequest[]> {
    return this.httpClient.get<ProjectRequest[]>(`${environment.api}${this.PROJECT_REQUESTS}`)
      .pipe(
        map((data: any) => data.records)
      );
  }
}
