import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StateList } from "../_models/state.model";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StateService {
  constructor(private httpClient: HttpClient) {}

  getState(): Observable<StateList> {
    return this.httpClient
      .get<StateList>(`${environment.api}` + "states")
      .pipe(map((data: any) => data));
  }

  updateState(id: string, data: any): Observable<any> {
    return this.httpClient.put<any>(
      `${environment.api}` + "state/" + id,
      data
    );
  }
  saveState(data: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.api}` + "state", data);
  }
  deleteState(id: string): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.api}` + "state/" + id
    );
  }
}
