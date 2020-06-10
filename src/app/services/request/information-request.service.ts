import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestStepApproval } from 'src/app/models/request/request-step-approval.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { RequestContent } from 'src/app/models/request/request-content-approval.model';

@Injectable({
  providedIn: 'root'
})
export class InformationRequestService {

  private readonly REQUEST_CONTENT_APPROVAL = 'requestscontentapproval';

  constructor( private httpClient: HttpClient ) { }

  /**
   * Request for information type in steps
   */
  getRequestsContent(): Observable<RequestContent[]> {
    return this.httpClient.get<RequestContent[]>(`${environment.api}${this.REQUEST_CONTENT_APPROVAL}`)
      .pipe(
        map((data: any) => data.records)
      );
  }

  updateRequestContentApproval( data: RequestContent ): Observable<RequestContent> {
    return this.httpClient.put<RequestContent>(`${environment.api}${this.REQUEST_CONTENT_APPROVAL}/${data.id}`, {status: data.status});
  }

  deleteRequestContentApproval( id: string): Observable<string> {
    return this.httpClient.delete<string>(`${environment.api}${this.REQUEST_CONTENT_APPROVAL}/${id}`);
  }

}
