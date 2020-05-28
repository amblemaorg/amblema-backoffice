import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestStepApproval } from 'src/app/models/request/request-step-approval.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InformationRequestService {

  private readonly REQUEST_STEP_APPROVAL = 'requestsstepapproval';

  constructor( private httpClient: HttpClient ) { }

  /**
   * Request for information type in steps
   */
  getRequestStepApproval(): Observable<RequestStepApproval[]> {
    return this.httpClient.get<RequestStepApproval[]>(`${environment.api}${this.REQUEST_STEP_APPROVAL}`)
      .pipe(
        map((data: any) => data.records)
      );
  }

  updateRequestStepApproval( data: RequestStepApproval ): Observable<RequestStepApproval> {
    return this.httpClient.put<RequestStepApproval>(`${environment.api}${this.REQUEST_STEP_APPROVAL}/${data.id}`, data);
  }

  deleteRequestStepApproval( id: string): Observable<string> {
    return this.httpClient.delete<string>(`${environment.api}${this.REQUEST_STEP_APPROVAL}/${id}`);
  }

  /**
   * Requests for confirmation of amblema
   */
  getRequestsProjectApproval(): Observable<any> {

  }
}
