import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ProjectValidationRequest } from 'src/app/_models/request/project-validate-request.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectValidationRequestService {
  private readonly REQUEST_PROJECT_APPROVAL = 'requestsprojectapproval';

  constructor(private httpClient: HttpClient) {}

  /**
   * Requests for confirmation of AmbLeMa
   */
  getRequestsProjectApproval(): Observable<ProjectValidationRequest[]> {
    return this.httpClient
      .get<ProjectValidationRequest[]>(
        `${environment.api}${this.REQUEST_PROJECT_APPROVAL}`
      )
      .pipe(map((data: any) => data.records));
  }

  updateRequestProjectApproval(
    data: ProjectValidationRequest
  ): Observable<any> {

    return this.httpClient.put<ProjectValidationRequest>(
      `${environment.api}${this.REQUEST_PROJECT_APPROVAL}/${data.id}`,
      { status: data.status }, {
        reportProgress: true,
        observe: 'body'
      }
    );
  }

  deleteRequestProjectApproval(id: string): Observable<string> {
    return this.httpClient.delete<string>(
      `${environment.api}${this.REQUEST_PROJECT_APPROVAL}/${id}`
    );
  }
}
