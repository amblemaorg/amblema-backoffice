import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebCoordinator } from 'src/app/models/web/web-coordinator.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WebCoordinatorService {

  private readonly WEB_COORDINATOR = 'webcontent?page=coordinatorPage';

  constructor( private httpClient: HttpClient ) { }

  getContentWebCoordinator(): Observable<WebCoordinator> {
    return this.httpClient.get<WebCoordinator>(`${environment.api}${this.WEB_COORDINATOR}`)
      .pipe(
        map( (data : any) => data )
      );
  } 

  setContentWebCoordinator( data: WebCoordinator ) : Observable<WebCoordinator> {
    return this.httpClient.post<WebCoordinator>(`${environment.api}${this.WEB_COORDINATOR}`, data);
  }
}
