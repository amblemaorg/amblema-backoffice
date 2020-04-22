import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserCreationRequest } from 'src/app/models/request/user-creation-request.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserCreationRequestService {

  private readonly CREATION_REQUESTS = 'findrequests';

  /* To approve requests for type of applicant agreement */
  private readonly SCHOOL_REQUESTS = 'requestsfindschool';
  private readonly COORDINATOR_REQUESTS = 'requestsfindcoordinator';
  private readonly SPONSOR_REQUESTS = 'requestsfindsponsor';


  constructor( private httpClient: HttpClient ) { }

  getUserCreationRequests(): Observable<UserCreationRequest[]> {
    return this.httpClient.get<UserCreationRequest[]>(`${environment.api}${this.CREATION_REQUESTS}`)
      .pipe(
        map((data: any) => data.records)
      );
  }
}
