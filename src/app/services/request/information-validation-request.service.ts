import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InformationValidationRequestService {

  private readonly REQUEST_PROJECT_APPROVAL = 'requestsprojectapproval';

  constructor( private httpClient: HttpClient ) { }

   /**
   * Requests for confirmation of amblema
   */
  getRequestsProjectApproval(): Observable<any> {
    return this.httpClient.get<any>(`${environment.api}${this.REQUEST_PROJECT_APPROVAL}`)
      .pipe(
        map((data: any) => data.records)
      );
  }
}
